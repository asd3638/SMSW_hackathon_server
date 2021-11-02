var express = require("express");
var router = express.Router();

/*
const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect('auth/login');
  }
};

router.get('/', authenticateUser, (req, res, next) => {
  res.render('main', { user: req.user });
});
*/

router.get("/", function (req, res) {
  res.render("main", { user: req.user });
});

module.exports = router;
