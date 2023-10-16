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
