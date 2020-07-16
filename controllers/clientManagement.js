
exports.index = (req, res) => {
    res.render('client-management/index', {
      title: 'Client Management'
    });
  };
  
exports.new = (req, res) => {
  res.render("client-management/new", {
    title: "New | Client Management",
  });
};

exports.edit = (req, res) => {
  res.render("user-management/edit", {
    title: "Edit | Client Management",
  });
};


