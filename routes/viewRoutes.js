const express = require('express');
const router = express.Router();

// Root Route (Home)
router.get('/', (req, res) => {
  res.sendFile('views/index.html', {
    root: __dirname + '/../',
  });
});


module.exports = router;