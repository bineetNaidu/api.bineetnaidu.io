const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.get('/docs', (req, res) => {
  res.render('docs', { title: 'Referances' });
});

module.exports = router;
