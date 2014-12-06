module.exports = stringToBytes

function stringToBytes(s){
	var bytes = [];
	for (var i = 0; i <s.length; i++){
		bytes.push(s.charCodeAt(i));
	}
	return bytes
}

