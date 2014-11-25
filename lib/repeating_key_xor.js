module.exports = repeatingKeyXOR

function repeatingKeyXOR(plainTextString, keyString) {
  var plainBuf = new Buffer(plainTextString);
  var keyBuf = new Buffer(keyString);
  for (var i=0; i<plainBuf.length; i++) {
    var keyByte = keyBuf[i%3]
    plainBuf[i] ^= keyByte
  }
  return plainBuf.toString('hex')
}
