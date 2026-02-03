const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Wiki home page");
});
router.get("/about/*jer/:filename{.:ext}", (req, res) => {
  res.send(req.params);
});

module.exports = router;
