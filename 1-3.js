// hex encoded string
var str = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"

// make it a byte array
var buf = new Buffer(str, 'hex')

// we know it has been xor'd against a single character
// to find the key we can perform frequency analysis
// https://en.wikipedia.org/wiki/Frequency_analysis
// i want to know the most frequently used byte in the buffer

var freq = {}
var max = 0;
var mostFrequent = null;
for (var i=0; i<buf.length; i++) {
  var n = buf[i];
  if (freq[n]) {
    freq[n]++;
    if (freq[n] > max) {
      max = freq[n]
      mostFrequent = n
    }
  } else {
    freq[n] = 1;
  }
}
console.log(buf.toString());

var mostFrequentChar = String.fromCharCode(mostFrequent)
console.log(mostFrequent+' ('+mostFrequentChar+') showed up '+max+' times');


// ok so if x is most frequent,
// and this ciphertext is hiding english
// then x is probably one of etaoin shrdlu,
// which occur most frequently in normal english

// the problem wants me to write a way to score it though
// so this means i could map a score to each char and then run
// all the letters of the alphabet as the key (Since i know it is single-byte)
// and then the one with the best score is probably the plaintext...

var xor = require('./lib/xor')


function makeKey(singleByte, buf) {
  var keyBuf = [];
  for (var i=0; i<buf.length; i++) {
    keyBuf.push(singleByte)
  }
  return new Buffer(keyBuf)
}

var key = makeKey('a', buf)
console.log(key.toString());

var out = xor(buf, key).toString()
console.log(out);


process.exit(1)
