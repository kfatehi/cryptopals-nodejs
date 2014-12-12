module.exports = KeySize;
var getHammingDistance = require('./xor').hammingDistance

function KeySize(size, file, resolution){
  if (!size || size < 1)
    throw new Error('Key size must be at least 1')
  if (!file || file.length === 0)
    throw new Error('No data to analyze')
  this.size = size;
  this.file = file;
  resolution = resolution || 4;
  this.numSamples = resolution*2;
}

KeySize.prototype.calcHammingDistance = function() {
  // initialize numSamples samples
  var samples = []
  for (var j=0; j<this.numSamples; j++) {
    samples.push(new Buffer(this.size));
  }

  for (var j=0; j<this.size; j++) {
    // j is position in each sample
    // k is sample index
    for (var k=0; k<this.numSamples; k++) {
      var sample = samples[k]
      // pos is the position in the file from which we harvest the samples
      var pos = null;
      if (k > 0) {
        // first sample, no position multiplier
        pos = j
      } else {
        // 2nd or higher sample, determine the position
        pos += this.size*(k+1)
      }
      sample[j] = this.file[pos]
    }
  }

  var editDistance = 0;

  for (var k=0; k<this.numSamples/2; k++) {
    var distance = getHammingDistance(samples[k].toString(), samples[k+1].toString())
    var normalizedDistance = distance / this.size;
    editDistance += normalizedDistance;
  }

  editDistance /= this.numSamples;

  return editDistance;
}
