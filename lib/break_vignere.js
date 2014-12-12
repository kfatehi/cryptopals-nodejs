module.exports = BreakVingere
var blocks = require('./blocks')
var makeBlocks = blocks.makeBlocks
var transposeBlocks = blocks.transposeBlocks
var scorestring = require('./string_score')
var xor = require('./xor').xor_singlebyte;

function BreakVingere(fileContent, keySize){
  var blocks = makeBlocks(fileContent, keySize);
  var tblocks = transposeBlocks(blocks)
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

