import { modelSources } from "../data/mockData";

export function ModelExplanation() {
  return (
    <section className="section-block">
      <div className="section-heading"><span>Model Stack</span><h2>模型解释</h2></div>
      <div className="model-grid">
        {modelSources.map((source) => (
          <div className="model-item" key={source.name}>
            <div><h3>{source.name}</h3><p>{source.description}</p></div>
            <div className="model-weight"><strong>{source.value}%</strong><div className="mini-track" aria-hidden="true"><span style={{ width: `${source.value * 3}%` }} /></div></div>
          </div>
        ))}
      </div>
    </section>
  );
}
