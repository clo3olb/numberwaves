import { Quote } from "../types";

/**
 *
 * @param url - The url with path to append the params to.
 * @param params - The params to append to the url.
 * @returns The url with the params appended.
 */
export function createUrlWithParams(
  url: string,
  params: { [key: string]: any }
) {
  const keys = Object.keys(params);
  if (keys.length === 0) return url;

  const urlBase = url.split("?")[0];
  const existingParamStr = url.split("?")[1];

  const paramsList: string[] = [];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = params[key];

    if (value === undefined) continue;
    paramsList.push(`${key}=${value}`);
  }

  return (
    urlBase +
    "?" +
    (existingParamStr
      ? paramsList.length > 0
        ? existingParamStr + "&"
        : existingParamStr
      : "") +
    paramsList.join("&")
  );
}

export function formatFiscalEndingDate(date: string) {
  // Aug/2023 => 2023-08-31
  const month = date.split("/")[0];
  const year = date.split("/")[1];

  const monthNum = monthToNum(month);
  const day = new Date(Number(year), monthNum, 0).getDate();

  const monthStr = monthNum < 10 ? "0" + monthNum : monthNum;
  const dayStr = day < 10 ? "0" + day : day;

  return `${year}-${monthStr}-${dayStr}`;
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthStr = month < 10 ? "0" + month : month;
  const dayStr = day < 10 ? "0" + day : day;

  return `${year}-${monthStr}-${dayStr}`;
}

export function monthToNum(month: string) {
  switch (month.toLowerCase()) {
    case "jan":
    case "january":
      return 1;
    case "feb":
    case "february":
      return 2;
    case "mar":
    case "march":
      return 3;
    case "apr":
    case "april":
      return 4;
    case "may":
      return 5;
    case "jun":
    case "june":
      return 6;
    case "jul":
    case "july":
      return 7;
    case "aug":
    case "august":
      return 8;
    case "sep":
    case "september":
      return 9;
    case "oct":
    case "october":
      return 10;
    case "nov":
    case "november":
      return 11;
    case "dec":
    case "december":
      return 12;
    default:
      throw new Error("Invalid month");
  }
}

export function toQuotes(headers: string[], row: string[]): Quote {
  const keys: (keyof Quote)[] = [
    "ticker",
    "timestamp",
    "date",
    "open",
    "high",
    "low",
    "close",
    "volume",
  ];

  if (keys.length !== headers.length) {
    throw new Error("headers length and keys length are not equal");
  }
  if (keys.every((key) => headers.includes(key))) {
    throw new Error("headers does not include all keys");
  }
  if (keys.length !== row.length) {
    throw new Error("row length and keys length are not equal");
  }

  const quote: Quote = {
    ticker: row[headers.findIndex((header) => header === "ticker")],
    timestamp: row[headers.findIndex((header) => header === "timestamp")],
    date: row[headers.findIndex((header) => header === "date")],
    open: row[headers.findIndex((header) => header === "open")],
    high: row[headers.findIndex((header) => header === "high")],
    low: row[headers.findIndex((header) => header === "low")],
    close: row[headers.findIndex((header) => header === "close")],
    volume: row[headers.findIndex((header) => header === "volume")],
  };

  return quote;
}
