var _ = require('lodash')
var scorestring = require('./lib/string_score')
var transpose = require('./lib/transpose')
var fileContent = require('fs').readFileSync(__dirname+'/data/4.txt')
var singleCharacterXOR = require('./lib/single_character_xor');
var keySizes = require('./lib/find_best_keysizes')(fileContent, 2, 60);
var keyScores = []
for (var k=0; k<1; k++) {
  var keySize = 29//keySizes[k].keySize
  var data = {
    keySize: keySize,
    key: new Buffer(keySize),
    score: 0
  };

  console.log('Analyzing keysize:', keySize);

  var blocks = require('./lib/file_chunker')(fileContent, keySize)

  // crack as though it is a single character xor and store results
  console.log(BreakVingere(blocks, 29).toString())
}

function BreakVingere(blocks, keySize){
  var tblocks = transpose(blocks)
  var l = tblocks.length;
  var key = []
  for (var i = 0; i<l; i++){
      var test = singleCharacterXOR(tblocks[i]);
      key.push(test.bestKey);
  }
  return key
}

