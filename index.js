const fs = require('node:fs')
const os = require('node:os');
const path = require('node:path');

const fileFirst = './test.txt'
const fileSecong = path.join(os.homedir(), '.config/alacritty/alacritty.toml');

fs.readFile(fileSecong, 'utf8', (err, data)=> {
    if (err) {
    console.error('mi error',err);
    return;
  }
  console.log(data);
})

