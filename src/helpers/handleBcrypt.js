let { genSaltSync, hashSync, compareSync } = require('bcryptjs');

function hashPassword(password) {
    const salt = genSaltSync(12);
    return hashSync(password, salt);
}

 function verifyPassword(passwordAttempted, hashedPassword) {
    return compareSync(passwordAttempted, hashedPassword);
}
module.exports = {
    hashPassword,
    verifyPassword
}