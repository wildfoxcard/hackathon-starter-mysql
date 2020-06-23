const crud = require('../Crud');
const UserNotificationMeta = require('./UserNotificationsMeta');
const { socketProcessing } = require('../../services/socketsByUser')

const UserNotifications = crud({
    tableName: "user_notifications"
});

UserNotifications.send = ({ user_id, url, message, type }) => {
    const userNotification = new UserNotifications({ user_id, url, message, type });
    userNotification.save((err) => {
        if (err) console.error(err);

        UserNotificationMeta.findOne({ user_id }, (err, userNotificationMeta) => {
            if (err) console.error(err);
            if (!userNotificationMeta) {
                userNotificationMeta = new UserNotificationMeta({ user_id, number_since_viewed: 0 });
            }
            userNotificationMeta.number_since_viewed += 1;
            userNotificationMeta.save((err) => {
                if (err) console.error(err);

                socketProcessing.send(user_id, "notifications", { url, message, type, numberSinceViewed: userNotificationMeta.number_since_viewed });
            });
        });
    });
}

module.exports = UserNotifications;
