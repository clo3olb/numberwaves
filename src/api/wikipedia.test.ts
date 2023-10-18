import nock from "nock";
import { getWikipediaSP500CompaniesList } from "./wikipedia";

describe("wikipedia", () => {
  it("must return a list of companies", async () => {
    nock("https://en.wikipedia.org")
      .get("/wiki/List_of_S%26P_500_companies")
      .reply(200, testHtml);
    const companies = await getWikipediaSP500CompaniesList();
    expect(companies).toHaveLength(1);
    expect(companies[0]).toEqual({
      symbol: "ZION",
      name: "Zions Bancorporation",
      sector: "Financials",
      industry: "Regional Banks",
      location: "Salt Lake City, Utah",
      dateAdded: "2001-06-22",
      cik: "0000109380",
      founded: "1873",
    });
  });
});

const testHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>List of S&amp;P 500 companies - Wikipedia</title>
  </head>
  <body>
    <table class="wikitable sortable" id="constituents">
      <tbody>
        <tr>
          <th>
            <a href="/wiki/Ticker_symbol" title="Ticker symbol">Symbol</a>
          </th>
          <th>Security</th>
          <th>
            <a
              href="/wiki/Global_Industry_Classification_Standard"
              title="Global Industry Classification Standard"
              >GICS</a
            >
            Sector
          </th>
          <th>GICS Sub-Industry</th>
          <th>Headquarters Location</th>
          <th>Date added</th>
          <th>
            <a href="/wiki/Central_Index_Key" title="Central Index Key">CIK</a>
          </th>
          <th>Founded</th>
        </tr>

        <tr>
          <td>
            <a
              rel="nofollow"
              class="external text"
              href="https://www.nasdaq.com/market-activity/stocks/zion"
              >ZION</a
            >
          </td>
          <td>
            <a href="/wiki/Zions_Bancorporation" title="Zions Bancorporation"
              >Zions Bancorporation</a
            >
          </td>
          <td>Financials</td>
          <td>Regional Banks</td>
          <td>
            <a
              href="/wiki/Salt_Lake_City,_Utah"
              class="mw-redirect"
              title="Salt Lake City, Utah"
              >Salt Lake City, Utah</a
            >
          </td>
          <td>2001-06-22</td>
          <td>0000109380</td>
          <td>1873</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;
