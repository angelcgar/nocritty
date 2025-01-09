1. Consigue los temas para tu terminal, este comando es para usuarios de linux y es
   lo recomendable para este proyecto

```bash
mkdir -p ~/.config/alacritty/themes
git clone https://github.com/alacritty/alacritty-theme ~/.config/alacritty/themes
```

2. Verificar si tienes instalado NodeJs con `node --version`

3. Instala la herramienta de forma global en tu sistema
```bash
npm i nocritty -g
```

4. nocritty te ayuda configurar el tema de tu terminal alacritty, usa --help para
empezar

```bash
nocritty --help
Opciones:
      --version  Muestra número de versión                            [booleano]
  -s, --size     Size of font                                           [número]
  -o, --opacity  Opacity                                                [número]
  -p, --padding  Padding                                                [número]
  -t, --theme    Theme of terminal                        [cadena de caracteres]
  -h, --help     Muestra ayuda                                        [booleano]
  -l, --list     List all themes available                            [booleano]
  -S, --show     Show the current configuration                       [booleano]
```

**por favor ASEGÚRATE de tener los temas de alacritty.**

## Usando pnpm

1. Habilita pnpm usando `corepack enable pnpm`
2. Para crear variables de entorno para pnpm, `pnpm setup`
3. Refresca tu shell: Ejemplo con bash `source ~/.bashrc`
4. Instala nocritty de forma global con pnpm que tiene mejor manejo de los modulos
de node: `pnpm install nocritty --global`
