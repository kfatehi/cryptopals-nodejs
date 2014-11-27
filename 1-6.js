var fileContent = require('fs').readFileSync(__dirname+'/data/4.txt')
var keySizes = require('./lib/find_best_keysizes')(fileContent, 2, 60);
for (var k=0; k<5; k++) {
  var keySize = keySizes[k].keySize
  console.log('using keysize:', keySize);

  // chunk the file into blocks of KEYSIZE
  var numBlocks = Math.floor(fileContent.length/keySize)
  var blocks = []
  for (var i=0; i<numBlocks; i++) {
    var start = i*keySize
    var end = start+keySize
    blocks[i] = fileContent.slice(start, end)
  }
  // transpose the blocks
  var transposed = require('./lib/transpose')(blocks, keySize, numBlocks)
  // crack as though it is a single character xor
  var singleCharacterXOR = require('./lib/single_character_xor');
  for (var i=0; i<transposed.length; i++) {
    var block = transposed[i]
    var result = singleCharacterXOR(block)
    //console.log(result.plainText);
  }
}
