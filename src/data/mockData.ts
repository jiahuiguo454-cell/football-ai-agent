export type ScoreProbability = {
  score: string;
  probability: number;
};

export type BettingReference = {
  winDrawLose: string;
  score: string;
  totalGoals: string;
  halfFull: string;
};

export type MatchPrediction = {
  id: string;
  date: string;
  venue: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  probabilities: {
    home: number;
    draw: number;
    away: number;
  };
  over25: number;
  bothTeamsToScore: number;
  recommendedScore: string;
  keyPlayer: string;
  riskLabel: string;
  riskLevel: "medium" | "high";
  detail: {
    eloJudgement: string;
    poissonTopScores: ScoreProbability[];
    aiAdjustment: string;
    upsetRisk: string;
    bettingReference: BettingReference;
  };
  contribution: {
    elo: number;
    poisson: number;
    playerImpact: number;
    marketSignal: number;
    upsetDetector: number;
    backtest: number;
  };
  review: {
    status: "命中" | "待赛" | "偏差";
    reason: string;
    nextCorrection: string;
  };
};

export const dashboardMetrics = [
  { label: "当前预测准确率", value: "66%" },
  { label: "已回测比赛", value: "48/73" },
  { label: "平均 RPS", value: "0.143" }
];

export const matches: MatchPrediction[] = [
  {
    id: "civ-nor",
    date: "2026-06-30 22:00",
    venue: "Seattle Stadium",
    homeTeam: "科特迪瓦",
    awayTeam: "挪威",
    homeFlag: "🇨🇮",
    awayFlag: "🇳🇴",
    probabilities: { home: 25, draw: 27, away: 48 },
    over25: 42,
    bothTeamsToScore: 47,
    recommendedScore: "0-1",
    keyPlayer: "Erling Haaland",
    riskLabel: "挪威小优，防平",
    riskLevel: "medium",
    detail: {
      eloJudgement: "挪威 Elo 综合评分高出约 38 点，客场仍保留轻微实力优势。科特迪瓦身体对抗强，但阵地战创造力偏低。",
      poissonTopScores: [
        { score: "0-1", probability: 14.8 },
        { score: "1-1", probability: 13.5 },
        { score: "0-0", probability: 10.9 },
        { score: "1-2", probability: 9.7 },
        { score: "0-2", probability: 8.9 }
      ],
      aiAdjustment: "Haaland 的禁区终结效率抬高挪威客胜权重，但科特迪瓦转换速度让平局概率不能被压低。",
      upsetRisk: "中等。若挪威边路推进受阻，比赛可能进入低比分拉锯。",
      bettingReference: {
        winDrawLose: "负，防平",
        score: "0-1 / 1-1",
        totalGoals: "1-2 球",
        halfFull: "平负 / 平平"
      }
    },
    contribution: { elo: 24, poisson: 22, playerImpact: 18, marketSignal: 16, upsetDetector: 10, backtest: 10 },
    review: {
      status: "待赛",
      reason: "赛前模型给出客队小幅优势，主要不确定性来自比赛节奏和挪威客场效率。",
      nextCorrection: "赛后重点校准低节奏比赛中的平局权重与关键前锋触球质量。"
    }
  },
  {
    id: "fra-swe",
    date: "2026-07-01 03:00",
    venue: "MetLife Stadium",
    homeTeam: "法国",
    awayTeam: "瑞典",
    homeFlag: "🇫🇷",
    awayFlag: "🇸🇪",
    probabilities: { home: 69, draw: 19, away: 12 },
    over25: 61,
    bothTeamsToScore: 52,
    recommendedScore: "3-1",
    keyPlayer: "Kylian Mbappé",
    riskLabel: "法国进攻优势明显",
    riskLevel: "medium",
    detail: {
      eloJudgement: "法国 Elo 明显领先，前场速度和中场推进都优于瑞典。瑞典定位球有威胁，但持续压制能力不足。",
      poissonTopScores: [
        { score: "2-0", probability: 12.6 },
        { score: "3-1", probability: 11.4 },
        { score: "2-1", probability: 10.8 },
        { score: "1-0", probability: 9.6 },
        { score: "3-0", probability: 8.8 }
      ],
      aiAdjustment: "Mbappé 的反击威胁提高法国多进球概率，瑞典高球冲击让双方进球概率保持在 50% 以上。",
      upsetRisk: "偏低。除非法国早段浪费机会或瑞典定位球先开局，否则主胜路径较清晰。",
      bettingReference: {
        winDrawLose: "胜",
        score: "3-1 / 2-0",
        totalGoals: "3-4 球",
        halfFull: "胜胜"
      }
    },
    contribution: { elo: 28, poisson: 24, playerImpact: 19, marketSignal: 14, upsetDetector: 7, backtest: 8 },
    review: {
      status: "命中",
      reason: "强队优势与大球倾向一致，模型对法国前场效率判断稳定。",
      nextCorrection: "继续跟踪瑞典定位球 xG，避免低估弱势方的单点爆破。"
    }
  },
  {
    id: "mex-ecu",
    date: "2026-07-01 08:00",
    venue: "Estadio Azteca",
    homeTeam: "墨西哥",
    awayTeam: "厄瓜多尔",
    homeFlag: "🇲🇽",
    awayFlag: "🇪🇨",
    probabilities: { home: 37, draw: 34, away: 29 },
    over25: 39,
    bothTeamsToScore: 55,
    recommendedScore: "1-1",
    keyPlayer: "Enner Valencia",
    riskLabel: "高原因素，平局风险高",
    riskLevel: "high",
    detail: {
      eloJudgement: "两队 Elo 接近，墨西哥主场和高原适应性略占优势，厄瓜多尔冲击力能抵消部分场地劣势。",
      poissonTopScores: [
        { score: "1-1", probability: 15.9 },
        { score: "1-0", probability: 12.1 },
        { score: "0-1", probability: 10.7 },
        { score: "0-0", probability: 10.2 },
        { score: "2-1", probability: 8.6 }
      ],
      aiAdjustment: "高原环境降低开放对攻概率，Valencia 的反击终结让客队仍有进球窗口。",
      upsetRisk: "较高。三项概率非常接近，单个定位球或门将状态都可能改变结果。",
      bettingReference: {
        winDrawLose: "平，防胜",
        score: "1-1 / 1-0",
        totalGoals: "2 球",
        halfFull: "平平 / 平胜"
      }
    },
    contribution: { elo: 19, poisson: 25, playerImpact: 15, marketSignal: 13, upsetDetector: 18, backtest: 10 },
    review: {
      status: "偏差",
      reason: "模型可能低估了高原环境对最后 20 分钟体能衰减的影响。",
      nextCorrection: "增加场地海拔、旅行距离和轮换深度对下半场进球率的修正。"
    }
  }
];

export const modelSources = [
  { name: "Elo", description: "球队实力评分", value: 24 },
  { name: "Poisson", description: "比分概率", value: 24 },
  { name: "Player Impact Index", description: "球员影响指数", value: 17 },
  { name: "Market Signal", description: "市场赔率信号", value: 14 },
  { name: "Upset Detector", description: "冷门风险识别", value: 12 },
  { name: "Backtest", description: "历史回测校准", value: 9 }
];
