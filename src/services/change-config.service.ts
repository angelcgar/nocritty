import fs from "node:fs";

import { templateConfig, configMainPath, themes } from "../data";

import type { ThemeOptions } from "../types";

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
    size: number,
    opacity: number,
    padding: number,
    theme: ThemeOptions
  ): void {
    theme = (themes[theme] as ThemeOptions) ?? themes.alacritty;

    this.newConfigAlacritty = templateConfig
      .replace(
        /import = \[.*\]/,
        `import = ["~/.config/alacritty/themes/themes/${themes[theme]}.toml"]`
      )
      .replace(
        /padding = \{.*\}/,
        `padding = { x = ${padding}, y = ${padding} }`
      )
      .replace(/size = \d+/, `size = ${size}`)
      .replace(/opacity = \d+/, `opacity = ${opacity}`);

    this.writeConfig(this.newConfigAlacritty);

    console.log(this.newConfigAlacritty);
    console.log({ size, opacity, padding, theme });
  }
}
