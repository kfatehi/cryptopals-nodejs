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

// now we know the keysize, or we think we do anyway...
// let's chunk the file into blocks of KEYSIZE
var numBlocks = Math.floor(fileContent.length/probablyKeySize)
var blocks = []
for (var i=0; i<numBlocks; i++) {
  var start = i*probablyKeySize
  var end = start+probablyKeySize
  blocks[i] = fileContent.slice(start, end)
}

// now let's transpose the blocks, meaning:
// make a block that is the first byte of every block, and a block that is the second byte of every block, and so on.
var transposed = []
for (var blockIndex=0; blockIndex<numBlocks; blockIndex++) {
  var transposingBuffer = new Buffer(numBlocks) // fill with every i'th byte of each block
  var currentBlock = blocks[blockIndex]

  // fill the transposing buffer
  for (var j=0; j<currentBlock.length; j++) {
    transposingBuffer[j] = currentBlock[blockIndex]
  }

  transposed.push(transposingBuffer)
}

console.log(transposed);

  

process.exit(1)
