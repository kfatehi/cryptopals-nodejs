var string_score = require('./lib/string_score')

// hex encoded string
var str = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"

// make it a byte array
var buf = new Buffer(str, 'hex')

var singleCharacterXOR = require('./lib/xor').xor_singlebyte
var result = singleCharacterXOR(buf);

bestScore = 10000;
bestIx = 0;
for (var i = 0; i < 256; i++){
	var result = singleCharacterXOR(buf, i);
	var b = new Buffer(result);
	var score = string_score(b.toString());
	if (score < bestScore){
		bestScore = score;
		bestIx = i;
	}
}

buf = new Buffer(singleCharacterXOR(buf, bestIx));
console.log(buf.toString());
