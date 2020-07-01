/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  try {
    asdf

  } catch (ex) {
    console.error(ex)
  }
  res.render('dashboard/index', {
    title: 'Home'
  });
};
