export type IntradayQuote = {
  ticker: string;
  timestamp: string;
  value: number;
  volume: number;
};

export type Quote = {
  ticker: string;
  timestamp: string;
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export type Earning = {
  date: string;
  eps: string;
  surprise: string;
  time: string;
  symbol: string;
  name: string;
  marketCap: string;
  fiscalQuarterEnding: string;
  epsForecast: string;
  noOfEsts: string;
};

export type Company = {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  location: string;
  dateAdded: string;
  cik: string;
  founded: string;
};
