module.exports = calcScore

function calcScore(str) {
  var score = 0;
  for (var i=0; i<str.length; i++) {
    var letter = str[i].toLowerCase();
    var value = letterValues[letter];
    if (value) score+=value;
  }
  return score;
}

var letterValues = {
  'e': 29,
  't': 28,
  'a': 27,
  'o': 26,
  'i': 25,
  'n': 24,
  's': 23,
  'h': 22,
  'r': 21,
  'd': 20,
  'l': 19,
  'u': 18,
  ' ': 10
}
