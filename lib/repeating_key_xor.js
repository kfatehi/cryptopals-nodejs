var fs = require('fs')
module.exports = function(keyString) {
  var keyBuf = new Buffer(keyString);

  var encryptString = function(plainTextString) {
    var plainBuf = new Buffer(plainTextString);
    for (var i=0; i<plainBuf.length; i++) {
      var keyByte = keyBuf[i%3]
      plainBuf[i] ^= keyByte
    }
    return plainBuf.toString('hex')
  }

  var encryptFile = function(filePath) {
    return encryptString(fs.readFileSync(filePath))
  }

  return {
    encryptString: encryptString,
    encryptFile: encryptFile
  }
}

