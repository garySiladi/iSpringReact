const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.get('/', function(req, res) {
  // const blog = getBlogById(req.params.blogId);
  res.send("HI");
});

module.exports = router;
