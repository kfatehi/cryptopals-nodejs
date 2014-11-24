// hex encoded string
var str = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"

// make it a byte array
var buf = new Buffer(str, 'hex')

var stringScore = require('./lib/string_score')
var xor = require('./lib/xor')

function makeKey(singleByte, length) {
  var keyBuf = [];
  for (var i=0; i<length; i++) {
    keyBuf.push(singleByte)
  }
  return new Buffer(keyBuf)
}

var alphabet = 'abcdefghijklmnopqrstuvwxyz'
for (var i=0; i<alphabet.length; i++) {
  var letter = alphabet[i]
  var key = new Buffer(buf.length)
  console.log(key.toString());
}



var score = stringScore(str);



var key = makeKey('a', buf)
console.log(key.toString());

var out = xor(buf, key).toString()
console.log(out);


process.exit(1)
