// make a block that is the first byte of every block, and a block that is the second byte of every block, and so on.
module.exports = function(blocks) {
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
