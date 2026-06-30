import type { MatchPrediction } from "../data/mockData";

type MatchCardProps = {
  match: MatchPrediction;
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
          <span>{match.venue}</span>
        </div>
        <div className="teams-line">
          <div className="team-name"><span className="flag">{match.homeFlag}</span><span>{match.homeTeam}</span></div>
          <span className="versus">vs</span>
          <div className="team-name away"><span>{match.awayTeam}</span><span className="flag">{match.awayFlag}</span></div>
        </div>
        <div className="prediction-grid">
          <div className="probabilities">
            <ProbabilityBar label="胜" value={match.probabilities.home} tone="home" />
            <ProbabilityBar label="平" value={match.probabilities.draw} tone="draw" />
            <ProbabilityBar label="负" value={match.probabilities.away} tone="away" />
          </div>
          <div className="metric-pills">
            <div><span>大于2.5球</span><strong>{match.over25}%</strong></div>
            <div><span>双方进球</span><strong>{match.bothTeamsToScore}%</strong></div>
            <div><span>推荐比分</span><strong>{match.recommendedScore}</strong></div>
          </div>
        </div>
        <div className="card-footer">
          <span className="key-player">关键球员：{match.keyPlayer}</span>
          <span className={`risk-tag ${match.riskLevel}`}>{match.riskLabel}</span>
        </div>
      </div>
      <div className="match-detail">
        <section><h3>Elo 判断</h3><p>{match.detail.eloJudgement}</p></section>
        <section><h3>Poisson Top 5 比分</h3><div className="score-list">{match.detail.poissonTopScores.map((item) => <div key={item.score}><span>{item.score}</span><strong>{item.probability}%</strong></div>)}</div></section>
        <section><h3>AI 修正理由</h3><p>{match.detail.aiAdjustment}</p></section>
        <section><h3>冷门风险</h3><p>{match.detail.upsetRisk}</p></section>
        <section className="betting-reference"><h3>体彩参考</h3><dl><div><dt>胜平负</dt><dd>{match.detail.bettingReference.winDrawLose}</dd></div><div><dt>比分</dt><dd>{match.detail.bettingReference.score}</dd></div><div><dt>总进球</dt><dd>{match.detail.bettingReference.totalGoals}</dd></div><div><dt>半全场</dt><dd>{match.detail.bettingReference.halfFull}</dd></div></dl></section>
      </div>
    </article>
  );
}
