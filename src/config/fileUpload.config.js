const fileUpload = require('express-fileupload')

const fileUploadConfig = fileUpload({
  createParentPath: true,
  parseNested: true
})

module.exports = fileUploadConfig;