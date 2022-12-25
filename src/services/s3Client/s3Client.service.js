const {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
	GetObjectCommand,
	ListObjectsCommand,
  ListObjectsV2Command
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

/**
 * @info
 * тут логика только по AWS
 */
class S3 {
	s3Client = new S3Client({
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
		};

		return this.s3Client.send(new PutObjectCommand(uploadParams));
	}

	deleteFile(fileName) {
		const deleteParams = {
			Bucket: bucketName,
			Key: fileName
		};

		return this.s3Client.send(new DeleteObjectCommand(deleteParams));
	}

	/**
	 * @info
	 * с временным доступом
	 */
	async getObjectSignedUrl(fileName) {
		const params = {
			Bucket: bucketName,
			Key: fileName
		};

		// https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
		const command = new GetObjectCommand(params);
		const seconds = 60;
		const url = await getSignedUrl(this.s3Client, command, {
			expiresIn: seconds
		});

		return url;
	}

	async getListObjects() {
		const params = {
			Bucket: bucketName
		};
		return await this.s3Client.send(new ListObjectsCommand(params));
	}
}

module.exports = new S3();
