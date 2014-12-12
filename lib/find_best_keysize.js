module.exports = findBestKeysize
var KeySize = require('./key_size')
  
var range = require('./range')

function findBestKeysize(fileContent, start, end) {
  var start = start || 2
  var end = end || 60
  var keySizes = range(start, end)

  var bestKeySize = null;
  var smallestNormalizedDistance = 10000;

  for (var i=0; i<keySizes.length; i++) {
    var keySize = new KeySize(keySizes[i], fileContent, 4);

    var editDistance = keySize.calcHammingDistance()
    console.log(keySize.size, editDistance);
  
    if (editDistance < smallestNormalizedDistance) {
      bestKeySize = keySize.size;
      smallestNormalizedDistance = editDistance;
    }
  }

  console.log(smallestNormalizedDistance);
  return bestKeySize;
}

