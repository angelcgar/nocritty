import fs from "node:fs";
import { configMainPath } from "../data/path";

export class ChangeConfigService {
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

  public writeConfigSize(size: number, opacity: number, padding: number) {
    const configLocal = this.readConfig();

    const indexConfig = configLocal
      .split("\n")
      .findIndex((v) => v.includes("size"));

    let newConfig = configLocal.split("\n").at(indexConfig);
    newConfig = `size = ${size}`;
    console.log(newConfig);

    const templateConfig = `

    # Importar un tema
    import = ["~/.config/alacritty/themes/themes/alacritty_0_12.toml"]

    [cursor]
    # Configuración del cursor
    style = { shape = "Underline", blinking = "On"}
    #unfocused_hollow = true
    thickness = 0.2

    [font]
    # Configuración de la fuente
    normal = { family = "UbuntuMono Nerd Font", style = "Regular" }
    bold = { family = "UbuntuMono Nerd Font", style = "Bold" }
    italic = { family = "UbuntuMono Nerd Font", style = "Italic" }
    bold_italic = { family = "UbuntuMono Nerd Font", style = "Bold Italic" }
    size = ${size}

    [[keyboard.bindings]]
    # Configuración de las teclas
    action = "ToggleFullscreen"
    key = "F11"

    [scrolling]
    # Configuración del historial de desplazamiento
    history = 50000

    [window]
    # Configuración de la ventana
    opacity = ${opacity}
    padding = { x = ${padding}, y = ${padding} }
    decorations = "full"
    decorations_theme_variant = "light"

    # Otras configuraciones adicionales

    [mouse]
    # Ocultar el ratón al escribir
    hide_when_typing = true`;

    this.writeConfig(templateConfig);
  }
}
