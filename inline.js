const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const indexFile = path.join(__dirname, 'build', 'index.html');
let html = String(fs.readFileSync(indexFile));

const scriptRegex = /<script defer.+<\/script>/g;
const script = html.match(scriptRegex)[0];
const scriptSrcRegex = /src="(.+)"/;
const scriptSrc = script.match(scriptSrcRegex)[1];
const jsFile = path.join(__dirname, 'build', scriptSrc);
const js = String(fs.readFileSync(jsFile));

const linkRegex = /<link href.+stylesheet">/g;
const link = html.match(linkRegex)[0];
const cssRegex = /<link href="(.+)" rel/;
const cssSrc = html.match(cssRegex)[1];
const cssFile = path.join(__dirname, 'build', cssSrc);
let css = String(fs.readFileSync(cssFile));

html = html.replace(script, '');
html = html.replace(link, '<style>' + css + '</style>');
html = html.replace('</body></html>', '');
html += '<script>' + js + '</script></body></html>';

const htmlFile = path.join(__dirname, 'build', 'index.html');
if(fs.existsSync(htmlFile)) fs.unlinkSync(htmlFile);
fs.writeFileSync(htmlFile, html);

const outputFilePath = path.join(__dirname, 'build', 'index.html.gz');
const gzip = zlib.createGzip();
const inputStream = fs.createReadStream(htmlFile);
const outputStream = fs.createWriteStream(outputFilePath);
inputStream.pipe(gzip).pipe(outputStream);

console.log('done');