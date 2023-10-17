import axios from "axios";
import { formatDate } from "../util";

export async function getIntradayQuotes(ticker: string) {
  // https://charting.nasdaq.com/data/charting/intraday?symbol=TSLA&mostRecent=1&includeLatestIntradayData=1
  const numberOfDays = 20;
  const url = `https://charting.nasdaq.com/data/charting/intraday?symbol=${ticker}&mostRecent=${numberOfDays}&includeLatestIntradayData=1`;
  const res = await axios.get(url, {
    headers,
  });
  const data = res.data;
  return data;
}

export async function getEarnings(date: Date) {
  //https://www.nasdaq.com/market-activity/earnings
  const formattedDate = formatDate(date);
  const url = `https://api.nasdaq.com/api/calendar/earnings?date=${formattedDate}`;

  const res = await axios.get(url, { timeout: 1000 * 10, headers });
  const data = res.data.data;

  if (res.data.status.rCode !== 200 || res.status !== 200) {
    const message = res.data.status.message;
    throw new Error(message);
  }

  return data;
}

const headers = {
  Accept: "*/*",
  "Accept-Encoding": " gzip, deflate, br",
  "Accept-Language": " ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
  Connection: " keep-alive",
  Cookie:
    " pbjs_sharedId=e686a222-ffed-4b63-ae5f-b5c816686b26; volatileMarket=true; _cc_id=229453c4b0ba2c542b9d76131bb4674a; panoramaId=948700b36fd8fbf87ab6a485dcdd16d53938e695798b37f15af001c843223d03; panoramaIdType=panoIndiv; _gcl_au=1.1.2003920579.1697522579; _gid=GA1.2.725983887.1697522579; _rdt_uuid=1697522579796.cffdf231-ae0a-4f80-8452-1fc5d9043bce; _biz_uid=715d25055b104cb499a7298d7ede1c01; _biz_flagsA=%7B%22Version%22%3A1%2C%22ViewThrough%22%3A%221%22%2C%22XDomain%22%3A%221%22%7D; _fbp=fb.1.1697522580052.140474941; _clck=13n53dg|2|ffx|0|1385; panoramaId_expiry=1698127385201; entryUrl=https://www.nasdaq.com/market-activity/earnings; entryReferringURL=https://www.google.com/; _biz_sid=24ea2c; ak_bmsc=D776C91552E28082C882A2011D0B7FB6~000000000000000000000000000000~YAAQndocuIv+CByLAQAAHMVIPRWoLyuLA0jS3Haw7VrLgBLiOgrD6071he/BC7Svqu+t7yZ5Kskq4RPBWoVyp/bUGz7LjIZp38wXHRTZKhYi8rLF9GKFrca8EvL9N8t6bOV+wPerLfYv/fSfaSgiL9G0+m+hBRJBvJm5Y+V1G0bu1XK8b/SRFUP/sM+cXMkL36y3lJF0Nv85m0CLObPIsZm286BFQQRSuafV//cLiSV30obi7OIq2zQwzYiW4AK/sxHNV2i88gUHHZf56CG9iDw4JypRhRDMVSSQIkhYux5weJIzWqjJ7i+KZRziQm4HInsxpj6ew5MaThbcmjOYNV3qHPbkHl5J/EUXnhIbcAnWU8XGtLv11ABOawO7bnxrV3v5Q8t2YvV1CkTqTyOzw7dpNrGlm1FkxXyb1MM1EhxirgxnqTjYtdvRpgxnQBIjqd14VynvuSifo3y7hPXC5TEQ+XH+sdaBtik+kWDBVDdjp2nY82Vji3m+Fm0=; AKA_A2=A; leadChannelMostRecent=Search; pbjs_sharedId_cst=zix7LPQsHA%3D%3D; recentlyViewedList=TSLA|Stocks; todaysViewedSymbol=TSLA|Stocks; bfp_sn_rf_8b2087b102c9e3e5ffed1c1478ed8b78=Direct/External; bfp_sn_rt_8b2087b102c9e3e5ffed1c1478ed8b78=1697540281398; bfp_sn_pl=1697540281|1_95310302; tr_jt_okta=; _hjFirstSeen=1; OptanonAlertBoxClosed=2023-10-17T10:58:22.236Z; OptanonConsent=isGpcEnabled=0&datestamp=Tue+Oct+17+2023+18%3A59%3A00+GMT%2B0800+(GMT%2B08%3A00)&version=202306.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0005%3A1%2CC0004%3A1%2CC0001%3A1%2CC0003%3A1%2CC0002%3A1&AwaitingReconsent=false&geolocation=HK%3BHCW; _biz_nA=9; _ga_4VZJSZ76VC=GS1.1.1697539131.2.1.1697540340.59.0.0; _uetsid=d31744a06cb211eebb64ade759f0b942; _uetvid=d31785006cb211ee8bbe5be1ef155f84; _biz_pendingA=%5B%5D; _clsk=8kywk4|1697540342261|6|1|v.clarity.ms/collect; _ga=GA1.2.885752004.1697522579; bm_sv=EC95BD688FA0C6C3A7294EB5F8A67A56~YAAQndocuFo5CRyLAQAAJgVKPRVEuuypryD8Q0nt3u+w6vWrdZroLiI8exXqWle0JUjIwiualTSi8b/OuNB1elHYaVbRw9BX9X/RO44GxlIQV9sy0vM+0Gjqa1IGQNHFoGM3HdJWuXUFW/CpshGftZvgH0CehshV6dX6cQ6+mlQfHxKJXc+1f0O+NY8Q33vBqZVNn4NPGy4fIp1pZnxHG2M0vXSh4JPOI4fXrznchWYsvcgjTsWugP4tGuHgPP3Iew==~1; FCNEC=%5B%5B%22AKsRol-C9di7oUWexiSSSaUXtuJf-HlOvuBIwTu0XT6amIZgNF4Ea5d_qya5RJPp31Sqsxw7tsjKHfUR0B0iQpu3zslsLzVmIUPaZL1AFokTQBZRvI0Ugmdc68HbRupswabVNwzCB-D8NBlF1LUisqH4O211U6U52g%3D%3D%22%5D%2Cnull%2C%5B%5D%5D; cto_bundle=JV0juF83b2wlMkZpQzJZdkNuRzBGVUFwJTJGVEM1Yk5wVzJzS0VqMDBxJTJCTUZBZ0xqUHl5ekpRdmpjQzdQbzFSWnBIeHh3b20zNXFBTVN4RjdpMTlMaTFQRnIlMkZiRTZoQXNwd2E0Zk85OG5FZ2xpcmdNbnJFbFdHTm8lMkY2aU9FS2lvVVVPaG1HcnN0TTU0UlVsUHo1YVR3YVZDNkpEUXYxSnllcnd4TG8xJTJCVkExJTJCMzlnNHQwTFZXQzkxaXFaMGx1SXJYRU9rbTl1M1E4dXNTa3luNWdHa2Nubk1lUUV1SnclM0QlM0Q; cto_bidid=BkL8IV83bFdOWU95S0hqZ3BXTjdMbDJoOXlTRjg0SkZiRFZlcHdRa29rTUlmdGdJRmZHViUyQiUyQmMxSWZLVTdYbHByR01MRmV6WE1udURoMXhFZDdxRjFRTUdNWFl2b08wTEo2VHRrMW4xNiUyRnZwRnlGZyUzRA; __gads=ID=a74e99cac3f5d21b-225ecfc1efe400eb:T=1697522579:RT=1697540581:S=ALNI_MYNkXT4cGU2d85hmu8-h87pi_PoGg; __gpi=UID=00000c64fe993970:T=1697522579:RT=1697540581:S=ALNI_Mb3V9I4ipU9GO1AVKdI977rj24Vww",
  // Host: "charting.nasdaq.com",
  // Referer: "https://charting.nasdaq.com/dynamic/chart.html",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
  "sec-ch-ua":
    '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"macOS"',
};

