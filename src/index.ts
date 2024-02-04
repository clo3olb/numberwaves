import { getNasdaqIntradayQuotes } from "./api/nasdaq";
import { getWikipediaSP500CompaniesList } from "./api/wikipedia";
import { saveIntradayQuotes } from "./save";
import progress from "cli-progress";

async function main() {
  const sp500List = await getWikipediaSP500CompaniesList();
  const bar = new progress.SingleBar(
    {
      format: "Infraday [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}",
    },
    progress.Presets.shades_classic
  );
  const complete: boolean[] = new Array(sp500List.length).fill(false);
  bar.start(sp500List.length, 0);

  const start = 0;
  // const start = sp500List.findIndex((company) => company.symbol === "UNP") - 1;

  function getProgress(): number {
    const value = complete.filter((c) => c).length;
    return value;
  }

  function updateProgressBar() {
    bar.update(getProgress());
  }

  async function task(i: number) {
    const company = sp500List[i];
    const quotes = await getNasdaqIntradayQuotes(company.symbol);
    if (quotes.length > 0) {
      saveIntradayQuotes(company.symbol, quotes);
    }
    complete[i] = true;
  }

  // Save Intraday Quotes

  const half = Math.floor(sp500List.length / 2);

  for (let i = start; i < half; i++) {
    task(i);
  }

  for (let i = half; i < sp500List.length; i++) {
    task(i);
  }

  while (getProgress() < half) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateProgressBar();
  }

  for (let i = half; i < sp500List.length; i++) {
    task(i);
  }

  while (getProgress() < sp500List.length) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateProgressBar();
  }

  bar.stop();
}

main();
