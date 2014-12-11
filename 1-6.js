var _ = require('lodash')
var tools = require('./lib/filetools')
var scorestring = require('./lib/string_score')
var transpose = require('./lib/transpose')
var fileContent = tools.bufferFromFileBase64(__dirname+'/data/6.txt')
var jxor = require('./lib/xor').xor_singlebyte;
var keySizes = require('./lib/find_best_keysizes')(fileContent, 2, 60);
var keyScores = []


for (var k=0; k<1; k++) {
  var keySize = 29//keySizes[k].keySize
  var data = {
    keySize: keySize,
    key: new Buffer(keySize),
    score: 0
  };

  console.log('Analyzing keysize:', keySize);

  var blocks = require('./lib/file_chunker')(fileContent, 29);
  //console.log("block len:",blocks[0].length)

  // crack as though it is a single character xor and store results
  keyBuf = new Buffer(BreakVingere(blocks, 29))
  console.log(keyBuf.toString())
}

function BreakVingere(blocks, keySize){
  var tblocks = transpose(blocks)
  var l = tblocks.length;
  var key = []
  for (var i = 0; i<l; i++){
	  bestScore = 10000;
	  bestIx = 0;
	  for (var j = 0; j<255; j++){
		var test = jxor(tblocks[i],j);
		var b = new Buffer(test);
		var score = scorestring(b.toString());
		if (score < bestScore){
			bestScore = score;
			bestIx = j;
		}
	  }
	  key.push(bestIx);
  }
  return key;
}

