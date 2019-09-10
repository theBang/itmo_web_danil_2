const crypto = require('crypto');
const fs = require('fs'); 

let key = fs.readFileSync('key');
let msg = fs.readFileSync('secret');

let clr = crypto.publicDecrypt(key, msg)

fs.writeFile('part2_secret_link', clr.toString(), err => console.log(err));
console.log(clr.toString());