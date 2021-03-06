const crud = require('../Crud');
const db = require('../../config/db')
const bcrypt = require('bcrypt');
const crypto = require('crypto');

let isFirstUser = null;

const User = crud({
  tableName: "users",
  defaultData: {
    comparePassword: (candidatePassword, password, cb) => {
      bcrypt.compare(candidatePassword, password, (err, isMatch) => {
        cb(err, isMatch);
      });
    },
    hashAndSalt: function (password) {
      return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            resolve(hash);
          });
        })
      })
    },
    gravatar: (email, size) => {
      if (!size) {
        size = 200;
      }
      if (!email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
      }
      const md5 = crypto.createHash('md5').update(email).digest('hex');
      return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
    }
  }
})

User.isFirstUser = async () => {
  return new Promise((resolve, reject) => {
    if (isFirstUser === null) {
      db.query(`SELECT count(*) as count FROM users`, function (err, result, fields) {
          resolve(result[0].count === 0);
          isFirstUser = false;
        }
      );
    } else {
      resolve(isFirstUser);
    }
  })
}




module.exports = User;
