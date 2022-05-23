const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const destination = path.join(__dirname, 'project-dist');
const destinationCSS = path.join(__dirname, 'project-dist', 'style.css');
const destinationAssets = path.join(__dirname, 'project-dist', 'assets');
const assets = path.join(__dirname, 'assets');
const components = path.join(__dirname, 'components');
const styles = path.join(__dirname, 'styles');

fs.mkdir((destination), { recursive: true }, () => {});

async function packHTML() {
  let packHTML = await fsPromises.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf-8' });
  const files = await fsPromises.readdir(components);
  for await (let file of files) {
    if (path.extname(path.join(components, file)) === '.html') {
      const name = path.basename(path.join(components, file), '.html');
      const copiedText = await fsPromises.readFile(path.join(components, file), 'utf-8');
      packHTML = packHTML.replaceAll(`{{${name}}}`, copiedText);
    }
  }
  fsPromises.writeFile(path.join(destination, 'index.html'), packHTML);
}
packHTML();

fs.readdir(styles, (error, files) => {
  if (error) {
    console.log('Error read styles \n');
  } else {
    files.forEach(file => {
      fs.stat(path.join(styles, file), (error, stats) => {
        if (error) {
          console.log('copy error styles \n');
        } else {
          if (stats.isFile && path.extname(file) === '.css') {
            const input = fs.createReadStream(path.join(styles, file), 'utf-8');
            const output = fs.createWriteStream(path.join(destinationCSS),  { flags: 'a'});
            input.pipe(output);
          }
        }
      });
    });
  }
});
  
fs.readdir(assets, (error, folders) => {
  if (error) {
    console.log('Error read assets \n');
  } else {
    folders.forEach( folder => {
      fs.mkdir(path.join(destinationAssets, folder),{recursive:true}, () => {
        fs.readdir(path.join(assets, folder), (error, files) => {
          if (error) {
            console.log('Error read files in assets \n');
          } else {
            files.forEach(file => {
              fs.copyFile(path.join(assets, folder, file), path.join(destinationAssets, folder, file), error => {
                if (error) {
                  console.log('Error copy assets \n');
                }
              });
            });
          }
        });
      });
    });
  }
}); 