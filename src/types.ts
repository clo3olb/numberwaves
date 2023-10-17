export type Quote = {
  ticker: string;
  timestamp: number;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type Earning = {
  eps: string;
  surprise: string;
  time: string;
  symbol: string;
  name: string;
  marketCap: number;
  fiscalQuarterEnding: string;
  epsForecast: number;
  noOfEsts: number;
};
