const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// ---------------------------------------------------------------------------
// GET /users  -> list all users
// ---------------------------------------------------------------------------
exports.user_list = async (req, res, next) => {
  try {
    const users = await User.find().sort({ lastname: 1 });
    res.render("user_list", { title: "User List", user_list: users });
  } catch (err) {
    next(err);
  }
};

// ---------------------------------------------------------------------------
// GET /users/:id  -> user detail
// ---------------------------------------------------------------------------
exports.user_detail = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    res.render("user_detail", { title: "User Detail", user });
  } catch (err) {
    next(err);
  }
};

// ---------------------------------------------------------------------------
// GET /users/create  -> display create form
// ---------------------------------------------------------------------------
exports.user_create_get = (req, res) => {
  res.render("user_form", { title: "Create User" });
};

// ---------------------------------------------------------------------------
// POST /users/create  -> handle create
// ---------------------------------------------------------------------------
exports.user_create_post = [
  body("name").trim().notEmpty().withMessage("Name is required").escape(),
  body("lastname").trim().notEmpty().withMessage("Lastname is required").escape(),
  body("email").trim().isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  async (req, res, next) => {
    const errors = validationResult(req);
    const { name, lastname, email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.render("user_form", {
        title: "Create User",
        user: { name, lastname, email },
        errors: errors.array(),
      });
    }

    try {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.render("user_form", {
          title: "Create User",
          user: { name, lastname, email },
          errors: [{ msg: "Email already in use" }],
        });
      }

      const user = new User({ name, lastname, email, password });
      await user.save();
      res.redirect(user.url);
    } catch (err) {
      next(err);
    }
  },
];

// ---------------------------------------------------------------------------
// GET /users/:id/update  -> display update form
// ---------------------------------------------------------------------------
exports.user_update_get = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    res.render("user_form", { title: "Update User", user });
  } catch (err) {
    next(err);
  }
};

// ---------------------------------------------------------------------------
// POST /users/:id/update  -> handle update
// ---------------------------------------------------------------------------
exports.user_update_post = [
  body("name").trim().notEmpty().withMessage("Name is required").escape(),
  body("lastname").trim().notEmpty().withMessage("Lastname is required").escape(),
  body("email").trim().isEmail().withMessage("Invalid email").normalizeEmail(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const { name, lastname, email } = req.body;

    if (!errors.isEmpty()) {
      return res.render("user_form", {
        title: "Update User",
        user: { _id: req.params.id, name, lastname, email },
        errors: errors.array(),
      });
    }

    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, lastname, email },
        { new: true, runValidators: true }
      );
      if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        return next(err);
      }
      res.redirect(user.url);
    } catch (err) {
      next(err);
    }
  },
];

// ---------------------------------------------------------------------------
// GET /users/:id/delete  -> display delete confirmation
// ---------------------------------------------------------------------------
exports.user_delete_get = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.redirect("/users");
    res.render("user_delete", { title: "Delete User", user });
  } catch (err) {
    next(err);
  }
};

// ---------------------------------------------------------------------------
// POST /users/:id/delete  -> handle delete
// ---------------------------------------------------------------------------
exports.user_delete_post = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/users");
  } catch (err) {
    next(err);
  }
};
