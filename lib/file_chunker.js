module.exports = chunkFile

function chunkFile(fileContent, chunkSize) {
  var numBlocks = Math.floor(fileContent.length/chunkSize)
  var blocks = []
  for (var i=0; i<numBlocks; i++) {
    var start = i*chunkSize
    var end = start+chunkSize
    blocks[i] = fileContent.slice(start, end)
  }
  return blocks;
}
