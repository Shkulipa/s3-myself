const s3Client = require('./s3Client.service');

/**
 * @info
 * тут логика может быть в паре с БД
 */
class AWSService {
  async getObjectSignedUrl(key) {
		try {
      return await s3Client.getObjectSignedUrl(key);
		} catch (err) {
			throw new Error(err);
		}
	}

  async getListObjects() {
		try {
      const { Contents } = await s3Client.getListObjects();
      const list = Contents.map(item => item.Key);
      return list;
		} catch (err) {
			throw new Error(err);
		}
	}

  async upload(file) {
		try {
      const { name, data: fileBuffer, mimetype } = file;

      const uniqueName = Date.now() + name;

      await s3Client.uploadFile(fileBuffer, uniqueName, mimetype);

      return uniqueName;
		} catch (err) {
			throw new Error(err);
		}
	}

  async delete(key) {
		try {
			await s3Client.deleteFile(key);
		} catch (err) {
			throw new Error(err);
		}
	}
}

module.exports = new AWSService();