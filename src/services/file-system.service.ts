import { readFile, writeFile } from "node:fs";
import { configMainPath } from "../data/path";

export function readConfig() {
  return new Promise((resolve, reject) => {
    readFile(configMainPath, "utf8", (err, data) => {
      if (err) {
        // console.error("mi error", err);
        reject(err);
        return;
      }
      // console.log(data);
      resolve(data);
    });
  });
}

export function writeConfig(data: string): Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile(configMainPath, data, "utf-8", (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}
