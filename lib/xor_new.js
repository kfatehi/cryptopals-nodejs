module.exports = xor_new

function xor_new(byteArray, key){
	var l = byteArray.length;
	var result = [];
	for (var i = 0; i < l; i++){
		result.push(byteArray[i]^key);
	}
	return result;
}
