var _ = require('lodash')
var fileContent = require('fs').readFileSync(__dirname+'/data/4.txt')
var singleCharacterXOR = require('./lib/single_character_xor');
var keySizes = require('./lib/find_best_keysizes')(fileContent, 2, 60);
var keyScores = []
for (var k=0; k<10; k++) {
  var keySize = keySizes[k].keySize
  var data = {
    keySize: keySize,
    key: new Buffer(keySize),
    score: 0
  };

  console.log('Analyzing keysize:', keySize);

  var blocks = require('./lib/file_chunker')(fileContent, keySize)
  var transposed = require('./lib/transpose')(blocks, keySize, blocks.length)

  // crack as though it is a single character xor and store results

  // each block
  for (var i=0; i<transposed.length; i++) {
    var block = transposed[i]
    var result = singleCharacterXOR(block)
    data.score += result.topScore;
    console.log(String.fromCharCode(result.bestKey[i].toString(8)));
  }
  //console.log(data.key.toString());
  keyScores.push(data)
}
var topScores = _.sortBy(keyScores, 'score').reverse()

var best = topScores[0]
console.log(best.key.toString());

process.exit(1)
