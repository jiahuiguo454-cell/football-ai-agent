# Football AI Agent

一个静态前端足球预测小应用，用于展示世界杯/竞彩足球预测结果。页面采用深色科技风 AI 数据仪表盘设计，数据暂时来自本地 mock，后续可以接入真实预测模型。

## 技术栈

- React
- Vite
- TypeScript
- CSS
- 本地 mock 数据，不接付费 API

## 本地运行

npm install
npm run dev

浏览器打开 Vite 输出的本地地址即可查看页面。

## 项目结构

src/
  components/
    MatchCard.tsx
    ModelExplanation.tsx
    ReviewPanel.tsx
  data/
    mockData.ts
  App.tsx
  main.tsx
  styles.css

## 后续接入真实模型

当前页面的数据入口集中在 src/data/mockData.ts。后续可以将这里替换为真实接口返回，例如 Elo 球队评分服务、Poisson 比分分布模型、球员影响指数、市场赔率信号、冷门风险识别模块和赛后回测校准结果。
