var _ = require('lodash')
var fileContent = require('fs').readFileSync(__dirname+'/data/4.txt')
var keySizes = require('./lib/find_best_keysizes')(fileContent, 2, 60);
var keyScores = []
for (var k=0; k<10; k++) {
  var keySize = keySizes[k].keySize
  var data = { keySize: keySize, singleCharKeys: [], score: 0 };
  console.log('Analyzing keysize:', keySize);
  data.keySize = keySize;
  var blocks = require('./lib/file_chunker')(fileContent, keySize)
  var transposed = require('./lib/transpose')(blocks, keySize, blocks.length)
  // crack as though it is a single character xor and store results
  var singleCharacterXOR = require('./lib/single_character_xor');
  for (var i=0; i<transposed.length; i++) {
    var block = transposed[i]
    var result = singleCharacterXOR(block)
    data.score += result.topScore;
    //data.singleCharKeys.push = result.bestKey;
  }
  keyScores.push(data)
}
var topScores = _.sortBy(keyScores, 'score').reverse()
console.log(topScores);

var best = topScores[0]
console.log('Most likely keysize:', best.keySize);

process.exit(1)
