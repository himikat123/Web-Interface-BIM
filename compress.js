const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const indexFile = path.join(__dirname, 'build', 'index.html');
const html = String(fs.readFileSync(indexFile));

const scriptRegex = /<script defer.+?<\/script>/g;
const script = html.match(scriptRegex)[0];
const scriptSrcRegex = /src="(.+)"/;
const scriptSrc = script.match(scriptSrcRegex)[1];
const jsOutputFilePath = path.join(__dirname, 'build/static/js', scriptSrc.split('/')[3] + '.gz');
const jsGzip = zlib.createGzip();
const jsFile = path.join(__dirname, 'build', scriptSrc);
const jsInputStream = fs.createReadStream(jsFile);
const jsOutputStream = fs.createWriteStream(jsOutputFilePath);
jsInputStream.pipe(jsGzip).pipe(jsOutputStream);

const cssRegex = /<link href="(.+)" rel/;
const cssSrc = html.match(cssRegex)[1];
const cssOutputFilePath = path.join(__dirname, 'build/static/css', cssSrc.split('/')[3] + '.gz');
const cssGzip = zlib.createGzip();
const cssFile = path.join(__dirname, 'build', cssSrc);
const cssInputStream = fs.createReadStream(cssFile);
const cssOutputStream = fs.createWriteStream(cssOutputFilePath);
cssInputStream.pipe(cssGzip).pipe(cssOutputStream);

let modifiedData = html;
const scriptRegex2 = /<script defer="defer" src="(\/static\/js\/main[^"]*)"><\/script>/;
modifiedData = modifiedData.replace(scriptRegex2, '');
const linkRegex = /<link href="(\/static\/css\/main[^"]*)" rel="stylesheet">/;
modifiedData = modifiedData.replace(linkRegex, '');
modifiedData = modifiedData.replace('styles.css', cssSrc);
modifiedData = modifiedData.replace('script.js', scriptSrc);

fs.writeFile(indexFile, modifiedData, 'utf8', (err) => {
    if(err) console.error('Error writing the file:', err);
});
const gzip = zlib.createGzip();
const input = fs.createReadStream(indexFile);
const output = fs.createWriteStream(`${indexFile}.gz`);
input.pipe(gzip).pipe(output);


console.log('done');