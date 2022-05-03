
require('dotenv').config();
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dhhs6hvg7', 
    api_key: '952762836139314', 
    api_secret: '0uTFrhecrB-4dT0Xh9UTaXB2hNQ' 
  });
  module.exports={cloudinary}