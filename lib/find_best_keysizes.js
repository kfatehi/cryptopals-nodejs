module.exports = findBestKeysizes
var getHammingDistance = require('./hamming_distance')
var range = require('./range')
var _ = require('lodash')

function findBestKeysizes(fileContent, start, end) {
  if (!fileContent || fileContent.length === 0)
    throw new Error('No string to analyze')
  var start = start || 2
  var end = end || 60
  var keySizes = range(start, end)
  var results = [];

  for (var i=0; i<keySizes.length; i++) {
    var keySize = keySizes[i];

    var chunkOne = new Buffer(keySize);
    var chunkTwo = new Buffer(keySize);
    var chunkThree = new Buffer(keySize);
    var chunkFour = new Buffer(keySize);

    for (var j=0; j<keySize; j++) {
      chunkOne[j] = fileContent[j]
      chunkTwo[j] = fileContent[j+keySize]
      chunkThree[j] = fileContent[j+keySize*2]
      chunkFour[j] = fileContent[j+keySize*3]
    }

    var distanceOne = getHammingDistance(chunkOne.toString(), chunkTwo.toString()) / keySize;
    var distanceTwo = getHammingDistance(chunkThree.toString(), chunkFour.toString()) / keySize;

    var item = {}
    item.keySize = keySize
    item.editDistance = (distanceOne + distanceTwo) / 2
    results.push(item)
  }

  return _.sortBy(results, 'editDistance')
}
