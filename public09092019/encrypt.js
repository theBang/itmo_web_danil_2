const crypto = require('crypto');
const fs = require('fs'); 

let key = fs.readFileSync('key');
let msg = fs.readFileSync('enc');

let encr = crypto.publicEncrypt({ key: key, padding: crypto.constants.RSA_PKCS1_PADDING }, msg);
let decr = crypto.publicDecrypt(key, encr)

console.log(msg.toString());
console.log(encr.toString());

fs.writeFile('dansecret', encr.toString(), err => console.log(err));
console.log(decr.toString());
