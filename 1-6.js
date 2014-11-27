var fileContent = require('fs').readFileSync(__dirname+'/data/4.txt')
var keySizes = require('./lib/find_best_keysizes')(fileContent, 2, 60);

console.log('using keysizes:', keySizes);
process.exit(-1)

// chunk the file into blocks of KEYSIZE
var numBlocks = Math.floor(fileContent.length/probablyKeySize)
var blocks = []
for (var i=0; i<numBlocks; i++) {
  var start = i*probablyKeySize
  var end = start+probablyKeySize
  blocks[i] = fileContent.slice(start, end)
}
// transpose the blocks
var transposed = require('./lib/transpose')(blocks, probablyKeySize, numBlocks)
// crack as though it is a single character xor
var singleCharacterXOR = require('./lib/single_character_xor');
for (var i=0; i<transposed.length; i++) {
  var block = transposed[i]
  var result = singleCharacterXOR(block)
  console.log(result.plainText);
}
