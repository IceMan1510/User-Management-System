/**
 * @requires module:validator
 * @requires module:Models/readFileModel
 * @requires module:Services/userServices
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
 * A controller that validates the data first from the body and if no discrepancy found it send it toward the services
 * @module addUser
 *  @param {*} req
 * @param {*} res
 *  @returns {status} 200 for ok and 400 for bad request.
 */
exports.addUser = (req, res) => {
  const user = req.body;
  if (
    user.fName.trim() === "" ||
    !validator.isAlpha(user.lName) ||
    !validator.isAlpha(user.mName) ||
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
  } else if (isEmailExists(user.email)) {
    res.status(400).send("Email already exists");
  } else {
    var serviceResponse = createUserService(user);
    res.status(200).send(serviceResponse.body);
  }
};
/**
 * A controller that is handling getting all the users data and getting the single user data operation
 * @module getUsers
 *  @param {*} req
 * @param {*} res
 *  @returns {status} 200 for ok and 400 for bad request.
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
 * A controller that is taking the id from the url and sending it toward the service to delete that specific id
 * @module deleteUser
 *  @param {*} req
 * @param {*} res
 *  @returns {status} 200 for ok and 400 for bad request.
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
 * A controller that is handling getting the user id and data which needs to be updated from the user and after validation it is sending it toward the services to perform write operation.
 * @module updateUser
 *  @param {*} req
 * @param {*} res
 *  @returns {status} 200 for ok and 400 for bad request.
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
 *  Retrieves if an email exists in th db.
 *  @param {email} email identifier.
 *  @returns {boolean} if the email exists or not.
 */
const isEmailExists = (email) => {
  const users = readFileModel();
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return true;
    }
  }
};
