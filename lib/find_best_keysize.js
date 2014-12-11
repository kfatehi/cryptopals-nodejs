module.exports = findBestKeysize
  
var getHammingDistance = require('./xor').hammingDistance
var range = require('./range')

function findBestKeysize(fileContent, start, end) {
  console.log(fileContent[0]);
  if (!fileContent || fileContent.length === 0)
    throw new Error('No string to analyze')
  var start = start || 2
  var end = end || 60
  var keySizes = range(start, end)

  var bestKeySize = null;
  var smallestNormalizedDistance = 10000;

  for (var i=0; i<keySizes.length; i++) {
    var keySize = keySizes[i];

    var chunkOne = new Buffer(keySize);
    var chunkTwo = new Buffer(keySize);
    var chunkThree = new Buffer(keySize);
    var chunkFour = new Buffer(keySize);
    var chunkFive = new Buffer(keySize);
    var chunkSix = new Buffer(keySize);
    var chunkSeven = new Buffer(keySize);
    var chunkEight = new Buffer(keySize);

    for (var j=0; j<keySize; j++) {
      chunkOne[j] = fileContent[j]
      chunkTwo[j] = fileContent[j+keySize]
      chunkThree[j] = fileContent[j+keySize*2]
      chunkFour[j] = fileContent[j+keySize*3]
      chunkFive[j] = fileContent[j+keySize*4]
      chunkSix[j] = fileContent[j+keySize*5]
      chunkSeven[j] = fileContent[j+keySize*6]
      chunkEight[j] = fileContent[j+keySize*7]
    }

    var distanceOne = getHammingDistance(chunkOne.toString(), chunkTwo.toString()) / keySize;
    var distanceTwo = getHammingDistance(chunkThree.toString(), chunkFour.toString()) / keySize;
    var distanceThree = getHammingDistance(chunkFive.toString(), chunkSix.toString()) / keySize;
    var distanceFour = getHammingDistance(chunkSeven.toString(), chunkEight.toString()) / keySize;

    var editDistance = (distanceOne + distanceTwo + distanceThree + distanceFour) / 4
    if (editDistance < smallestNormalizedDistance) {
      bestKeySize = keySize
      smallestNormalizedDistance = editDistance;
    }
  }

  console.log(smallestNormalizedDistance);

  return bestKeySize;
}
