const { execSync } = require('child_process');
const path = require('path');
let ffmpegPath;
try {
  ffmpegPath = require('ffmpeg-static');
} catch(e) {
  execSync('npm install ffmpeg-static --no-save', { stdio: 'inherit' });
  ffmpegPath = require('ffmpeg-static');
}

const videoPath = path.join(__dirname, 'src', 'assets', 'canvasbg.gif');
const frames = [
  { time: '00:00:00', name: 'canvas_ref_1.png' },
  { time: '00:00:01', name: 'canvas_ref_2.png' },
  { time: '00:00:02', name: 'canvas_ref_3.png' }
];

frames.forEach(({ time, name }) => {
  const outPath = path.join(__dirname, name);
  const cmd = `"${ffmpegPath}" -i "${videoPath}" -ss ${time} -vframes 1 "${outPath}" -y`;
  execSync(cmd, { stdio: 'pipe' });
  console.log('Extracted', name);
});
console.log('Done!');
