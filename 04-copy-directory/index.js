const fs = require('fs');
const path = require('path');

const { stdout } = process;
fs.rm(path.join(__dirname, 'files-copy'), { recursive: true },() => {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, () => {});
  fs.readdir(path.join(__dirname, 'files'), (error, files) => {
    if (error) {
      stdout.write('Error \n');
    } else {
      files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), error  => {
          if (error) {
            stdout.write('Copy Error \n');
          }
        });
      });
    }
    stdout.write('File copying completed \n');
  });

});




  
   

