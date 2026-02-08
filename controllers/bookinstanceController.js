const { body, validationResult } = require('express-validator');
const Book = require('../models/book');
const Bookinstance = require("../models/bookinstance");

//Display the list of all bookinstances
exports.bookinstance_list = async (req, res, next) => {
  const allBookInstances = await Bookinstance.find()
        .populate()
        .exec();
  res.render('bookinstance_list', { title: 'Book instance list', bookinstance_list: allBookInstances })
};

// Display the detail page for a specific bookinstance

exports.bookinstance_detail = async (req, res, next) => {
  const bookInstance = await
    Bookinstance.findById(req.params.id).populate('book').exec();
  
  if(bookInstance === null){
    const err = new Error('BookInstance not found');
    err.status=404;
    return next(err);
  };
  
  res.render('bookinstance_detail', {title: 'Book', bookinstance: bookInstance})
};
exports.bookinstance_create_get = async(req, res, next)=>{
  //const allBooks = await Book.find({}, 'title').sort({ title: 1 }).exec();
 //res.render('bookinstance_form', {title: 'Create Bookinstance'})
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
