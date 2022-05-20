const fs = require('fs');
const path = require('path');

const srcFrom = path.join(__dirname, 'styles');
const srcTo = path.join(__dirname, 'project-dist', 'bundle.css');

fs.rm(path.join(srcTo), { recursive: true },() => {

  fs.readdir(srcFrom, (error, files) => {
    if (!error) {
      files.forEach(file => {

        fs.stat(path.join(srcFrom, file), (error, stats) => {
          if (!error) {
            if (stats.isFile && path.extname(file) === '.css') {
              const input = fs.createReadStream(path.join(srcFrom, file), 'utf-8');
              const output = fs.createWriteStream(srcTo,  { flags: 'a'});
              input.pipe(output);
            }
          }
        });
      });
    }
  });
  console.log('Bundle was created\n');
});
