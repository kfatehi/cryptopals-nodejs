module.exports = findBestKeysize
var xor = require('./xor') 
var range = require('./range')

function findBestKeysize(fileContent, start, end) {
  var start = start || 3
  var end = end || 60
  var keySizes = range(start, end)
  var bestKeySize = null;
  var smallestEditDistance = 10000;

  for (var i=start; i<end; i++) {
    score = keySizeTest(fileContent, i);
    if (score < smallestEditDistance){
      smallestEditDistance = score;
      bestKeySize = i;
    }
  }	

  return bestKeySize
}

function keySizeTest(fileContent, keySize){
  var tests = 10;
  var score = 0;
  var scalar = 1/tests;
  for (var i = 0; i<=tests; i++){
    var block1 = fileContent.slice(i*keySize, (i+1)*keySize).toString();
    var block2 = fileContent.slice((i+1)*keySize, (i+2)*keySize).toString();
    score += scalar*xor.hammingDistance(block1, block2)/keySize;
  }
  return score;
}
