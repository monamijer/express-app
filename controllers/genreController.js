const { body, validationResult } = require("express-validator");
const Book = require("../models/book");
const Genre = require("../models/genre");

//Display the list of all genres
exports.genre_list = async (req, res, next) => {
  const allGenres = await Genre.find().sort({'name': 1}).exec();
  res.render('genre_list', { title: 'Genre list', genre_list: allGenres })
};

// Display the detail page for a specific genre

exports.genre_detail = async (req, res, next) => {
  const [ genre, booksInGenre ] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id}, 'title summary').exec()
]);
  if(genre === null){
    const err = new Error('genre not found');
    err.status = 404;
    return next(err)
  };
  res.render('genre_detail', {title: 'Genre Detail', genre, genre_books : booksInGenre});

};
exports.genre_create_get = async(req, res, next)=>{
  res.render('genre_form', {title: 'Genre create'});
}
exports.genre_create_post = [
  body('name', 'Genre name must contain at least 3 characters')
      .trim()
      .isLength({ min: 3 })
      .escape(),
  async(req, res, next)=>{
    const errors = validationResult(req);
    const genre = new Genre({ name: req.body.name });

    if(!errors.isEmpty()){
      res.render('genre_form', {title: 'Create Genre', genre, errors: errors.array(),});
      return;
    };
    const genreExists = await Genre.findOne({ name: req.body.name })
          .collation({ locale: 'en', strength: 2})
          .exec();
  
  if(genreExists){
    res.redirect(genreExists.url);
    return;
};
  await genre.save()
  res.redirect(genre.url)
},
];

exports.genre_update_get = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Genre update get`)
}
exports.genre_update_post = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Genre update post`)
}
exports.genre_delete_get = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Genre delete get`)
}
exports.genre_delete_post = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Genre delete post`)
}
