var _ = require('lodash')
var fileContent = require('fs').readFileSync(__dirname+'/data/4.txt')
var keySizes = require('./lib/find_best_keysizes')(fileContent, 2, 60);
var keyScores = []
for (var k=0; k<5; k++) {
  var keySize = keySizes[k].keySize
  var scoreCard = { keySize: keySize, score: 0 };
  console.log('Analyzing keysize:', keySize);
  scoreCard.keySize = keySize;
  var blocks = require('./lib/file_chunker')(fileContent, keySize)
  var transposed = require('./lib/transpose')(blocks, keySize, blocks.length)
  // crack as though it is a single character xor and store results
  var singleCharacterXOR = require('./lib/single_character_xor');
  for (var i=0; i<transposed.length; i++) {
    var block = transposed[i]
    var result = singleCharacterXOR(block)
    scoreCard.score += result.topScore;
  }
  keyScores.push(scoreCard)
}
var topScores = _.sortBy(keyScores, 'score').reverse()
console.log(topScores);

var keySize = topScores[0].keySize
console.log('Most likely keysize:', keySize);

process.exit(1)
