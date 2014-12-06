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
    data.key[i] = result.bestKey[i];
  }
  console.log(data.key.toString());
  keyScores.push(data)
}
var topScores = _.sortBy(keyScores, 'score').reverse()

var best = topScores[0]
console.log(best.key.toString());

process.exit(1)

/*

Produces the following output:

keyvan@lucia.local:~/P/cryptopals-js git:master ❯❯❯ ./play 1 6
Analyzing keysize: 7
EEEEEEE
Analyzing keysize: 39
EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
Analyzing keysize: 22
EEEEEEEEEEEEEEEEEEEEEE
Analyzing keysize: 35
EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
Analyzing keysize: 47
EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
Analyzing keysize: 34
EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
Analyzing keysize: 18
EEEEEEEEEEEEEEEEEE
Analyzing keysize: 49
EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
Analyzing keysize: 14
EEEEEEEEEEEEEE
Analyzing keysize: 25
EEEEEEEEEEEEEEEEEEEEEEEEE
EEEEEEEEEEEEEEEEEEEEEEEEE

*/
