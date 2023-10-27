import { getNasdaqIntradayQuotes } from "./api/nasdaq";
import { getWikipediaSP500CompaniesList } from "./api/wikipedia";
import { saveIntradayQuotes } from "./save";
import progress from "cli-progress";

async function main() {
  const sp500List = await getWikipediaSP500CompaniesList();
  const bar = new progress.SingleBar(
    {
      format:
        "Infraday [{bar}] {percentage}% | {company} | ETA: {eta}s | {value}/{total}",
    },
    progress.Presets.shades_classic
  );
  bar.start(sp500List.length, 0);

  // Save Intraday Quotes
  for (let i = 0; i < sp500List.length; i++) {
    bar.update(i, { company: sp500List[i].symbol + " - " + sp500List[i].name });
    const company = sp500List[i];
    const quotes = await getNasdaqIntradayQuotes(company.symbol);
    saveIntradayQuotes(company.symbol, quotes);
    bar.update(i + 1);
  }
  bar.stop();
}

main();
