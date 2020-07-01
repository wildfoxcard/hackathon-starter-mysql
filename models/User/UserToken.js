const crud = require('../Crud');

const UserToken = crud({
  tableName: "user_tokens"
})

module.exports = UserToken;
