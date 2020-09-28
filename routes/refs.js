const express = require('express');

const router = express.Router();

// Please donot change this route
// GET Ref page.
router.get('/', (req, res) => {
  res.render('refs', { title: 'Api\'s' });
});
// Please donot change this route

// Add you referense here ->
// file structure -> view file should be in its own view Folder

module.exports = router;
