module.exports = {
  makeBlocks: function(fileContent, chunkSize) {
    var numBlocks = Math.floor(fileContent.length/chunkSize)
    var blocks = []
    for (var i=0; i<numBlocks; i++) {
      var start = i*chunkSize
      var end = start+chunkSize
      blocks[i] = fileContent.slice(start, end)
    }
    return blocks;
  },
  // make a block that is the first byte of every block, and a block that is the second byte of every block, and so on.
  transposeBlocks: function(blocks) {
    var result = []
    var l = blocks.length;
    var h = blocks[0].length;
    for (var i = 0; i<h; i++){
      result.push(new Buffer(l));
    }

    for (var i = 0; i < l; i++){
      for (var j = 0; j<h; j++){
        result[j][i] = blocks[i][j];
      }
    }
    return result;
  } 
}
