// hex encoded string
var str = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"

// make it a byte array
var buf = new Buffer(str, 'hex')

var stringScore = require('./lib/string_score')
var xor = require('./lib/xor')

function makeKey(charCode, length) {
  var key = [];
  for (var i=0; i<length; i++) {
    key.push(charCode)
  }
  return new Buffer(key)
}

var topScore = 0;
var plainText = 'idk';

for (var i=0; i<255; i++) {
  var key = makeKey(i, buf.length)
  // now we have a key to try
  // we should try it and then get the score for the result
  // if the result scores high, it's probably english
  var out = xor(buf, key).toString()
  var score = stringScore(out);
  if (score > topScore) {
    topScore = score
    plainText = out;
  }
}

console.log(topScore, plainText);
