const { exec } = require('child_process');
exec('webpack && node ./build/demo.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log('stdout:', stdout);
  // console.log('stderr:', stderr);
});
