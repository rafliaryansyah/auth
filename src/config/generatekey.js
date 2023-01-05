const crypto = require('crypto');

const key  = crypto.randomBytes(16).toString('hex');
const firstKey  = crypto.randomBytes(32).toString('hex');
const secondKey = crypto.randomBytes(32).toString('hex');

console.table({ key, firstKey, secondKey });