/**

data: {
asOf: "Tue, Oct 3, 2023",
headers: {
time: "Time",
symbol: "Symbol",
name: "Company Name",
eps: "EPS",
surprise: "% Surprise",
marketCap: "Market Cap",
fiscalQuarterEnding: "Fiscal Quarter Ending",
epsForecast: "Consensus EPS* Forecast",
noOfEsts: "# of Ests"
},
rows: [
{
eps: "$0.65",
surprise: "N/A",
time: "time-not-supplied",
symbol: "MKC",
name: "McCormick & Company, Incorporated",
marketCap: "$15,981,842,127",
fiscalQuarterEnding: "Aug/2023",
epsForecast: "$0.65",
noOfEsts: "6"
},
{
eps: "$0.65",
surprise: "N/A",
time: "time-not-supplied",
symbol: "MKC.V",
name: "McCormick & Company, Incorporated",
marketCap: "$15,863,776,134",
fiscalQuarterEnding: "Aug/2023",
epsForecast: "",
noOfEsts: "N/A"
},
{
eps: "$0.02",
surprise: "300",
time: "time-not-supplied",
symbol: "CALM",
name: "Cal-Maine Foods, Inc.",
marketCap: "$2,399,658,210",
fiscalQuarterEnding: "Aug/2023",
epsForecast: "($0.01)",
noOfEsts: "1"
},
{
eps: "($0.03)",
surprise: "N/A",
time: "time-not-supplied",
symbol: "NG",
name: "Novagold Resources Inc.",
marketCap: "$1,182,298,680",
fiscalQuarterEnding: "Aug/2023",
epsForecast: "",
noOfEsts: "N/A"
},
{
eps: "($0.20)",
surprise: "N/A",
time: "time-not-supplied",
symbol: "TRIB",
name: "Trinity Biotech plc",
marketCap: "$19,873,098",
fiscalQuarterEnding: "Jun/2023",
epsForecast: "",
noOfEsts: "N/A"
},
{
eps: "($0.01)",
surprise: "N/A",
time: "time-not-supplied",
symbol: "SRM",
name: "SRM Entertainment, Inc.",
marketCap: "$15,403,500",
fiscalQuarterEnding: "Jun/2023",
epsForecast: "",
noOfEsts: "N/A"
}
]
},
message: null,
status: {
rCode: 200,
bCodeMessage: null,
developerMessage: null
}
}
 */
