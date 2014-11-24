// hex encoded string
var str = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"

// make it a byte array
var buf = new Buffer(str, 'hex')

var singleCharacterXOR = require('./lib/single_character_xor')
var result = singleCharacterXOR(buf);

console.log(result.plainText);
