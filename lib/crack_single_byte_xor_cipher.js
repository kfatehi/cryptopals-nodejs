var string_score = require('./string_score')
var singleByteXOR = require('./xor').xor_singlebyte

module.exports = crack;

function crack(buf) {
  var bestScore = 10000;
  var bestIx = 0;
  for (var i = 0; i < 256; i++){
    var result = singleByteXOR(buf, i);
    var b = new Buffer(result);
    var score = string_score(b.toString());
    if (score < bestScore){
      bestScore = score;
      bestIx = i;
    }
  }
  return new Buffer(singleByteXOR(buf, bestIx)).toString();
}
