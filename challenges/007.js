var crypto = require('crypto')

var tools = require('../lib/filetools');

var buf = tools.bufferFromFileBase64(__dirname+'/../data/7.txt')

var key = new Buffer("YELLOW SUBMARINE")

var algo = "aes-128-ecb";

var decipher = crypto.createDecipher(algo, key)


var plain = Buffer.concat([
  decipher.update(buf, 'binary', 'utf8'),
  decipher.final('utf8')
]);


console.log(plain.toString());


process.exit(1)
