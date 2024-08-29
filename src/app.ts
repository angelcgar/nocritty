import { yarg } from "./config/yargs.plugin";
import { ServerApp } from "./presentation/server-app";

(async () => {
  await main();
})();

async function main() {
  const { s: size, o: opacity, p: padding } = yarg;

  ServerApp.run({ size, opacity, padding });
}
