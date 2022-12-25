const AWSService = require('./../services/s3Client/aws.service');

class S3ClientController {
  async getObjectSignedUrl(req, res) {
		try {
      const { key } = req.params;
			const obejctUrl = await AWSService.getObjectSignedUrl(key);
			return res.status(200).send(obejctUrl);
		} catch (err) {
			console.error(err);
			return res.status(500).send(err);
		}
	}

  async getListObjects(req, res) {
		try {
			const listObjects = await AWSService.getListObjects();
			return res.status(200).send(listObjects);
		} catch (err) {
			console.error(err);
			return res.status(500).send(err);
		}
	}

  async upload(req, res) {
		try {
      const { file } = req.files;
			const key = await AWSService.upload(file);
			return res.status(200).send(`Object was uploaded, key of this object: ${key}`);
		} catch (err) {
			console.error(err);
			return res.status(500).send(err);
		}
	}

  async delete(req, res) {
		try {
      const key = req.params.key
			await AWSService.delete(key);
			return res.status(200).send(`Object ${key} was deleted success!`);
		} catch (err) {
			console.error(err);
			return res.status(500).send(err);
		}
	}
}

module.exports = new S3ClientController();