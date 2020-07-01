/**
 * GET /
 * Home page.
 */
exports.send = (req, res) => {
    res.render('notifications/send', {
      title: 'Send Notifications'
    });
  };
  