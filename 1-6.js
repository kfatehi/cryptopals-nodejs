var fs = require('fs')
var assert = require('assert');
var BreakVignere = require('./lib/break_vignere')
var dataFilePath = __dirname+'/data/6.txt';
var tools = require('./lib/filetools')
var keySize = require('./lib/find_best_keysize')(fs.readFileSync(dataFilePath));
var fileContent = tools.bufferFromFileBase64(dataFilePath)

console.log('Got keysize:', keySize);
assert.equal(keySize, 29)


var blocks = require('./lib/file_chunker')(fileContent, 29);

var plain = new Buffer(BreakVignere(blocks, keySize)).toString()
console.log(plain);
assert.equal(plain, 'stuff')
