module.exports = bufferToArray

function bufferToArray(buf){
	var l = buf.length;
	result = [];
	for (i=0; i<l; i++){
		result.push(buf[i]);
	}
	return result;
}
