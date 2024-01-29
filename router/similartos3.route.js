const fs = require('fs');
const router = require('express').Router();
const Auth = require('../middleware/auth.middleware');
const path = require('path');
const { upload } = require('../middleware/multer.middleware');
const UploadModel = require('../model/upload.model');

router.post('/createBucket', Auth.userAuthMiddle, async (req, res) => {
	const folderName = req.body.folderName;
	if (!folderName) {
		return res.json({ status: 400, message: 'Folder Name is Mandatory' });
	}

	const rootFolder = 'rootFolder';
	const folderPath = `${rootFolder}/${folderName}`;
	try {
		if (fs.existsSync(rootFolder)) {
			if (!fs.existsSync(folderPath)) {
				fs.mkdirSync(folderPath);

				return res.json({ status: 200, message: 'Bucket Creataed' });
			}
		} else {
			fs.mkdirSync(rootFolder);
			if (!fs.existsSync(folderPath)) {
				fs.mkdirSync(folderPath);
				return res.json({ status: 200, message: 'Bucket Creataed' });
			}
		}
		return res.json({ status: 200, message: 'Bucket Creataed' });
	} catch (e) {
		console.log(e);
	}
});

router.get('/getallBuckets', Auth.userAuthMiddle, async (req, res) => {
	const rootPath = path.join('rootFolder');
	fs.readdir(rootPath, (err, files) => {
		const directories = files.filter((file) => {
			const filePath = path.join(rootPath, file);
			return fs.statSync(filePath).isDirectory();
		});

		if (directories) {
			return res.json({ status: 200, message: directories });
		}
	});
});

router.post('/uploadFile', Auth.userAuthMiddle, upload().single('myFile'), async (req, res) => {
	if (req.file) {
		console.log('req.file', req.file);
		const fileFullPath = req.file.destination + req.file.filename;
		const uploadedData = new UploadModel({
			userId: req.user._id,
			filename: req.file.filename,
			mineType: req.file.mineType,
			path: fileFullPath
		});
		await uploadedData.save();
		return res.json({ status: 200, message: 'File successfully uploaded' });
	}
});

router.get('/getAllFiles', Auth.userAuthMiddle, async (req, res) => {
	const bucketName = req.body.bucketName;
	if (!bucketName) {
		return res.json({ status: false, message: 'Please Provide Bucket name' });
	}
	try {
		const directoryPath = path.join(`rootFolder/${bucketName}`);
		fs.readdir(directoryPath, (err, files) => {
			const allFiles = files.filter((file) => {
				const filePath = path.join(directoryPath, file);
				return fs.statSync(filePath).isFile();
			});
			return res.json({ status: true, message: allFiles });
		});
	} catch (error) {
		console.log(error);
	}
});

router.delete('/deleteFileFromBucket', Auth.userAuthMiddle, async (req, res) => {
	const { folderName, fileName } = req.body;
	if (!folderName) {
		return res.json({ message: 'folderName is mandatory' });
	}
	if (!fileName) {
		return res.json({ message: 'fileName is mandatory' });
	}
    const rootFolder = "rootFolder"
    const filePath = `rootFolder/${folderName}/${fileName}`

    try {
        fs.unlink(filePath,()=>{
            if (err) {

                
            }
        })
		return res.json({ message: 'fileDeleted successfully' });

        
    } catch (error) {
        
    }
});

module.exports = router;
