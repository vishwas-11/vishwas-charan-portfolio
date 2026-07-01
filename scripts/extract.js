const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '..', 'PageIndex_Article.md');
const contentDir = path.join(__dirname, '..', 'src', 'content', 'articles');
const imgDir = path.join(__dirname, '..', 'public', 'images', 'article');

fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(imgDir, { recursive: true });

let md = fs.readFileSync(mdPath, 'utf8');

md = md.replace(/!\[([^\]]*)\]\(data:image\/svg\+xml;base64,([^\)]+)\)/g, (match, alt, base64) => {
    const svgData = Buffer.from(base64, 'base64').toString('utf8');
    const filename = alt.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.svg';
    fs.writeFileSync(path.join(imgDir, filename), svgData);
    return `![${alt}](/images/article/${filename})`;
});

fs.writeFileSync(path.join(contentDir, 'pageindex-rag.md'), md);
console.log('Extraction complete!');
