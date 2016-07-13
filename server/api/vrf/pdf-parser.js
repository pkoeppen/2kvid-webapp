'use strict';

const fs = require('fs'),
	multiparty = require('multiparty'),
	PDFParser = require('pdf2json');

function populateModel(data, path) {

	let obj = {};
	for (let i = 0, item; i < data.length; i++) {

		item = data[i];

		switch(true) {
			case /Project_Title/.test(item.id): obj.title = item.value; break;
			case /Requested_By/.test(item.id): obj.from = item.value; break;
			case /Project_Description/.test(item.id): obj.body = item.value; break;
			case /fileUrl/.test(item.id): obj.fileUrl = item.value; break;
		}
	}
	return obj;
}

function parsePdf(req) {

	return new Promise((resolve, reject) => {

		let form = new multiparty.Form(),
			pdfParser = new PDFParser();

		form.parse(req, (err, fields, files) => {

			// multiparty saves the file to the magical temp
			// location for all internet things
			let tmpPath = files.file.shift().path;

			pdfParser.on("pdfParser_dataError", errData => {
				reject(errData);
			});

			pdfParser.on("pdfParser_dataReady", pdfData => {

				let newVrf, raw = pdfParser.getAllFieldsTypes();
				if (raw && raw.length) {

					// add tmpPath to raw PDF object so that
					// client can save it to /uploads
					raw.push({
						id: "fileUrl",
						value: tmpPath
					});

					newVrf = populateModel(raw);
					resolve(newVrf);
					
				} else {
					
					// spruce this up
					reject('Incorrect data type');
				}
			});
			
			pdfParser.loadPDF(tmpPath);
		});
	});
}

export default parsePdf;
