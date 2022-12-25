const aws = require("aws-sdk")

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

class AWSS3 {
  s3Client = new aws.S3({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });

  uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
      Bucket: bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype
    }

    return this.s3Client.upload(uploadParams).promise();
  }

  async deleteFile(fileName) {
    const deleteParams = {
      Bucket: bucketName,
      Key: fileName,
    }
  
    return await this.s3Client.deleteObject(deleteParams).promise();
  }

  async getObject(key) {
    const params = {
      Bucket: bucketName,
      Key: key
    }

    /**
     * @info
     * return Buffer, mimetype and etc.
     * 
     * can check it, for convert file from buffer in normal type
     * i think that you should send it to front end, and after parse it there(on front side)
     * https://stackoverflow.com/questions/36942442/how-to-get-response-from-s3-getobject-in-node-js
     */
     return await this.s3Client.getObject(params).promise();
  }

  async getObjectByLink(key) {
    /**
     * @info
     * you need remove check about:
     * "Block public and cross-account access to buckets and objects through any public bucket or access point policies"
     * in Block public access (bucket settings) in "Permissions" of bucket
     * 
     * 
     * but also for it, you should:
     * 1. Go into your Bucket,
     * 2. Go into "Permission"
     * 3. you need remove check about:
     * "Block public and cross-account access to buckets and objects through any public bucket or access point policies"
     * in Block public access (bucket settings) in "Permissions" of bucket
     */

    const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`
    return url;
  }

  async getListObjects() {
		const params = {
			Bucket: bucketName
		};
		return await this.s3Client.listObjectsV2(params).promise();
	}
} 

module.exports = new AWSS3();