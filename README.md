# Football AI Agent

一个静态前端足球预测小应用，用于展示世界杯/竞彩足球预测结果。页面采用深色科技风 AI 数据仪表盘设计，数据暂时来自本地 JSON，后续可以接入真实预测模型。

## 本地运行

npm install
npm run dev

## 数据更新

页面读取 src/data/matches.json。

手动维护版本：编辑 scripts/manual-matches.json，然后运行：

npm run update-data

尝试从公开 ESPN scoreboard 接口拉取某天赛程/赛果：

npm run update-data -- --source espn --date 2026-06-30 --league fifa.world

说明：ESPN 接口属于公开网页数据接口，稳定性不能保证。抓取失败时，可以继续用 manual 模式维护。

## 部署

把变更上传到 GitHub 后，Vercel 会自动重新部署。

## 自动更新

项目已包含 GitHub Actions 工作流：.github/workflows/update-data.yml。默认每天北京时间 15:00 自动运行。

它会先尝试运行：

npm run update-data -- --source espn --date today --league fifa.world

如果 ESPN 抓取失败，会回退到 scripts/manual-matches.json，避免部署中断。更新成功后，工作流会提交 src/data/matches.json，Vercel 会自动重新部署。
