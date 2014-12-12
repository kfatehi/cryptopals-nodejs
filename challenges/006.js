var fs = require('fs')
var assert = require('assert');
var BreakVignere = require('./lib/break_vignere')
var makeBlocks = require('./lib/blocks').makeBlocks;
var dataFilePath = __dirname+'/data/6.txt';
var tools = require('./lib/filetools')
var hammingKeySize = require('./lib/find_best_keysize')
var fileContent = tools.bufferFromFileBase64(dataFilePath)
var keySize = hammingKeySize(fileContent)

console.log('Got keysize:', keySize);
assert.equal(keySize, 29)

var byteArray = BreakVignere(fileContent, keySize)
var plain = new Buffer(byteArray).toString()
console.log(plain);
assert.equal(plain, "Terminator X: Bring the noise")
