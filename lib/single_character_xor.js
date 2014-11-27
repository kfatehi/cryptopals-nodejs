module.exports = singleCharacterXOR

var stringScore = require('./string_score')
var xor = require('./xor')

function makeKey(charCode, length) {
  var key = [];
  for (var i=0; i<length; i++) {
    key.push(charCode)
  }
  return new Buffer(key)
}

function singleCharacterXOR(buf) {
  var topScore = 0;
  var plainText = 'idk';
  //var histogram = {};

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
    //histogram[i] = score;
  }
  return {
    topScore: topScore,
    plainText: plainText,
    //histogram: histogram
  }
}
