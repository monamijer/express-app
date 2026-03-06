const express = require("express");
const router = express.Router();
// GET routes
router.get('/', (req, res, next)=>{
  res.send('admin Router respond with a ressource.');
});

router.get('/home', (req, res, next)=>{
  res.send('home page for admin work.');
})

module.exports = router;
