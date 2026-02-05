
const bookinstance = require("../models/bookinstance");

//Display the list of all bookinstances
exports.bookinstance_list = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Bookinstance list");
};

// Display the detail page for a specific bookinstance

exports.bookinstance_detail = async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Bookinstance detail: ${req.params.id}`);
};
exports.bookinstance_create_get = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Bookinstance create get`)
}
exports.bookinstance_create_post = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Bookinstance create post`)
}
exports.bookinstance_update_get = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Bookinstance update get`)
}
exports.bookinstance_update_post = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Bookinstance update post`)
}
exports.bookinstance_delete_get = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Bookinstance delete get`)
}
exports.bookinstance_delete_post = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Bookinstance delete post`)
}
