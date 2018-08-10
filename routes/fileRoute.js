const express = require('express');
const router = express.Router();
const FileCtrl = require('../controllers/fileCtrl');


router.post('/v1/profile/upload', FileCtrl.addImage);
router.post('/v1/company/upload', FileCtrl.addLogo);

module.exports = router;