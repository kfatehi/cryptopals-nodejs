var transpose = require('./transpose')
var scorestring = require('./string_score')
var xor = require('./xor').xor_singlebyte;

module.exports = function BreakVingere(blocks, keySize){
  var tblocks = transpose(blocks)
  var l = tblocks.length;
  var key = []
  for (var i = 0; i<l; i++){
    bestScore = 10000;
    bestIx = 0;
    for (var j = 0; j<255; j++){
      var test = xor(tblocks[i],j);
      var b = new Buffer(test);
      var score = scorestring(b.toString());
      if (score < bestScore){
        bestScore = score;
        bestIx = j;
      }
    }
    key.push(bestIx);
  }
  return key;
}

