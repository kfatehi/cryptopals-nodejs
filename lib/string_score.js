module.exports = rmsScore

function calcScore(str) {
  var score = 0;
  for (var i=0; i<str.length; i++) {
    var letter = str[i].toLowerCase();
    var value = letterValues[letter];
    if (value) score+=value;
  }
  return score;
}

function letterP(str, letter){
  return ((str.split(letter).length-1)/(str.length))
}

function rmsScore(str){
  var score = 0;
  var uStr = str.toUpperCase()
  for (var key in letterProb){
    score+=(letterProb[key]-letterP(uStr, key))*(letterProb[key]-letterP(uStr,key))
  }
  // score for spaces
  score += (letterP(uStr," ")-0.15)*(letterP(uStr," ")-0.15)
  return score  
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

var letterProb = {
  'E': .1202,
  'T': .0910,
  'A': .0812,
  'O': .0768,
  'I': .0731,
  'N': .0695,
  'S': .0628,
  'R': .0602,
  'H': .0592,
  'D': .0432,
  'L': .0398,
  'U': .0288,
  'C': .0271,
  'M': .0261,
  'F': .0230,
  'Y': .0211,
  'W': .0209,
  'G': .0203,
  'P': .0182,
  'B': .0149,
  'V': .0111,
  'K': .0069,
  'X': .0017,
  'Q': .0011,
  'J': .0010,
  'Z': .0007,
}
