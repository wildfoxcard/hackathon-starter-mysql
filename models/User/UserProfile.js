const crud = require('../Crud');

const UserProfile = crud({
  tableName: "user_profile"
})

module.exports = UserProfile;
