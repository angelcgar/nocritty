import { ChangeConfigService } from "../services/change-config.service";

import type { ThemeOptions } from "../types";

interface RunOptions {
  size: number;
  opacity: number;
  padding: number;
  theme: string;
}

export class ServerApp {
  static run({ size, opacity, padding, theme }: RunOptions): void {
    console.log("Aplication run...");

    const configService = new ChangeConfigService();

    const readFileConfig = configService.readConfig();
    if (!readFileConfig) return;

    configService.writeConfigAlacritty(
      size,
      opacity,
      padding,
      theme as ThemeOptions
    );
  }
}
