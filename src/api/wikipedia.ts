import axios from "axios";
import cheerio from "cheerio";
import { Company } from "../types";

export async function getWikipediaSP500CompaniesList(): Promise<Company[]> {
  const url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies";

  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  require("fs").writeFileSync("./test.txt", res.data);
  const table = $("#constituents");
  const rows = table.find("tr");

  const companies = rows
    .map((i, row) => {
      console.log($(row).text());
      const tds = $(row).find("td");
      const symbol = $(tds[0]).text().trim();
      const name = $(tds[1]).text().trim();
      const sector = $(tds[2]).text().trim();
      const industry = $(tds[3]).text().trim();
      const location = $(tds[4]).text().trim();
      const dateAdded = $(tds[5]).text().trim();
      const cik = $(tds[6]).text().trim();
      const founded = $(tds[7]).text().trim();

      const company: Company = {
        symbol,
        name,
        sector,
        industry,
        location,
        dateAdded,
        cik,
        founded,
      };

      return company;
    })
    .get();

  // Remove the first row, which is the header
  return companies.slice(1);
}
