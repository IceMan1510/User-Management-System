/**
 * A module for entertaining the various request and route them towards the controller for operations.
 *
 * @module User Routes
 * @requires express
 * @requires ./Controllers/userController.js
 */
const express = require("express");
const {
  addUser,
  getUsers,
  deleteUser,
  updateUser,
} = require("../Controllers/userController.js");

const router = express.Router();
/**
 *Post method
 * @function
 * @name AddUser
 */
router.route("/").post(addUser);
/**
 *Get by id method
 * @function
 * @name getUsers
 */
router.route("/:id").get(getUsers);
/**
 *Get all users method
 * @function
 * @name getUsers
 */
router.route("/").get(getUsers);
/**
 *Delete user by id method
 * @function
 * @name deleteUser
 */
router.route("/:id").delete(deleteUser);
/**
 *Update user by id method
 * @function
 * @name updateUser
 */
router.route("/:id").patch(updateUser);
module.exports = router;
