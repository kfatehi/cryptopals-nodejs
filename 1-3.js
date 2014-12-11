var string_score = require('./lib/string_score')

// hex encoded string
var str = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"

// make it a byte array
var buf = new Buffer(str, 'hex')
var singleByteXOR = require('./lib/xor').xor_singlebyte

var crackSingleByteXORCipher = require('./lib/crack_single_byte_xor_cipher')
var plain = crackSingleByteXORCipher(buf);

console.log(plain)
require('assert').equal(plain, "Cooking MC's like a pound of bacon")
