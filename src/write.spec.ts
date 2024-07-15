import { writeFile, readFile, writeFileSync } from "node:fs";

export async function writeTest(data: string) {

  // const read = await readFile('./alacritty-test.toml', 'utf-8', () => {})
  const write = writeFileSync('./alacritty-test.toml', data, 'utf-8')


  // return new Promise((resolve, reject) => {
  //   writeFile("alacritty.toml", data, "utf-8", (err) => {
  //     if (err) {
  //       reject(err);
  //       return;
  //     }

  //     resolve();
  //   });
  // });
}
