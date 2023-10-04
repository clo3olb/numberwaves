import { getYahooQuotes } from "./api/yahoo";

async function main() {
  const quotes = await getYahooQuotes("AAPL");
  console.log({ quotes });
}

main();
