const express = require("express");
const {
  addUser,
  getSingleUser,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../Controllers/userController.js");
const router = express.Router();
router.route("/").post(addUser);
router.route("/:id").get(getSingleUser);
router.route("/").get(getAllUsers);
router.route("/:id").delete(deleteUser);
router.route("/:id").patch(updateUser);
module.exports = router;
