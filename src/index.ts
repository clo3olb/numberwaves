const BASE_URL = "https://query1.finance.yahoo.com";
const TICKER = "AAPL";
const REGION = "US";
const corsDomain = "www.hello.com";
const API_URL = `${BASE_URL}/v8/finance/chart/${TICKER}?region=${REGION}&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=${corsDomain}&.tsrc=finance`;

console.log(API_URL);
