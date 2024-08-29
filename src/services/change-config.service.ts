import fs from "node:fs";

import { templateConfig, configMainPath } from "../data";

export class ChangeConfigService {
  public readConfig(): string {
    const configOfAlacritty = fs.readFileSync(configMainPath, "utf-8");
    if (!configOfAlacritty) return "No hay configuración";

    return configOfAlacritty;
  }

  public writeConfig(data: string): boolean {
    try {
      fs.writeFileSync(configMainPath, data, "utf-8");

      return true;
    } catch (error) {
      return false;
    }
  }

  public newConfigAlacritty: string = templateConfig;

  public writeConfigAlacritty(
    opacity: number,
    padding: number,
    size: number,
    theme: string
  ): void {
    this.newConfigAlacritty;

    this.newConfigAlacritty = templateConfig.replace(
      /size = \d+/,
      `size = ${size}`
    );

    this.newConfigAlacritty = templateConfig.replace(
      /opacity = \d+/,
      `opacity = ${opacity}`
    );

    this.newConfigAlacritty = templateConfig.replace(
      /padding = \{.*\}/,
      `padding = { x = ${padding}, y = ${padding} }`
    );

    this.newConfigAlacritty = templateConfig.replace(
      /import = \[.*\]/,
      `import = ["~/.config/alacritty/themes/themes/${theme}.toml"]`
    );

    this.writeConfig(this.newConfigAlacritty);

    // console.log(this.newConfigAlacritty);
    console.log("Hecho");
  }
}
