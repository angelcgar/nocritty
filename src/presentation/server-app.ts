import { FileSystemConfig } from "../services/file-system.service";

interface RunOptions {
  size: number;
  opacity: number;
  padding: number;
}

export class ServerApp {
  static run({ size, opacity, padding }: RunOptions): void {
    console.log("Server run...");

    const readFileConfig = new FileSystemConfig().readConfig();
    if (!readFileConfig) return;

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

    const writeFileConfig = new FileSystemConfig().writeConfig(templateConfig);
    if (!writeFileConfig) return;

    console.log("hecho");
  }
}
