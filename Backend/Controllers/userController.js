/**
 * A controller module for handling user requests from the routers.
 *
 * @module Controller
 * @requires readFileModel
 * @requires createUserService
 * @requires getAllUsersService
 * @requires getSingleUserService
 * @requires deleteUserService
 * @requires updateUserService
 */
const validator = require("validator");
const { readFileModel } = require("../Models/readFileModel");
const {
  createUserService,
  getAllUsersService,
  getSingleUserService,
  deleteUserService,
  updateUserService,
} = require("../Services/userServices");
/**
 * Add a new user.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - Create new user.
 */
let checkPwd = (str) => {
  if (
    str.length < 8 ||
    str.length > 50 ||
    str.search(/\d/) == -1 ||
    str.search(/[a-zA-Z]/) == -1 ||
    str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) != -1
  ) {
    return false;
  } else {
    return true;
  }
};
var validateContactNumber = (input) => {
  const regex = /^\d{10}$/; // regex pattern to match exactly 10 digits
  return regex.test(input);
};
var isZipNumber = (zip) => {
  if (isNaN(zip)) {
    return false;
  }

  if (zip.toString().length !== 6) {
    return false;
  }

  return true;
};

var checkDate = (date) => {
  if (
    new Date(date).getFullYear() < 1970 ||
    new Date(date).getFullYear() > 2005 ||
    date === "Select Date" ||
    date === ""
  ) {
    return false;
  } else {
    return true;
  }
};
exports.addUser = (req, res) => {
  const user = req.body;
  if (
    user.fName.trim() === "" ||
    !validator.isAlpha(user.lName) ||
    !validator.isAlpha(user.mName) ||
    user.lName.trim() === "" ||
    !validator.isEmail(user.email) ||
    !validator.isAlpha(user.fName) ||
    user.contact.trim() === "" ||
    user.contact.trim().length !== 10 ||
    user.password.trim() === "" ||
    user.address.trim() === "" ||
    user.dob.trim() === "" ||
    user.contact.trim() === "" ||
    !checkPwd(user.password) ||
    !checkDate(user.dob) ||
    !validateContactNumber(user.contact) ||
    !isZipNumber(user.pinCode) ||
    user.address.trim() === "" ||
    user.address1.trim() === "" ||
    user.state === "Select State" ||
    user.city === ""
  ) {
    res.status(400).send("Please enter appropriate data");
  } else if (isEmailExists(user.email)) {
    res.status(400).send("Email already exists");
  } else {
    var serviceResponse = createUserService(user);
    res.status(200).send(serviceResponse.body);
  }
};
/**
 * Get a list of all users.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - A list of 8 users per page.
 */
exports.getUsers = (req, res) => {
  const params = req.params;
  if (JSON.stringify(params) === "{}") {
    var serviceResponse = getAllUsersService(req.query.page);
    res.status(200).send(serviceResponse);
  } else {
    var serviceResponse = getSingleUserService(params.id);
    if (serviceResponse === false) {
      res.status(400).send("Value doesn't exists");
    } else;
    res.status(200).send(serviceResponse);
  }
};
/**
 * Delete a user.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - Delete response, if deleted or not.
 */
exports.deleteUser = (req, res) => {
  const users = readFileModel();
  const filteredUsers = users.filter((user) => user.id !== req.params.id);
  if (filteredUsers.length === users.length) {
    res.status(400).send("Value doesn't exists");
  } else {
    var serviceResponse = deleteUserService(filteredUsers, req.params.id);
    res.status(200).send(serviceResponse.response);
  }
};
/**
 * Get a list of all users.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - Update response whether the user has been updated or not.
 */
exports.updateUser = (req, res) => {
  let user = req.body;
  if (
    user.fName.trim() === "" ||
    !validator.isAlpha(user.lName) ||
    !validator.isAlpha(user.mName) ||
    user.mName.trim() === "" ||
    user.lName.trim() === "" ||
    !validator.isEmail(user.email) ||
    !validator.isAlpha(user.fName) ||
    user.password.trim() === "" ||
    user.address.trim() === "" ||
    user.dob.trim() === "" ||
    user.contact.trim() === "" ||
    validator.isAlpha(user.contact)
  ) {
    res.status(400).send("Please enter appropriate data");
  } else {
    var serviceResponse = updateUserService(req.params.id, req.body);
    if (serviceResponse.success === true) {
      res.status(200).send(serviceResponse.response);
    } else {
      res.status(400).send(serviceResponse.response);
    }
  }
};

/**

Checks if the email is exists in the database.
@param {string} email - The email which has to be checked.
@param {number} y - The second number to add.
@returns {boolean} True if the email exists, false if it doesn't.
*/

const isEmailExists = (email) => {
  const users = readFileModel();
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return true;
    }
  }
};
