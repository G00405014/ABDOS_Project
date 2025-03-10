const fs = require('fs');
const path = require('path');
const https = require('https');

// Create directories if they don't exist
const directories = [
  'public/images',
  'public/images/testimonials',
  'public/images/team',
  'public/images/resources'
];

directories.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${fullPath}`);
  }
});

// Function to download an image from a URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(__dirname, '..', filepath);
    
    // Check if file already exists
    if (fs.existsSync(fullPath)) {
      console.log(`File already exists: ${filepath}`);
      return resolve();
    }
    
    const file = fs.createWriteStream(fullPath);
    
    https.get(url, response => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', err => {
      fs.unlink(fullPath, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

// List of images to download
const images = [
  {
    url: 'https://placehold.co/1200x800/0ea5e9/ffffff?text=AI+Skin+Analysis&font=montserrat',
    path: 'public/images/hero-image.jpg'
  },
  {
    url: 'https://placehold.co/800x600/0ea5e9/ffffff?text=AI+Visualization&font=montserrat',
    path: 'public/images/ai-visualization.jpg'
  },
  {
    url: 'https://placehold.co/1000x800/0ea5e9/ffffff?text=Analysis+Dashboard&font=montserrat',
    path: 'public/images/cta-image.jpg'
  },
  {
    url: 'https://placehold.co/600x400/10b981/ffffff?text=Good+Photo+Example&font=montserrat',
    path: 'public/images/good-photo-example.jpg'
  },
  {
    url: 'https://placehold.co/600x400/ef4444/ffffff?text=Bad+Photo+Example&font=montserrat',
    path: 'public/images/bad-photo-example.jpg'
  },
  {
    url: 'https://placehold.co/800x600/0ea5e9/ffffff?text=AI+Technology&font=montserrat',
    path: 'public/images/ai-technology.jpg'
  },
  {
    url: 'https://placehold.co/200x200/0ea5e9/ffffff?text=User+1&font=montserrat',
    path: 'public/images/testimonials/user1.jpg'
  },
  {
    url: 'https://placehold.co/200x200/0ea5e9/ffffff?text=User+2&font=montserrat',
    path: 'public/images/testimonials/user2.jpg'
  },
  {
    url: 'https://placehold.co/200x200/0ea5e9/ffffff?text=User+3&font=montserrat',
    path: 'public/images/testimonials/user3.jpg'
  },
  {
    url: 'https://placehold.co/300x300/0ea5e9/ffffff?text=Doctor+1&font=montserrat',
    path: 'public/images/team/doctor1.jpg'
  },
  {
    url: 'https://placehold.co/300x300/0ea5e9/ffffff?text=Doctor+2&font=montserrat',
    path: 'public/images/team/doctor2.jpg'
  },
  {
    url: 'https://placehold.co/300x300/0ea5e9/ffffff?text=Developer+1&font=montserrat',
    path: 'public/images/team/developer1.jpg'
  },
  {
    url: 'https://placehold.co/1200x600/0ea5e9/ffffff?text=About+Hero&font=montserrat',
    path: 'public/images/about-hero.jpg'
  },
  {
    url: 'https://placehold.co/800x600/0ea5e9/ffffff?text=Skin+Anatomy&font=montserrat',
    path: 'public/images/resources/skin-anatomy.jpg'
  },
  {
    url: 'https://placehold.co/800x600/0ea5e9/ffffff?text=Cancer+Types&font=montserrat',
    path: 'public/images/resources/cancer-types.jpg'
  },
  {
    url: 'https://placehold.co/800x600/0ea5e9/ffffff?text=Prevention&font=montserrat',
    path: 'public/images/resources/prevention.jpg'
  }
];

// Download all images
async function downloadAllImages() {
  for (const image of images) {
    try {
      await downloadImage(image.url, image.path);
    } catch (error) {
      console.error(`Error downloading ${image.path}:`, error);
    }
  }
  console.log('All images downloaded successfully!');
}

downloadAllImages(); 