import fs from "fs";
import { parse } from "csv-parse";

export function readCSV(
  filePath: string,
  onData: (headers: string[], row: string[]) => void
) {
  const headers: string[] = [];
  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: "," }))
    .on("data", (row) => {
      if (headers.length === 0) {
        headers.push(...row);
        return;
      }
      onData(headers, row);
    });
}

export function writeCSV(filePath: string, rows: string[][]) {
  const stream = fs.createWriteStream(filePath, { flags: "w" });
  stream.write(rows.map((row) => row.join(",")).join("\n"));
  stream.end();
}
