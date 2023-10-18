import nock from "nock";
import { getNasdaqEarnings, getNasdaqIntradayQuotes } from "./nasdaq";

describe("nasdaq - getNasdaqIntradayQuotes", () => {
  it("must return a list prices", async () => {
    nock("https://charting.nasdaq.com")
      .get(
        "/data/charting/intraday?symbol=AAPL&mostRecent=7&includeLatestIntradayData=1"
      )
      .reply(200, testIntradayQuotesJson);

    const quotes = await getNasdaqIntradayQuotes("AAPL");
    expect(quotes).toHaveLength(3);
    expect(quotes[0]).toEqual({
      ticker: "AAPL",
      timestamp: "2023-10-10 09:30:00",
      value: 178.509995,
      volume: 1203100,
    });
    expect(quotes[1]).toEqual({
      ticker: "AAPL",
      timestamp: "2023-10-10 09:31:00",
      value: 178.809998,
      volume: 271947,
    });
    expect(quotes[2]).toEqual({
      ticker: "AAPL",
      timestamp: "2023-10-10 09:32:00",
      value: 178.804993,
      volume: 257634,
    });
  });
});

describe("nasdaq - getNasdaqEarnings", () => {
  it("must return a list of earnings", async () => {
    nock("https://api.nasdaq.com")
      .get("/api/calendar/earnings?date=2023-10-16")
      .reply(200, testEarningsJson);

    const earnings = await getNasdaqEarnings(new Date("2023-10-16"));
    expect(earnings).toHaveLength(2);
    expect(earnings[0]).toEqual({
      eps: "$0.80",
      surprise: "77.78",
      time: "time-not-supplied",
      symbol: "HDB",
      name: "HDFC Bank Limited",
      marketCap: "$109,080,791,017",
      fiscalQuarterEnding: "Sep/2023",
      epsForecast: "$0.45",
      noOfEsts: "1",
      date: "2023-10-16",
    });
    expect(earnings[1]).toEqual({
      eps: "$0.77",
      surprise: "2.67",
      time: "time-not-supplied",
      symbol: "SCHW",
      name: "The Charles Schwab Corporation",
      marketCap: "$97,830,205,616",
      fiscalQuarterEnding: "Sep/2023",
      epsForecast: "$0.75",
      noOfEsts: "8",
      date: "2023-10-16",
    });
  });
});

const testIntradayQuotesJson = JSON.stringify({
  companyName: "APPLE INC",
  marketData: [
    { Date: "2023-10-10 09:30:00", Value: 178.509995, Volume: 1203100 },
    { Date: "2023-10-10 09:31:00", Value: 178.809998, Volume: 271947 },
    { Date: "2023-10-10 09:32:00", Value: 178.804993, Volume: 257634 },
  ],
});

const testEarningsJson = JSON.stringify({
  data: {
    asOf: "Mon, Oct 16, 2023",
    headers: [],
    rows: [
      {
        eps: "$0.80",
        surprise: "77.78",
        time: "time-not-supplied",
        symbol: "HDB",
        name: "HDFC Bank Limited",
        marketCap: "$109,080,791,017",
        fiscalQuarterEnding: "Sep/2023",
        epsForecast: "$0.45",
        noOfEsts: "1",
      },
      {
        eps: "$0.77",
        surprise: "2.67",
        time: "time-not-supplied",
        symbol: "SCHW",
        name: "The Charles Schwab Corporation",
        marketCap: "$97,830,205,616",
        fiscalQuarterEnding: "Sep/2023",
        epsForecast: "$0.75",
        noOfEsts: "8",
      },
    ],
  },
  message: null,
  status: { rCode: 200, bCodeMessage: null, developerMessage: null },
});
