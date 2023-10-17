import axios from "axios";
import { createUrlWithParams } from "../util";
import { Quote } from "../types";
import fs from "fs";

export async function getYahooQuotes(ticker: string): Promise<Quote[]> {
  const BASE_URL = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`;

  const API_URL = createUrlWithParams(BASE_URL, {
    ticker: "AAPL",
    interval: "1m",
    range: "1d",
    region: "US",
    lang: "en-US",
    includePrePost: true,
    useYfid: true,
    ".tsrc": "finance",
    corsDomain: "finance.yahoo.com",
  });

  const res = await axios.get(API_URL);
  const quote = await res.data.chart.result[0];

  const meta = quote.meta;
  const timestamps = quote.timestamp;

  const quotes: Quote[] = [];

  for (let i = 0; i < timestamps.length; i++) {
    quotes.push({
      ticker,
      timestamp: timestamps[i],
      date: new Date(timestamps[i] * 1000).toISOString(),
      open: quote.indicators.quote[0].open[i],
      high: quote.indicators.quote[0].high[i],
      low: quote.indicators.quote[0].low[i],
      close: quote.indicators.quote[0].close[i],
      volume: quote.indicators.quote[0].volume[i],
    });
  }

  return quotes;
}

// ?period1=511056000&period2=1696550400&interval=1d&events=history&includeAdjustedClose=true

export type HistoricalDataQueryOptions = {
  period1?: string;
  period2?: string;
  interval?: string;
  events?: string;
  includeAdjustedClose?: boolean;
};

export async function downloadHistoricalData(
  ticker: string,
  options?: HistoricalDataQueryOptions
) {
  const BASE_URL = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}`;

  const defaultOptions: HistoricalDataQueryOptions = {
    period1: "411056000",
    period2: "1696550400",
    interval: "1d",
    events: "history",
    includeAdjustedClose: true,
  };

  const API_URL = createUrlWithParams(BASE_URL, {
    ...defaultOptions,
    ...options,
  });

  const response = await axios.get(API_URL);
  const data = response.data as string;

  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
  }
  fs.opendirSync("./data");
  fs.writeFileSync(`./data/${ticker}.csv`, data);

  const rows = data.split("\n");
  const histories: Quote[] = rows
    .map((row) => row.split(","))
    .map((row) => ({
      ticker,
      timestamp: new Date(row[0]).getTime(),
      date: row[0],
      open: Number(row[1]),
      high: Number(row[2]),
      low: Number(row[3]),
      close: Number(row[4]),
      volume: Number(row[6]),
    }));

  return histories;
}
