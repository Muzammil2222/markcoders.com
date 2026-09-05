const fs = require('fs');
const https = require('https');

https.get('https://techdejure.vercel.app/assets/index-Cra3q88g.js', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const match = data.match(/atlas:\s*\{[\s\S]*?\},/);
    if (match) {
      console.log(match[0].substring(0, 500) + '...');
      fs.writeFileSync('atlas_data.txt', match[0]);
    } else {
      console.log('Not found by simple regex, trying another way.');
      // find "atlas" index
      const idx = data.indexOf('"atlas"');
      if (idx !== -1) {
        fs.writeFileSync('atlas_data.txt', data.substring(idx - 50, idx + 2000));
        console.log('Found "atlas" string, saved a chunk.');
      }
    }
  });
});
