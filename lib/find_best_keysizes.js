module.exports = findBestKeysizes
var getHammingDistance = require('./hamming_distance')
var range = require('./range')

function findBestKeysizes(fileContent, start, end) {
  if (!fileContent || fileContent.length === 0)
    throw new Error('No string to analyze')
  var start = start || 2
  var end = end || 60
  var keySizes = range(start, end)
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

  return [probablyKeySize];
}
