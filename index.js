import { readFile, writeFile } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import inquirer from "inquirer";

import { getExample } from "./js/createFont.js";

const configPath = join(homedir(), ".config/alacritty/alacritty.toml");

const configFont = join(homedir(), ".config/alacritty/nocritty.txt");

function readConfig() {
  return new Promise((resolve, reject) => {
    readFile(configPath, "utf8", (err, data) => {
      if (err) {
        // console.error("mi error", err);
        reject(err);
        return;
      }
      // console.log(data);
      resolve(data);
    });
  });
}

function writeConfig(data) {
  return new Promise((resolve, reject) => {
    writeFile(configPath, data, "utf-8", (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

function writeTest(data) {
  return new Promise((resolve, reject) => {
    writeFile("alacritty.toml", data, "utf-8", (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

function writeConfigTempleate(answers) {
  return `# Importar un tema
import = ["~/.config/alacritty/themes/themes/${answers.theme}.toml"]

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
size = ${answers.font_size}

[[keyboard.bindings]]
# Configuración de las teclas
action = "ToggleFullscreen"
key = "F11"

[scrolling]
# Configuración del historial de desplazamiento
history = 50000

[window]
# Configuración de la ventana
opacity = ${answers.opacity}
padding = { x = 5, y = 5 }
decorations = "full"
decorations_theme_variant = "light"

# Otras configuraciones adicionales

[mouse]
# Ocultar el ratón al escribir
hide_when_typing = true`;
}

export async function modifyConfig() {
  if (!configFont) {
    getExample();
  }

  try {
    const config = await readConfig();
    // console.log("Cofiguracion actual");
    // console.log(config);

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "font_size",
        message: "Nuevo tamaño de fuente:",
        default: 12,
      },
      {
        type: "input",
        name: "opacity",
        message: "Nueva opacidad:",
        default: 1,
      },
      {
        type: "list",
        name: "theme",
        message: "Nueva tema:",
        choices: [
          {
            value: "onedark",
            name: "One dark pro",
          },
          {
            value: "alacritty_0_12",
            name: "Alacritty",
          },
          {
            value: "aura",
            name: "Aura",
          },
        ],
      },
      // todo: Agregar mas preguntas
    ]);

    const newConfig = writeConfigTempleate(answers);

    console.log("nueva fuente: " + answers.font_size);
    console.log("nueva opacidad: " + answers.opacity);

    await writeConfig(newConfig);

    // Para ejecutar un pequeño test
    // await writeTest(newConfig);

    console.log("Configuración actualizada con éxito.");
  } catch (err) {
    console.error("Error: ", err);
  }
}

modifyConfig();
