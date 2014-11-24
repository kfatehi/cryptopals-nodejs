var fs = require('fs')
var singleCharacterXOR = require('./lib/single_character_xor')
var file = fs.readFileSync(__dirname+'/data/4.txt')

var strings = file.toString().split('\n')

var topScore = 0;
var plainText = 'idk';

for (var i=0; i<strings.length; i++) {
  var str = strings[i]
  // make it a byte array
  var buf = new Buffer(str, 'hex')
  var result = singleCharacterXOR(buf);
  if (result.topScore > topScore) {
    topScore = result.topScore
    plainText = result.plainText;
  }
}

console.log(plainText);
