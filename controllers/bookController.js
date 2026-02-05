
const book = require("../models/book");

// Display the Home Page
//
exports.index = async(req, res, next)=>{
  res.send("NOT IMPLEMENTED: Site Home Page");
}
//Display the list of all books
exports.book_list = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: book list");
};

// Display the detail page for a specific book

exports.book_detail = async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
};
exports.book_create_get = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Book create get`)
}
exports.book_create_post = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Book create post`)
}
exports.book_update_get = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Book update get`)
}
exports.book_update_post = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Book update post`)
}
exports.book_delete_get = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Book delete get`)
}
exports.book_delete_post = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Book delete post`)
}
