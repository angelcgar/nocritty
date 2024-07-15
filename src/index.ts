import inquirer, { Answers } from "inquirer";
// import { readFile, writeFile } from "node:fs";


import { getExample } from "./services/create-template.service";
import { templateLocal } from "./data/path";
import { writeConfigTempleate } from "./data/config";
import { AnswersLocal } from "./types/answers.interface";
import { writeTest } from "./write.spec";
import { readConfig, writeConfig } from "./services/file-system.service";

export async function modifyConfig() {
  if (!templateLocal) {
    getExample();
  }

  try {
    const config = await readConfig();
    // console.log("Cofiguracion actual");
    // console.log(config);

    const answers: Answers = await inquirer.prompt([
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
