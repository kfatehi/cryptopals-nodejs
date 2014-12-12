module.exports = findBestKeysize
var KeySize = require('./key_size')
  
var range = require('./range')

function findBestKeysize(fileContent, start, end) {
  var start = start || 2
  var end = end || 60
  var keySizes = range(start, end)

  var bestKeySize = null;
  var smallestEditDistance = 10000;

  for (var i=0; i<keySizes.length; i++) {
    var keySize = new KeySize(keySizes[i])

    var editDistance = keySize.hammingDistance(fileContent);
    //console.log(keySize.size, editDistance);
  
    if (editDistance < smallestEditDistance) {
      bestKeySize = keySize.size;
      smallestEditDistance = editDistance;
    }
  }

  return bestKeySize;
}
