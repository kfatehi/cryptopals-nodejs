// make a block that is the first byte of every block, and a block that is the second byte of every block, and so on.
module.exports = function(blocks, height, width) {
  var result = []
  for (var i=0; i<height; i++) {
    var tBlock = new Buffer(width);
    for (var k=0; k<width; k++) {
      var srcBlock = blocks[k];
      tBlock[k] = srcBlock[k];
    }
    result.push(tBlock)
  }
  return result;
}
