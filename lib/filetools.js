module.exports = {
	base64ToBuffer: function(s){
		return new Buffer(s, 'base64');
	},
	
	bufferFromFileBase64: function(filename){
		var buf = new Buffer(require('fs').readFileSync(filename).toString(), "base64");
		return buf;
	},
	
	fileChunker: function chunkFile(fileContent, chunkSize) {
	  var numBlocks = Math.floor(fileContent.length/chunkSize)
	  var blocks = []
	  for (var i=0; i<numBlocks; i++) {
		var start = i*chunkSize
		var end = start+chunkSize
		blocks[i] = fileContent.slice(start, end)
	  }
	  return blocks;
	}
}

