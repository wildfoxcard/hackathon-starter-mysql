/**
 * GET /
 * Home page.
 */
exports.send = (req, res) => {
    res.render('send-notifications', {
      title: 'Send Notifications'
    });
  };
  