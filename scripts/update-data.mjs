import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "src", "data", "matches.json");
const manualPath = path.join(rootDir, "scripts", "manual-matches.json");

const args = new Map();
for (let index = 2; index < process.argv.length; index += 1) {
  const arg = process.argv[index];
  if (arg.startsWith("--")) {
    const key = arg.slice(2);
    const next = process.argv[index + 1];
    if (next && !next.startsWith("--")) {
      args.set(key, next);
      index += 1;
    } else {
      args.set(key, "true");
    }
  }
}

function dateInShanghai(offsetDays = 0) {
  const now = new Date();
  const shanghai = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Shanghai" }));
  shanghai.setDate(shanghai.getDate() + offsetDays);
  const year = shanghai.getFullYear();
  const month = String(shanghai.getMonth() + 1).padStart(2, "0");
  const day = String(shanghai.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function resolveDate(value) {
  if (!value || value === "today") return dateInShanghai(0);
  if (value === "tomorrow") return dateInShanghai(1);
  if (value === "yesterday") return dateInShanghai(-1);
  return value;
}

const source = args.get("source") ?? "manual";
const date = resolveDate(args.get("date"));
const league = args.get("league") ?? "fifa.world";

function compactDate(value) { return value.replaceAll("-", ""); }
function slug(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "match"; }

function makeBasePrediction(homeTeam, awayTeam, status, actualScore, dateText, venue) {
  return {
    id: slug(homeTeam + "-" + awayTeam + "-" + compactDate(date)),
    date: dateText,
    status,
    actualScore,
    venue,
    homeTeam,
    awayTeam,
    homeFlag: "",
    awayFlag: "",
    probabilities: { home: 38, draw: 29, away: 33 },
    over25: 48,
    bothTeamsToScore: 51,
    recommendedScore: "1-1",
    keyPlayer: "待更新",
    riskLabel: status === "已完赛" ? "赛果已更新" : "均势盘，注意临场信息",
    riskLevel: "medium",
    detail: {
      eloJudgement: "自动抓取脚本已生成基础赛程，Elo 判断等待模型补充。",
      poissonTopScores: [
        { score: "1-1", probability: 13.2 },
        { score: "1-0", probability: 10.8 },
        { score: "0-1", probability: 10.1 },
        { score: "2-1", probability: 8.7 },
        { score: "0-0", probability: 8.3 }
      ],
      aiAdjustment: "当前为自动生成基础版本，后续可接入球队状态、伤停和赔率信号。",
      upsetRisk: "自动版暂按中等风险处理，建议人工复核强弱差距和赛程密度。",
      bettingReference: { winDrawLose: "谨慎参考", score: "1-1 / 1-0", totalGoals: "2-3 球", halfFull: "平平 / 平胜" }
    },
    contribution: { elo: 20, poisson: 24, playerImpact: 12, marketSignal: 14, upsetDetector: 16, backtest: 14 },
    review: { status: "待赛", reason: status === "已完赛" ? "实际比分：" + actualScore : "比赛尚未开始，等待赛后复盘。", nextCorrection: "赛后补充比分、命中状态和偏差原因。" }
  };
}

async function loadManualMatches() {
  const text = await readFile(manualPath, "utf8");
  return JSON.parse(text);
}

async function loadEspnMatches() {
  const url = "https://site.api.espn.com/apis/site/v2/sports/soccer/" + league + "/scoreboard?dates=" + compactDate(date);
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error("ESPN request failed: " + response.status + " " + response.statusText);
  const data = await response.json();
  const events = Array.isArray(data.events) ? data.events : [];
  return events.map((event) => {
    const competition = event.competitions?.[0];
    const competitors = competition?.competitors ?? [];
    const home = competitors.find((item) => item.homeAway === "home") ?? competitors[0];
    const away = competitors.find((item) => item.homeAway === "away") ?? competitors[1];
    const homeTeam = home?.team?.displayName ?? "Home Team";
    const awayTeam = away?.team?.displayName ?? "Away Team";
    const statusType = competition?.status?.type;
    const state = statusType?.state;
    const completed = Boolean(statusType?.completed);
    const status = completed ? "已完赛" : state === "in" ? "进行中" : "未开赛";
    const actualScore = completed || state === "in" ? String(home?.score ?? "-") + "-" + String(away?.score ?? "-") : null;
    const kickoff = event.date ? new Date(event.date) : null;
    const dateText = kickoff ? kickoff.toISOString().replace("T", " ").slice(0, 16) : date;
    const venue = competition?.venue?.fullName ?? "待更新";
    return makeBasePrediction(homeTeam, awayTeam, status, actualScore, dateText, venue);
  });
}

async function main() {
  const matches = source === "espn" ? await loadEspnMatches() : await loadManualMatches();
  if (!Array.isArray(matches) || matches.length === 0) throw new Error("No matches were loaded. Check source, date, league, or manual file.");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(matches, null, 2) + "\n", "utf8");
  console.log("Updated " + path.relative(rootDir, outputPath) + " with " + matches.length + " matches from " + source + " for " + date + ".");
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
