import { readFile, writeFile } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import inquirer from "inquirer";

const configPath = join(homedir(), ".config/alacritty/alacritty.toml");

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

export async function modifyConfig() {
  try {
    const config = await readConfig();
    console.log("Cofiguracion actual");
    console.log(config);

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "font_size",
        message: "Nuevo tamaño de fuente:",
      },
      {
        type: "input",
        name: "opacity",
        message: "Nueva opacidad:",
      },
      // todo: Agregar mas preguntas
    ]);

    // const newConfig = config.replace("size =", `size = ${answers.font_size}`);
    // const newConfig = config.replace(
    //   /size\s*=\s*\d+/,
    //   `size = ${answers.font_size}`
    // );

    // newConfig.replace(/opacity\s*=\d+/, `opacity = ${answers.opacity}`);
    let newConfig = config.replace(
      /size\s*=\s*\d+/,
      `size = ${answers.font_size}`
    );

    newConfig = newConfig.replace(
      /opacity\s*=\s*\d+(\.\d+)?/,
      `opacity = ${answers.opacity}`
    );

    console.log(answers.font_size);
    console.log(answers.opacity);

    await writeConfig(newConfig);
    // console.log(config);

    console.log("Configuración actualizada con éxito.");
  } catch (err) {
    console.error("Error: ", err);
  }
}

modifyConfig();
