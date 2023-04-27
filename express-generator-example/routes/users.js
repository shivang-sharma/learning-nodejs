var express = require('express');
var router = express.Router();


router.use(function(req, res, next) {
  console.log("Router level middleware");
  next();
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {list: ['Shivang', "Sham", "Ricky"]});
});

module.exports = router;
