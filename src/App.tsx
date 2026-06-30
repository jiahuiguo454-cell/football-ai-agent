import { MatchCard } from "./components/MatchCard";
import { ModelExplanation } from "./components/ModelExplanation";
import { ReviewPanel } from "./components/ReviewPanel";
import { dashboardMetrics, matches } from "./data/mockData";

function App() {
  return (
    <main className="app-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">World Cup & Sports Lottery Forecast</span>
          <h1>Football AI Agent</h1>
          <p>基于 Elo（球队实力评分）+ Poisson（泊松进球模型）+ 市场赔率 + AI 基本面修正的足球预测系统</p>
        </div>
        <div className="metrics-panel">
          {dashboardMetrics.map((metric) => <div className="metric-card" key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>)}
        </div>
      </section>
      <section className="section-block matches-section">
        <div className="section-heading"><span>Today Fixtures</span><h2>今日赛事预测</h2></div>
        <div className="matches-list">
          {matches.map((match) => <MatchCard key={match.id} match={match} />)}
        </div>
      </section>
      <ModelExplanation />
      <ReviewPanel matches={matches} />
    </main>
  );
}

export default App;
