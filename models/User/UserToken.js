const crud = require('../Crud');

const UserToken = crud({
  tableName: "user_token"
})

module.exports = UserToken;
