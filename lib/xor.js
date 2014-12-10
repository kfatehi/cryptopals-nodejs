// Various xor functions and the like
// xor xors two buffers
// xor_singlebyte() xors a buffer with a single byte
// hammingDistance() computes the hamming distance between two buffers
// 
var stringToBytes = require('./string_to_byte')

module.exports = {

	xor: function xor(a, b) {
	  if (!Buffer.isBuffer(a)) a = new Buffer(a)
	  if (!Buffer.isBuffer(b)) b = new Buffer(b)
	  if (a.length != b.length){
		throw new Error("different lengths, get with it guy");
	  }
	  var result = []
	  for (var i = 0; i<a.length; i++){
	  result.push(a[i]^b[i]);
	  }
	  var buf = new Buffer(result)
	  return buf;
	},

	xor_singlebyte: function xor_new(byteArray, key){
		var l = byteArray.length;
		var result = [];
		for (var i = 0; i < l; i++){
			result.push(byteArray[i]^key);
		}
		return result;
	},

	hammingDistance: function newHammingDistance(sa, sb){
		var a = stringToBytes(sa);
		var b = stringToBytes(sb);
		var dist = 0;
		for (var i =0; i<a.length; i++){
			dist += countBits(a[i]^b[i]);
		}
		return dist;
	}

}


function countBits(b){
	var bits = 0;
	for (var i = 0; i<8; i++){
		if (((b>>i) & 1) == 1){
			bits++;
		}
	}
	return bits;
}

