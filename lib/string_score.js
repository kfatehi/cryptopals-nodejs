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
  'e': 2.9,
  't': 2.8,
  'a': 2.7,
  'o': 2.6,
  'i': 2.5,
  'n': 2.4,
  's': 2.3,
  'h': 2.2,
  'r': 2.1,
  'd': 2.0,
  'l': 1.9,
  'u': 1.8,
  ' ': 1.7
}
