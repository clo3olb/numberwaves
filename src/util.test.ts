import {
  createUrlWithParams,
  formatDate,
  formatFiscalEndingDate,
  monthToNum,
} from "./util";

describe("createUrlWithParams", () => {
  it("must correctly parse params into url", () => {
    const url = createUrlWithParams("https://www.google.com", {
      query: "hello",
      width: 400,
    });
    expect(url).toBe("https://www.google.com?query=hello&width=400");
  });
  it("must return url only if there is no params", () => {
    const url = createUrlWithParams("https://www.google.com", {});
    expect(url).toBe("https://www.google.com");
  });
  it("must correctly parse params if there are url params already in the base url", () => {
    const url = createUrlWithParams("https://www.google.com?query=hello", {
      width: 400,
    });
    expect(url).toBe("https://www.google.com?query=hello&width=400");
  });
  it("must correctly parse params into url if there is undefined params in function parameter ", () => {
    const url = createUrlWithParams("https://www.google.com", {
      width: 400,
      height: undefined,
      color: "green",
    });
    expect(url).toBe("https://www.google.com?width=400&color=green");
  });
  it("must correctly parse params into url if all params are undefined", () => {
    // https://www.google.com?crop=entropy&q=85
    const url = createUrlWithParams(
      "https://www.google.com?crop=entropy&q=85",
      { w: undefined, h: undefined }
    );
    expect(url).toBe("https://www.google.com?crop=entropy&q=85");
  });
});

describe("formatFiscalEndingDate", () => {
  it("must format Jan/2023 to 2023-01-31", () => {
    const date = formatFiscalEndingDate("Jan/2023");
    expect(date).toBe("2023-01-31");
  });
  it("must format Feb/2023 to 2023-02-28", () => {
    const date = formatFiscalEndingDate("Feb/2023");
    expect(date).toBe("2023-02-28");
  });
  it("must format Feb/2016 to ", () => {
    const date = formatFiscalEndingDate("Feb/2016");
    expect(date).toBe("2016-02-29");
  });
  it("must format Mar/2023 to 2023-03-31", () => {
    const date = formatFiscalEndingDate("Mar/2023");
    expect(date).toBe("2023-03-31");
  });
  it("must format Dec/2023 to 2023-12-31", () => {
    const date = formatFiscalEndingDate("Dec/2023");
    expect(date).toBe("2023-12-31");
  });
});

describe("formatDate", () => {
  it("must format 2021-01-01 to 2021-01-01", () => {
    const date = new Date("2021-01-01");
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("2021-01-01");
  });
  it("must format 2021/01/02 to 2021/01/02", () => {
    const date = new Date("2021/01/02");
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("2021-01-02");
  });
});

describe("monthToNum", () => {
  it("must return 1 for jan", () => {
    const n = monthToNum("jan");
    expect(n).toBe(1);
  });
  it("must return 2 for feb", () => {
    const n = monthToNum("feb");
    expect(n).toBe(2);
  });
  it("must return 12 for december", () => {
    const n = monthToNum("december");
    expect(n).toBe(12);
  });
  it("must have error for unexpected string", () => {
    expect(() => monthToNum("hello")).toThrow();
  });
});
