export interface HistoricData {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
}

export interface TrendingCoin extends Coin {
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
