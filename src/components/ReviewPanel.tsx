import type { MatchPrediction } from "../data/mockData";

type ReviewPanelProps = { matches: MatchPrediction[] };

export function ReviewPanel({ matches }: ReviewPanelProps) {
  return (
    <section className="section-block review-section">
      <div className="section-heading"><span>Post Match Calibration</span><h2>赛后复盘</h2></div>
      <div className="review-list">
        {matches.map((match) => (
          <article className="review-item" key={match.id}>
            <div className="review-title"><strong>{match.homeTeam} vs {match.awayTeam}</strong><span className={`review-status ${match.review.status === "命中" ? "hit" : match.review.status === "偏差" ? "miss" : "pending"}`}>{match.review.status}</span></div>
            <p>{match.review.reason}</p>
            <div className="next-correction"><span>下次修正</span><strong>{match.review.nextCorrection}</strong></div>
          </article>
        ))}
      </div>
    </section>
  );
}
