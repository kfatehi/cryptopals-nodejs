var fileContent = require('fs').readFileSync(__dirname+'/data/4.txt')
var keySizes = require('./lib/find_best_keysizes')(fileContent, 2, 60);
var keyScores = []
for (var k=0; k<5; k++) {
  var keySize = keySizes[k].keySize
  var scoreCard = {};
  console.log('using keysize:', keySize);
  scoreCard.keySize = keySize;
  var blocks = require('./lib/file_chunker')(fileContent, keySize)
  var transposed = require('./lib/transpose')(blocks, keySize, blocks.length)
  // crack as though it is a single character xor and store results
  var singleCharacterXOR = require('./lib/single_character_xor');
  for (var i=0; i<transposed.length; i++) {
    var block = transposed[i]
    var result = singleCharacterXOR(block)
    console.log(result.topScore);
  }
}
