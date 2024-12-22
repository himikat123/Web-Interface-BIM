const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const indexFile = path.join(__dirname, 'build', 'index.html');
const html = String(fs.readFileSync(indexFile));

const scriptRegex = /<script defer.+<\/script>/g;
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
const cssFile = path.join(__dirname, 'build', cssSrc);
const css = String(fs.readFileSync(cssFile));
const htmlcss = html.replace(`<link href="${cssSrc}" rel="stylesheet">`, `<style>${css}</style>`);
fs.writeFileSync(indexFile, htmlcss);

const htmlOutputFilePath = path.join(__dirname, 'build', 'index.html.gz');
const htmlGzip = zlib.createGzip();
const htmlInputStream = fs.createReadStream(indexFile);
const htmlOutputStream = fs.createWriteStream(htmlOutputFilePath);
htmlInputStream.pipe(htmlGzip).pipe(htmlOutputStream);

console.log('done');