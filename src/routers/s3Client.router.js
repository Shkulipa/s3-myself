const { Router } = require("express");
const S3ClientController = require('./../controllers/s3Client.controller');

const router = Router();

router.get('/', S3ClientController.getListObjects);
router.get('/:key', S3ClientController.getObjectSignedUrl);
router.post('/', S3ClientController.upload);
router.delete('/:key', S3ClientController.delete);

module.exports = router;