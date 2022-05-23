const fs = require('fs');
const path = require('path');

const destination = path.join(__dirname, 'project-dist');
const destinationCss = path.join(__dirname, 'project-dist', 'style.css');
const destinationAssets = path.join(__dirname, 'project-dist', 'assets');
const assets = path.join(__dirname, 'assets');
const components = path.join(__dirname, 'components');
const styles = path.join(__dirname, 'styles');

fs.mkdir((destination), { recursive: true }, () => {});

fs.readFile( path.join(__dirname, 'template.html'), 'utf-8', (error, data) => {
  if (error) console.log('Error read template \n');
  let templateText = data;

  fs.readdir( components, { withFileTypes: true }, (error, files) => {
    if (error) console.log('Error read components \n');
    files.forEach(file => {

      if (file.isFile() && path.extname(file.name) === '.html' ) {
        fs.readFile(path.join(components, file.name), (error, dataComponent) => {
          if (error) console.log('Error read component files');

          const copiedText = dataComponent;
          const name = path.basename(file.name, path.extname(file.name));

          templateText = templateText.replaceAll(`{{${name}}}`, copiedText);
  
          fs.writeFile(path.join(destination, 'index.html'), templateText, error => {
            if (error) console.log('Error wrire index.html');
          });
        });
      } 
    });
  });
  console.log('index.html added');
});

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
            const output = fs.createWriteStream(path.join(destinationCss),  { flags: 'a'});
            input.pipe(output);
          }
        }
      });
    });
    console.log('Styles merged and copied');
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
    console.log('Assets copied '); 
  }
}); 





