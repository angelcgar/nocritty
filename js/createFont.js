import { readFile, writeFile } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const configFont = join(homedir(), ".config/alacritty/nocritty.txt");

export function getExample() {
  return new Promise((resolve, reject) => {
    readFile("example.txt", "utf-8", (err, data) => {
      if (err) throw err;

      writeFile(configFont, data, "utf-8", (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  });
}
