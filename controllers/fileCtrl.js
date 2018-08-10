const User = require('../models/user');
const Company = require('../models/company')
const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

exports.addImage = async(req, res) => {
cloudinary.uploader.upload(req.body.image, (result) => {
const savedData = async () => {
  if(req.body.image){
    await User.update({
      '_id': req.body.User._id
    }, {
      "imageId":result.public_id,
      "imageVersion":result.version
    });
  }
}
savedData()
.then(result => {
  return res.status(200).json({message: 'Profile image uploaded'});
})
});
}
 
//we get the method addLogo
exports.addLogo = async(req, res) => {
  cloudinary.uploader.upload(req.body.image, (result) => {
  const savedData = async () => {
    if(req.body.image){
      await Company.update({
        '_id': req.body.company
      }, {
        //save the imageid and version in the document for that company.
        "imageId":result.public_id,
        "imageVersion":result.version
      });
    }
  }
  savedData()
  .then(result => {
    return res.status(200).json({message: 'Company logo uploaded'});
  })
  });
}