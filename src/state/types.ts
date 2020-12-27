export interface HistoricData {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

export interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
  score: number;
}

export interface TrendingData extends TrendingCoin {
  historicData: HistoricData;
  color: string;
}

export interface StyleSheet {
  [key: string]: React.CSSProperties;
}
