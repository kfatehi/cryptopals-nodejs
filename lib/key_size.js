module.exports = KeySize;
var hammingDistance = require('./xor').hammingDistance

function KeySize(size){
  if (!size || size < 1)
    throw new Error('Key size must be at least 1')
  this.size = size;
}

KeySize.prototype.hammingDistance = function(file, resolution) {
  if (!file || file.length === 0)
    throw new Error('No data to analyze')
  this.file = file;
  var editDistance = 0;
  var n = 8
  //console.log('size', this.size);

  var samples = makeSamples(file, this.size, n)
  //console.log(samples.length);

  var editDistance = 0;

  for (var k=0; k<(n/2); k++) {
    var iA = k*2
    var iB = k*2+1
    //console.log(iA, iB);
    var a = samples[iA].toString()
    var b = samples[iB].toString()
    var distance = hammingDistance(a,b)
    var normalizedDistance = distance / this.size;
    editDistance += normalizedDistance;
  }

  editDistance /= n;

  return editDistance;
}

function makeSamples(file, size, count) {
  var samples = []
  for (var j=0; j<count; j++) {
    var start = j*size
    var end = start+size
    samples.push(file.slice(start, end))
  }
  return samples;
}
