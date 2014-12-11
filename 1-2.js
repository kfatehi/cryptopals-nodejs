var xor = require('./lib/xor').xor

var fixedXOR = function(str1, str2) {
  var buf1 = new Buffer(str1, 'hex')
  console.log(buf1.toString());
  var buf2 = new Buffer(str2, 'hex')
  console.log(buf2.toString());
  var xord = xor(buf1, buf2)
  console.log(xord.toString())
  return xord.toString('hex')
}

var output = fixedXOR("1c0111001f010100061a024b53535009181c", "686974207468652062756c6c277320657965")
var expected = "746865206b696420646f6e277420706c6179"

require('assert').equal(output, expected)
