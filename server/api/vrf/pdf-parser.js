'use strict';

var fs = require('fs'),
	multiparty = require('multiparty'),
	PDFParser = require('pdf2json');

function populateModel(data, path) {
	var obj = {};
	for (let i = 0, item; i < data.length; i++) {
		item = data[i];
		switch(true) {
			case /Project_Title/.test(item.id): obj.title = item.value; break;
			case /Requested_By/.test(item.id): obj.from = item.value; break;
			case /Project_Description/.test(item.id): obj.body = item.value; break;
			case /tmpPath/.test(item.id): obj.tmpPath = item.value; break;
		}
	}
	return obj;
}

function parsePdf(req, res) {
	var form = new multiparty.Form(),
		pdfParser = new PDFParser();

	form.parse(req, (err, fields, files) => {
		// multiparty saves the file to the magical temp
		// location for all internet things
		var tmpPath = files.file.shift().path;

		pdfParser.on("pdfParser_dataError", errData => {
			res.status(500).send(errData);
		});

		pdfParser.on("pdfParser_dataReady", pdfData => {
			var raw = pdfParser.getAllFieldsTypes();
			
			if (raw && raw.length) {
				// add tmpPath to raw PDF object so that
				// client can save it to /uploads
				raw.push({
					id: "tmpPath",
					value: tmpPath
				});

				var newVrf = populateModel(raw);
				res.send(newVrf);

			} else {
				// spruce this up
				res.status(500).send('Incorrect data type');
			}
		});
		
		pdfParser.loadPDF(tmpPath);

	});
}

export default parsePdf;
