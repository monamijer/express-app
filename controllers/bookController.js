const { body, validationResult} = require('express-validator');
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
  const [ book, bookinstances ] = await Promise.all([
    Book.findById(req.params.id).populate('author').populate('genre').exec(),
    BookInstance.find({book: req.params.id}).exec(),
    
  ]);
  if(book === null){
    const err = new Error('book not found');
    err.status = 404;
    return next(err);
  };
  res.render('book_detail', {title: book.title, book, book_instances:bookinstances});
};
exports.book_create_get = async(req, res, next)=>{
    const [ allAuthors, allGenres] = await Promise.all([
      Author.find().sort({ family_name: 1 }).exec(),
      Genre.find().sort({ name: 1 }).exec(),
    ]);
  res.render('book_form', { title: 'Create Book', authors: allAuthors, genres: allGenres, });
};
exports.book_create_post = [
    (req, res, next)=>{
      if(!Array.isArray(req.body.genre)){
        req.body.genre =
          typeof req.body.genre===undefined? []: [req.body.genre];
      }
      next();
    },
  body('title', 'title must not be empty')
      .trim()
      .isLength({ min: 1 })
      .escape(),
  body('author', 'author must not be empty')
      .trim()
      .isLength({ min: 1 })
      .escape(),
  body('summary', 'summary must not be empty')
      .trim()
      .isLength({ min: 1 })
      .escape(),
  body('isbn', 'isbn must not be empty').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),

  async(req, res, next)=>{
    const errors = validationResult(req);
    const book = new Book({
      title: req.body.title,
      author : req.body.author,
      summary: req.body.summary,
      isbn : req.body.isbn,
      genre: req.body.genre,

    });
    if(!errors.isEmpty()){
      const [ allAuthors, allGenres ] = await Promise.all([
        Author.find().sort({ family_name: 1}).exec(),
        Genre.find().sort({ name: 1 }).exec()
      ]);
      for(const genre of allGenres){
        if(book.genre.includes(genre._id)){
          genre_checked='true';
        }
      }
      res.render('book_form', {title:'Book Create', authors: allAuthors, genres: allGenres, errors: errors.array(),});
      return;
    }
  
  book.save();
  await res.redirect(book.url)
  }
]
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
