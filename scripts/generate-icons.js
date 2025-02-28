const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Check if ImageMagick is installed
exec('which convert', (error, stdout, stderr) => {
  if (error) {
    console.error('ImageMagick is not installed. Please install it first.');
    console.error('For macOS: brew install imagemagick');
    console.error('For Ubuntu/Debian: sudo apt-get install imagemagick');
    process.exit(1);
  }
  
  const publicDir = path.join(__dirname, '../public');
  const svgPath = path.join(publicDir, 'favicon.svg');
  
  if (!fs.existsSync(svgPath)) {
    console.error('SVG file not found at', svgPath);
    process.exit(1);
  }
  
  // Generate favicon.ico (16x16, 32x32, 48x48)
  exec(`convert -background none -density 384 ${svgPath} -define icon:auto-resize=16,32,48 ${path.join(publicDir, 'favicon.ico')}`, 
    (error, stdout, stderr) => {
      if (error) {
        console.error('Error generating favicon.ico:', error);
        return;
      }
      console.log('favicon.ico generated successfully');
    }
  );
  
  // Generate icon.png (32x32)
  exec(`convert -background none -density 384 ${svgPath} -resize 32x32 ${path.join(publicDir, 'icon.png')}`, 
    (error, stdout, stderr) => {
      if (error) {
        console.error('Error generating icon.png:', error);
        return;
      }
      console.log('icon.png generated successfully');
    }
  );
  
  // Generate apple-icon.png (180x180)
  exec(`convert -background none -density 384 ${svgPath} -resize 180x180 ${path.join(publicDir, 'apple-icon.png')}`, 
    (error, stdout, stderr) => {
      if (error) {
        console.error('Error generating apple-icon.png:', error);
        return;
      }
      console.log('apple-icon.png generated successfully');
    }
  );
}); 