//var fs = require('fs')
//var file = fs.readFileSync(__dirname+'/data/4.txt')
var getHammingDistance = require('./lib/hamming_distance')

var KEYSIZE = null // guessed length of key, 2 to, say, 40

hammingTest = getHammingDistance('this is a test', 'wokka wokka!!!')

require('assert').equal(hammingTest, 37)
