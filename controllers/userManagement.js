const User = require('../models/User/User')

exports.index = (req, res) => {
  res.render("user-management/index", {
    title: "User Management",
  });
};

exports.form = (req, res) => {
  res.render("user-management/form", {
    title: "New User | User Management",
    id: req.query.id || undefined
  });
};





