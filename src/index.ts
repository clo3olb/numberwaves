import { getNasdaqIntradayQuotes } from "./api/nasdaq";
import { getWikipediaSP500CompaniesList } from "./api/wikipedia";
import { saveIntradayQuotes } from "./save";

async function main() {
  const sp500List = await getWikipediaSP500CompaniesList();

  // Save Intraday Quotes
  for (let i = 0; i < sp500List.length; i++) {
    const company = sp500List[i];
    console.log(`Fetching ${company.symbol}...`);
    const quotes = await getNasdaqIntradayQuotes(company.symbol);
    saveIntradayQuotes(company.symbol, quotes);
    console.log(`Saved ${company.symbol}`);
  }
}

main();
