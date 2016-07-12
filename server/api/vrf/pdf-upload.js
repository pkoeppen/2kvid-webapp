import config from '../../config/environment';
var fs = require('fs'),
	path = require('path'),
	rand = require('randomstring');

function handleUpload(vrf) {
  return new Promise((resolve, reject) => {

    var tmp = vrf.tmpPath;
    vrf.fileUrl = '';

    if (tmp) {

      // temp path property is present. if anything
      // goes wrong, just send back the VRF without saving

      fs.readFile(tmp, (err, res) => {
        if (err) { return resolve(vrf); }

        var fileName = rand.generate(8) + '.pdf';
        var filePath = path.join(config.root, 'client/uploads', fileName);

        fs.writeFile(filePath, res, (err) => {
          if (err) { console.log(err); console.log(err.stack); return resolve(vrf); }

          vrf.fileUrl = '/uploads/' + fileName;
          resolve(vrf);

        });
      });

    } else {

      // no path provided, nothing to save
      resolve(vrf);
    }
  });
}

export default handleUpload;