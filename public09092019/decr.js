const crypto = require('crypto');
const fs = require('fs'); 

let key = fs.readFileSync('key');
let msg = fs.readFileSync('dansecret');

let decr = crypto.publicDecrypt(key, msg)

console.log(msg.toString());
console.log(decr.toString());

