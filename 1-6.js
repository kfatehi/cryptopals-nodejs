var fileContent = require('fs').readFileSync(__dirname+'/data/4.txt')
var keySizes = require('./lib/find_best_keysizes')(fileContent, 2, 60);

console.log('using keysizes:', keySizes);
process.exit(-1)

// FIXME wrong, this keysize is probably not correct
// now we know the keysize, or we think we do anyway...
// let's chunk the file into blocks of KEYSIZE
var numBlocks = Math.floor(fileContent.length/probablyKeySize)
var blocks = []
for (var i=0; i<numBlocks; i++) {
  var start = i*probablyKeySize
  var end = start+probablyKeySize
  blocks[i] = fileContent.slice(start, end)
}

// FIXME wrong, you should only have KEYSIZE number of blocks
// now let's transpose the blocks, meaning:
var transposed = require('./lib/transpose')(blocks, probablyKeySize, numBlocks)
console.log('transposed block count:', transposed.length);

console.log('tranposed first block length:', transposed[0].length);

// now we'll solve each as though it was single-character xor
var singleCharacterXOR = require('./lib/single_character_xor');
for (var i=0; i<transposed.length; i++) {
  var block = transposed[i]
  var result = singleCharacterXOR(block)
  console.log(result.plainText);
}


