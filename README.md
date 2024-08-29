1. Consigue los temas para tu terminal, este comando es para usuarios de linux y es
   lo recomendable para este proyecto

```bash
mkdir -p ~/.config/alacritty/themes
git clone https://github.com/alacritty/alacritty-theme ~/.config/alacritty/themes
```

2. contrulle el programa

```bash
npm run build
```

3. Despues corre el programa con **node**

```bash
node dist/app.js -s 12 -o 0.9 -t hyper -p 5
# o sin abrebiaturas
node dist/app.js --size 12 --opacity 0.9 --theme hyper --padding 5
```

hacegurate de tener los temas de alacritty.
