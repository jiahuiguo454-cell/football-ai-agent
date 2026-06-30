import generatedMatches from "./matches.json";

export type ScoreProbability = { score: string; probability: number };

export type BettingReference = { winDrawLose: string; score: string; totalGoals: string; halfFull: string };

export type MatchPrediction = {
  id: string;
  date: string;
  status: "未开赛" | "进行中" | "已完赛";
  actualScore: string | null;
  venue: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  probabilities: { home: number; draw: number; away: number };
  over25: number;
  bothTeamsToScore: number;
  recommendedScore: string;
  keyPlayer: string;
  riskLabel: string;
  riskLevel: "medium" | "high";
  detail: { eloJudgement: string; poissonTopScores: ScoreProbability[]; aiAdjustment: string; upsetRisk: string; bettingReference: BettingReference };
  contribution: { elo: number; poisson: number; playerImpact: number; marketSignal: number; upsetDetector: number; backtest: number };
  review: { status: "命中" | "待赛" | "偏差"; reason: string; nextCorrection: string };
};

export const dashboardMetrics = [
  { label: "当前预测准确率", value: "66%" },
  { label: "已回测比赛", value: "48/73" },
  { label: "平均 RPS", value: "0.143" }
];

export const matches = generatedMatches as MatchPrediction[];

export const modelSources = [
  { name: "Elo", description: "球队实力评分", value: 24 },
  { name: "Poisson", description: "比分概率", value: 24 },
  { name: "Player Impact Index", description: "球员影响指数", value: 17 },
  { name: "Market Signal", description: "市场赔率信号", value: 14 },
  { name: "Upset Detector", description: "冷门风险识别", value: 12 },
  { name: "Backtest", description: "历史回测校准", value: 9 }
];
