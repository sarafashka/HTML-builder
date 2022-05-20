const fs = require('fs');
const path = require('path');

const srcText = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(srcText, 'utf-8');

let textData = '';
stream.on('data', chunk => textData += chunk);
stream.on('end', () => console.log(textData));
stream.on('error', error => console.log('Error', error.message));
