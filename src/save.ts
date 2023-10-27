import fs from "fs";
import { IntradayQuote } from "./types";

export function saveIntradayQuotes(ticker: string, quotes: IntradayQuote[]) {
  quotes.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const infradayBasePath = `./data/infraday`;

  const basePath = `${infradayBasePath}/${ticker}`;
  const date = new Date(quotes[0].timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const filename = `${ticker}_${year}_${month}.csv`;
  const filePath = `${basePath}/${filename}`;

  if (!fs.existsSync(infradayBasePath)) {
    fs.mkdirSync(infradayBasePath);
  }

  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }

  const headers = ["timestamp", "value", "volume"];

  if (!fs.existsSync(filePath)) {
    // set headers. create if not exists
    fs.writeFileSync(filePath, headers.join(",") + "\n", {
      flag: "wx",
    });
  } else {
    // if exists, check headers first
    const fileContent = fs.readFileSync(filePath, "utf8");
    const fileHeaders = fileContent.split("\n")[0].split(",");
    if (fileHeaders.length !== headers.length) {
      throw new Error(
        `File ${filePath} has headers ${fileHeaders.join(
          ","
        )} but expected ${headers.join(",")}`
      );
    }

    // filter out existing quotes
    const existingQuotes = fileContent
      .split("\n")
      .slice(1)
      .map((row) => row.split(",")[0]);
    quotes = quotes.filter(
      (quote) => !existingQuotes.includes(quote.timestamp)
    );
  }

  // append
  fs.writeFileSync(
    filePath,
    quotes
      .map((quote) => [quote.timestamp, quote.value, quote.volume].join(","))
      .join("\n") + "\n",
    {
      flag: "a",
    }
  );
}
