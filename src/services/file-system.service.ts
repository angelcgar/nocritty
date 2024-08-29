import fs from "node:fs";
import { configMainPath } from "../data/path";

export class FileSystemConfig {
  public readConfig() {
    const configOfAlacritty = fs.readFileSync(configMainPath, "utf-8");
    if (!configOfAlacritty) return "No hay configuración";

    return configOfAlacritty;
  }

  public writeConfig(data: string) {
    try {
      fs.writeFileSync(configMainPath, data, "utf-8");

      return true;
    } catch (error) {
      return false;
    }
  }
}
