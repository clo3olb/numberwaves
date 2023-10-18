export type RawQuote = {
  ticker: string;
  timestamp: string;
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export type RawEarning = {
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

export type RawEarningWithoutDate = Omit<RawEarning, "date">;

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
