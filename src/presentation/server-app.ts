import { ChangeConfigService } from "../services/change-config.service";

interface RunOptions {
  size: number;
  opacity: number;
  padding: number;
}

export class ServerApp {
  static run({ size, opacity, padding }: RunOptions): void {
    console.log("Server run...");

    const configService = new ChangeConfigService();

    const readFileConfig = configService.readConfig();
    if (!readFileConfig) return;

    configService.writeConfigSize(size, opacity, padding);
  }
}
