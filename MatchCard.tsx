import type { MatchPrediction } from "../data/mockData";

type MatchCardProps = {
  match: MatchPrediction;
};

const labels = {
  win: "胜",
  draw: "平",
  lose: "负",
  over25: "大于2.5球",
  bothScore: "双方进球",
  recommendedScore: "推荐比分",
  keyPlayer: "关键球员：",
  elo: "Elo 判断",
  poisson: "Poisson Top 5 比分",
  aiReason: "AI 修正理由",
  upsetRisk: "冷门风险",
  lottery: "体彩参考",
  winDrawLose: "胜平负",
  score: "比分",
  totalGoals: "总进球",
  halfFull: "半全场"
};

function ProbabilityBar({ label, value, tone }: { label: string; value: number; tone: "home" | "draw" | "away" }) {
  return (
    <div className="probability-row">
      <span>{label}</span>
      <div className="probability-track" aria-hidden="true">
        <div className={`probability-fill ${tone}`} style={{ width: `${value}%` }} />
      </div>
      <strong>{value}%</strong>
    </div>
  );
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <article className="match-card is-expanded">
      <div className="match-summary">
        <div className="match-meta">
          <span>{match.date}</span>
          <span className={`status-badge ${match.status === "已完赛" ? "finished" : match.status === "进行中" ? "live" : "scheduled"}`}>
            {match.status}{match.actualScore ? ` · ${match.actualScore}` : ""}
          </span>
          <span>{match.venue}</span>
        </div>

        <div className="teams-line">
          <div className="team-name">
            <span className="flag">{match.homeFlag}</span>
            <span>{match.homeTeam}</span>
          </div>
          <span className="versus">vs</span>
          <div className="team-name away">
            <span>{match.awayTeam}</span>
            <span className="flag">{match.awayFlag}</span>
          </div>
        </div>

        <div className="prediction-grid">
          <div className="probabilities">
            <ProbabilityBar label={labels.win} value={match.probabilities.home} tone="home" />
            <ProbabilityBar label={labels.draw} value={match.probabilities.draw} tone="draw" />
            <ProbabilityBar label={labels.lose} value={match.probabilities.away} tone="away" />
          </div>

          <div className="metric-pills">
            <div><span>{labels.over25}</span><strong>{match.over25}%</strong></div>
            <div><span>{labels.bothScore}</span><strong>{match.bothTeamsToScore}%</strong></div>
            <div><span>{labels.recommendedScore}</span><strong>{match.recommendedScore}</strong></div>
          </div>
        </div>

        <div className="card-footer">
          <span className="key-player">{labels.keyPlayer}{match.keyPlayer}</span>
          <span className={`risk-tag ${match.riskLevel}`}>{match.riskLabel}</span>
        </div>
      </div>

      <div className="match-detail">
        <section><h3>{labels.elo}</h3><p>{match.detail.eloJudgement}</p></section>
        <section>
          <h3>{labels.poisson}</h3>
          <div className="score-list">
            {match.detail.poissonTopScores.map((item) => <div key={item.score}><span>{item.score}</span><strong>{item.probability}%</strong></div>)}
          </div>
        </section>
        <section><h3>{labels.aiReason}</h3><p>{match.detail.aiAdjustment}</p></section>
        <section><h3>{labels.upsetRisk}</h3><p>{match.detail.upsetRisk}</p></section>
        <section className="betting-reference">
          <h3>{labels.lottery}</h3>
          <dl>
            <div><dt>{labels.winDrawLose}</dt><dd>{match.detail.bettingReference.winDrawLose}</dd></div>
            <div><dt>{labels.score}</dt><dd>{match.detail.bettingReference.score}</dd></div>
            <div><dt>{labels.totalGoals}</dt><dd>{match.detail.bettingReference.totalGoals}</dd></div>
            <div><dt>{labels.halfFull}</dt><dd>{match.detail.bettingReference.halfFull}</dd></div>
          </dl>
        </section>
      </div>
    </article>
  );
}
