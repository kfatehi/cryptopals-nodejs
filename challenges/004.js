var string_score = require('../lib/string_score')
var singleByteXOR = require('../lib/xor').xor_singlebyte
var crackSingleByteXORCipher = require('../lib/crack_single_byte_xor_cipher')
var fs = require('fs')
var file = fs.readFileSync(__dirname+'/../data/4.txt')
var strings = file.toString().split('\n')

var singleByteXOR = require('../lib/xor').xor_singlebyte

var bestScore = 10000;
var bestPlain = null;

for (var i=0; i<strings.length; i++) {
  var str = strings[i]
  // make it a byte array
  var buf = new Buffer(str, 'hex')
  var plain = crackSingleByteXORCipher(buf)
  var score = string_score(plain);
  if (score < bestScore) {
    bestScore = score;
    bestPlain = plain;
  }
}

console.log(bestPlain);
require('assert').equal(bestPlain, "Now that the party is jumping\n")
