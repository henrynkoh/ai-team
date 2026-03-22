export const CRITERIA_LABELS: Record<string, string> = {
  novelty: "Novelty",
  feasibility: "Feasibility",
  marketImpact: "Market impact",
  techDepth: "Tech depth",
  ethicalRisk: "Ethical risk",
  mvpSpeed: "Speed to MVP",
};

export type CriteriaKey = keyof typeof CRITERIA_LABELS;

export interface IdeaRow {
  id: string;
  rank: number;
  title: string;
  compositeScore: number;
  scores: Record<CriteriaKey, number>;
}

export interface DebateSession {
  date: string;
  topic: string;
  topicSource: "queue" | "user" | "llm";
  generatedAt: string;
  topIdeas: IdeaRow[];
  heatmapA: {
    ideaIds: string[];
    criteria: CriteriaKey[];
    matrix: number[][];
  };
  heatmapB: {
    keywords: string[];
    matrix: number[][];
  };
  heatmapC: {
    groups: string[];
    ideaIds: string[];
    matrix: number[][];
  };
  extremePerspectives: {
    group: string;
    ideaRank: number;
    ideaTitle: string;
    score: number;
    reason: string;
  }[];
  progressVsYesterday: {
    newIdeasPercent: number;
    criteriaDeltas: Partial<Record<CriteriaKey, number>>;
    trendingKeywords: string[];
  } | null;
  agentCount: number;
  rounds: number;
}
