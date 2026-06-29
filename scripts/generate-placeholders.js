const fs = require('fs');
const path = require('path');

const dirs = [
  'public/images/home',
  'public/images/projects/echo-ui',
  'public/images/projects/justos',
  'public/images/projects/happy-stats',
  'public/images/projects/cactus-plant',
  'public/images/about'
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, '..', dir), { recursive: true });
});

const createSvg = (text, width = 800, height = 600, bgColor = '#111') => `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial" font-size="40" fill="#666" text-anchor="middle" dy=".3em">${text}</text>
</svg>
`;

const files = [
  { path: 'public/images/home/avatar.svg', text: 'Avatar', width: 256, height: 256 },
  { path: 'public/images/projects/echo-ui/cover.svg', text: 'Echo UI Cover' },
  { path: 'public/images/projects/justos/cover.svg', text: 'JustOS Cover' },
  { path: 'public/images/projects/happy-stats/cover.svg', text: 'Happy Stats Cover' },
  { path: 'public/images/projects/cactus-plant/cover.svg', text: 'Cactus Plant Cover' },
  { path: 'public/images/about/coding.svg', text: 'Coding', width: 500, height: 500 },
  { path: 'public/images/about/bridge.svg', text: 'Bridge', width: 500, height: 500 },
  { path: 'public/images/about/dog.svg', text: 'Dog', width: 500, height: 500 },
];

files.forEach(file => {
  fs.writeFileSync(path.join(__dirname, '..', file.path), createSvg(file.text, file.width, file.height));
});

console.log('Placeholder images created successfully!');
