export const templateConfig = `
# Importar un tema
[general]

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
size = 12

[[keyboard.bindings]]
# Configuración de las teclas
action = "ToggleFullscreen"
key = "F11"

[scrolling]
# Configuración del historial de desplazamiento
history = 50000

[window]
# Configuración de la ventana
opacity = 1
padding = { x = 5, y = 5 }
decorations = "full"
decorations_theme_variant = "light"

# Otras configuraciones adicionales

[mouse]
# Ocultar el ratón al escribir
hide_when_typing = true`;
