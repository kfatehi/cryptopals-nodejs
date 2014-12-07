module.exports = xor

function xor(a, b) {
  if (!Buffer.isBuffer(a)) a = new Buffer(a)
  if (!Buffer.isBuffer(b)) b = new Buffer(b)
  if (a.length != b.length){
    throw new Error("different lengths, get with it guy");
  }
  var result = []
  for (var i = 0; i<a.length; i++){
  result.push(a[i]^b[i]);
  }
  var buf = new Buffer(result)
  return buf;
}
