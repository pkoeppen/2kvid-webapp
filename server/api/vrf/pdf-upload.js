'use strict';

import config from '../../config/environment';

const fs = require('fs'),
	path = require('path'),
	multiparty = require('multiparty'),
	rand = require('randomstring');

function upload(tmpPath) {
	return new Promise((resolve, reject) => {

		fs.readFile(tmpPath, (err, res) => {
			if (err) { return reject(err); }

			let fileName = rand.generate(8) + '.pdf',
				uploadDir = path.join(config.root, 'client/uploads'),
				fullPath = path.join(config.root, 'client/uploads', fileName);

			// NOTE: Node 6+ wants fs.constants.F_OK
			fs.access(uploadDir, fs.F_OK, (err) => {

				// if /uploads doesn't exist, make it exist
				if (err) { fs.mkdirSync(uploadDir); }

				fs.writeFile(fullPath, res, (err) => {
					if (err) { return reject(err); }
					let fileUrl = '/uploads/' + fileName;
					resolve(fileUrl);
				});

			});

		});

	});

}

function uploadPdf(req) {
	return new Promise((resolve, reject) => {

		let vrf = req.body || {};
		if ( vrf.hasOwnProperty('fileUrl') ) {
			// submitting new VRF

			if ( vrf.fileUrl !== '' ) {
				// parsed VRF; already contains temp path
				
				upload(vrf.fileUrl)
					.then((url) => {
						vrf.fileUrl = url;
						 return resolve(vrf);
					});

			} else {
				// blank VRF; no temp path
				return resolve(vrf);
			}

		} else {
			// uploading file to existing VRF

			let form = new multiparty.Form();
			form.parse(req, (err, fields, files) => {
				if (err) { return reject(err); }

				let tmpPath = files.file.shift().path;

				upload(tmpPath)
					.then((url) => {
						vrf.fileUrl = url;
						return resolve(vrf);
					});
			});

		}

	});
}

export default uploadPdf;