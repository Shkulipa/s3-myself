const { Router } = require("express");
const AWSS3Controller = require('./../controllers/awsS3.controller');

const router = Router();

/**
 * @info
 * key of file(it's a file name in bucket)
 */
 router.get('/', AWSS3Controller.getListObjects);
 router.get('/:key', AWSS3Controller.getObject);
 router.get('/getObjectByLink/:key', AWSS3Controller.getObjectByLink);
 router.post('/', AWSS3Controller.upload);
 router.delete('/:key', AWSS3Controller.delete);

module.exports = router;