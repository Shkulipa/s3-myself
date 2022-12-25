const AWSS3 = require('./awsS3.service');

/**
 * @info
 * тут логика может быть в паре с БД
 */
class AWSService {
  async getObject(key) {
		try {
      return await AWSS3.getObject(key);
		} catch (err) {
			throw new Error(err);
		}
	}

  async getObjectByLink(key) {
		try {
      return await AWSS3.getObjectByLink(key);
		} catch (err) {
			throw new Error(err);
		}
	}

  async getListObjects() {
		try {
      const { Contents } = await AWSS3.getListObjects();
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

      await AWSS3.uploadFile(fileBuffer, uniqueName, mimetype);

      return uniqueName;
		} catch (err) {
			throw new Error(err);
		}
	}

  async delete(key) {
		try {
			AWSS3.deleteFile(key);
		} catch (err) {
			throw new Error(err);
		}
	}
}

module.exports = new AWSService();