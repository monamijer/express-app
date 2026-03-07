const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET /users
router.get("/", userController.user_list);

// GET /users/create
router.get("/create", userController.user_create_get);

// POST /users/create
router.post("/create", userController.user_create_post);

// GET /users/:id
router.get("/:id", userController.user_detail);

// GET /users/:id/update
router.get("/:id/update", userController.user_update_get);

// POST /users/:id/update
router.post("/:id/update", userController.user_update_post);

// GET /users/:id/delete
router.get("/:id/delete", userController.user_delete_get);

// POST /users/:id/delete
router.post("/:id/delete", userController.user_delete_post);

module.exports = router;
