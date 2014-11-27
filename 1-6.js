var getHammingDistance = require('./lib/hamming_distance')
hammingTest = getHammingDistance('this is a test', 'wokka wokka!!!')
require('assert').equal(hammingTest, 37)

var fs = require('fs')
var fileContent = fs.readFileSync(__dirname+'/data/4.txt')
var makeRange = require('./lib/range')
var keySizes = makeRange(2, 60)
var smallestDistance = 999;
var probablyKeySize = null;
for (var i=0; i<keySizes.length; i++) {
  var keySize = keySizes[i];
  var chunkOne = new Buffer(keySize);
  var chunkTwo = new Buffer(keySize);
  for (var j=0; j<keySize; j++) {
    chunkOne[j] = fileContent[j]
    chunkTwo[j] = fileContent[j+keySize]
  }
  var editDistance = getHammingDistance(chunkOne.toString(), chunkTwo.toString()) / keySize;
  if (editDistance < smallestDistance) {
    smallestDistance = editDistance;
    probablyKeySize = keySize;
  }
}

console.log(smallestDistance, probablyKeySize);

console.log('using keysize:', probablyKeySize);

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
}

process.exit(-1)
