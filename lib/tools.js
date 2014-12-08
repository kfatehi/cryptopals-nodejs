module.exports = {
	base64ToBuffer: function(s){
		return new Buffer(s, 'base64');
	},
	bufferFromFileBase64: function(filename){
		var buf = new Buffer(require('fs').readFileSync(filename).toString(), "base64");
		return buf;
	}
}

