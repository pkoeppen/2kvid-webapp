import config from '../../config/environment';
var fs = require('fs'),
	path = require('path'),
	multiparty = require('multiparty'),
	rand = require('randomstring');

function upload(tmpPath) {

	return new Promise((resolve, reject) => {

		fs.readFile(tmpPath, (err, res) => {
			if (err) { return reject(err); }

			var fileName = rand.generate(8) + '.pdf',
				uploadDir = path.join(config.root, 'client/uploads'),
				fullPath = path.join(config.root, 'client/uploads', fileName);

			// NOTE: Node 6+ wants fs.constants.F_OK
			fs.access(uploadDir, fs.F_OK, (err) => {

				// if /uploads doesn't exist, make it exist
				if (err) { fs.mkdirSync(uploadDir); }

				fs.writeFile(fullPath, res, (err) => {
					if (err) { return reject(err); }
					var fileUrl = '/uploads/' + fileName;
					resolve(fileUrl);
				});

			});

		});

	});

}

function uploadPdf(req) {

	return new Promise((resolve, reject) => {

		var vrf = req.body || {};

		if ( vrf.hasOwnProperty('fileUrl') && vrf.fileUrl !== '' ) { 

			// vrf already contains temp path
			upload(vrf.fileUrl)
				.then((url) => {
					vrf.fileUrl = url;
					resolve(vrf);
				});

		} else {

			var form = new multiparty.Form();

			// user is uploading file to existing VRF
			form.parse(req, (err, fields, files) => {
				if (err) { return reject(err); }

				var tmpPath = files.file.shift().path;

				upload(tmpPath)
					.then((url) => {
						vrf.fileUrl = url;
						resolve(vrf);
					});
			});

		}

	});
}

export default uploadPdf;