const crud = require('../Crud');

const UserNotificationsMeta = crud({
  tableName: "user_notifications_meta",
  isSoftDelete: false
})

module.exports = UserNotificationsMeta;
