module.exports = function(start, end, fn) {
  return Array.apply(null, Array(end-1)).map(function(_,i) {
    var n = i+start
    if (fn) return fn(n);
    else return n;
  }) 
}
