import axios from "axios";
import { createUrlWithParams } from "../util";
import { Quote } from "../types/Quote";

export async function getYahooQuotes(ticker: string): Promise<Quote[]> {
  const BASE_URL = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`;

  const API_URL = createUrlWithParams(BASE_URL, {
    ticker: "AAPL",
    interval: "2m",
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
      open: quote.indicators.quote[0].open[i],
      high: quote.indicators.quote[0].high[i],
      low: quote.indicators.quote[0].low[i],
      close: quote.indicators.quote[0].close[i],
      volume: quote.indicators.quote[0].volume[i],
    });
  }

  return quotes;
}
