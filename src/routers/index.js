const { Router } = require("express");

const s3Client = require("./s3Client.router");
const awsS3 = require("./awsS3.router");

const router = Router();

/**
 * @info
 * 2ва разных способа
 * 1й(s3) - просто ссылкой которая становится не действительной через некоторе вермя
 * 2я(awsS3) - доступна всегда
 */
router.use("/s3Client", s3Client);
router.use("/awsS3", awsS3);

module.exports = router;