const path = require('path');
const fs = require('fs');

/*console.log(path.join(__dirname,'README.md'))
fs.stat(path.join(__dirname,'README.md'), (error, stats)=> {
  if (error) console.log('Bad file');
  else {
    console.log(stats.size);
  }
})
*/
const { stdout } = process;
const commonDirectory = path.join(__dirname,'secret-folder');
fs.readdir(commonDirectory, (error, files) => {
  if (error) {
    stdout.write('error');
  } else {
    files.forEach((file) => {
      fs.stat(path.join(commonDirectory, file), (error, stats) => {
        if (error) {
          stdout.write('File doesn\'t exist');
        } else if (stats.isFile()) {
          const name = path.basename(file, path.extname(file));
          const ext = path.extname(file).replace(/./, '');
          const size = stats.size;
          stdout.write(`${name} - ${ext} - ${size} B \n`);
        }
      });
    });
  }
});

