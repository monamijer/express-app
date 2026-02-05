const author = require("../models/author");

//Display the list of all authors
exports.author_list = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author list");
};

// Display the detail page for a specific Author

exports.author_detail = async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
};
exports.author_create_get = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Author create get`)
}
exports.author_create_post = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Author create post`)
}
exports.author_update_get = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Author update get`)
}
exports.author_update_post = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Author update post`)
}
exports.author_delete_get = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Author delete get`)
}
exports.author_delete_post = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Author delete post`)
}
