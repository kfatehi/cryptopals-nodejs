module.exports = newHammingDistance
hammingTest = getHammingDistance('this is a test', 'wokka wokka!!!')
require('assert').equal(hammingTest, 37)
var stringToBytes = require('./string_to_byte')

function countBits(b){
	var bits = 0;
	for (var i = 0; i<8; i++){
		if (((b>>i) & 1) == 1){
			bits++;
		}
	}
	return bits;
}

function newHammingDistance(sa, sb){
	var a = stringToBytes(sa);
	var b = stringToBytes(sb);
	var dist = 0;
	for (var i =0; i<a.length; i++){
		dist += countBits(a[i]^b[i]);
	}
	return dist;
}






function getHammingDistance(sa, sb) {
  var dist = 0;
  var a = new Buffer(sa)
  var b = new Buffer(sb)
  if (a.length !== b.length) throw new Error('Different sizes');
  // each byte
  for (var i=0; i<a.length; i++) {
    var aBits = a[i].toString(2)
    var bBits = b[i].toString(2)
    // each bit
    for (var j=0; j<aBits.length; j++) {
      var aBit = aBits[j]
      var bBit = bBits[j]
      if (aBit !== bBit) dist++;
    }
  }
  return dist;
}

