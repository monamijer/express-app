
const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance")

// Display the Home Page
//
exports.index = async(req, res, next)=>{
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({ status : 'Available' }).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
    
  ]);
  res.render('index', {
    title: 'Locallibrary',
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstances,
    author_count: numAuthors,
    genre_count: numGenres
  })
}
//Display the list of all books
exports.book_list = async (req, res, next) => {
  const allBooks = await Book.find({}, 'title author')
        .sort({ title:1 })
        .populate('author')
        .exec();
  res.render('book_list', { title: 'Book List', book_list: allBooks });
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
