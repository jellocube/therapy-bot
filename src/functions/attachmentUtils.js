const fs = require('fs');

module.exports = {
	createAttachmentStream: function(path) {
		const file = fs.createReadStream(path);
		return file;
	}
}
