const { body, validationResult } = require('express-validator');
const Author = require("../models/author");
const Book = require("../models/book");

//Display the list of all authors
exports.author_list = async (req, res, next) => {
  const allAuthors = await Author.find()
        .sort({ 'family_name': 1 })
        .exec();
  res.render('author_list', { title: 'Author List', author_list: allAuthors })
};

// Display the detail page for a specific Author

exports.author_detail = async (req, res, next) => {
  const [ author, allBooksByAuthor ] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id}, 'title summary').exec(),
  ]);
  if(author === null){
    const err = new Error('author not found');
    err.status = 404;
    return next(err)
  }
  res.render('author_detail', {title: 'Author Detail', author, author_books: allBooksByAuthor})
};
exports.author_create_get = async(req, res, next)=>{
  res.render('author_form', {title: 'Create Author'})
}
exports.author_create_post = [
  body('first_name')
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage('First name must be specified')
    .isAlphanumeric()
    .withMessage('First name has no alpha-numeric characters'),
  body('family_name')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Family name must be specified')
    .isAlphanumeric()
    .withMessage('Family name has no alpha-numeric characters'),
  body('date_of_birth', 'Invalid date of birth')
    .optional({ value: 'falsy' })
    .isISO8601()
    .toDate(),
  body('date_of_death', 'Invalid date of death')
    .optional({ value: 'falsy' })
    .isISO8601()
    .toDate(),
  async(req, res, next)=>{
    const errors = validationResult(req);
    const author = new Author({ 
      first_name : req.body.first_name, 
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if(!errors.isEmpty()){
      res.render('author_form', {title: 'Create Author', author, errors: errors.array(),});
      return;
    }
    author.save();
    res.redirect(author.url);
  },
];
exports.author_update_get = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Author update get`)
}
exports.author_update_post = async(req, res, next)=>{
  res.send(`NOT IMPLEMENTED: Author update post`)
}
exports.author_delete_get = async(req, res, next)=>{
  const [ author, allBooksByAuthor ] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id}, 'title summary').exec(),
  ]);
  if(author === null){
    res.redirect('/catalog/authors');
    return;
  };
  res.render(
    'author_delete',
    { title: 'Delete Author', author, author_books: allBooksByAuthor, }
  );
};
exports.author_delete_post = async(req, res, next)=>{
  const [ author, allBooksByAuthor ] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, 'title summary').exec(),
  ]);
  if(allBooksByAuthor.length > 0){
    res.render('author_delete', {title: 'Delete Author', author, author_books: allBooksByAuthor,});
    return;
  }
  await Author.findByIdAndDelete(req.body.authorId);
  res.redirect('/catalog/authors');
}
