/**
 * A module for handling requests from the controller and providing responses to the controller back.
 *
 * @module Services
 * @requires bcrypt
 * @requires uuidv4
 * @requires readFileModel
 * @requires writeFileModel
 */
const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");
const { readFileModel } = require("../Models/readFileModel");
const { writeFileModel } = require("../Models/writeFileModel");
/**
 * Create a new user service.
 * @param {Object} user - The user object passed from the controller.
 * @returns {Object} - Return the success status and success message.
 */
exports.createUserService = (user) => {
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  let users = readFileModel();
  user = { id: uuidv4(), ...user };

  users.push(user);
  let json = JSON.stringify(users);
  writeFileModel(json);
  return { success: true, body: `Thank you for registration ${user.fName}` };
};
/**
 * Get user by page service.
 * @param {String} page - The page number passed from the controller.
 * @returns {Object} - Returns the totalRecords, totalPages and the data for the specific page.
 */

exports.getAllUsersService = (page) => {
  var users = readFileModel();
  var size = users.length;
  var s = (page - 1) * 8;
  var e = page * 8;
  var pageLimit = Math.ceil(size / 8);
  return {
    totalRecords: users.length,
    totalPages: pageLimit,
    data: users.slice(s, e),
  };
};

/**
 * Get single user by email service.
 * @param {String} id - The email id passed from the controller.
 * @returns {Object} - Returns the object of that user else return false.
 */
exports.getSingleUserService = (id) => {
  const users = readFileModel();
  var result = users.find(function (e) {
    return e.email === id;
  });
  if (result === undefined) {
    return false;
  } else {
    return result;
  }
};

/**
 * Get delete user.
 * @param {Object} filteredUsers - The users object.
 * @param {string} id - The id which has to deleted.
 * @returns {Object} - The success status and success response.
 */
exports.deleteUserService = (filteredUsers, id) => {
  let json = JSON.stringify(filteredUsers);

  writeFileModel(json);
  return { success: true, response: `User is deleted with id ${id}` };
};
/**
 * The update user service.
 * @param {String} id - The users object.
 * @param {object} body - The body object from the user.
 * @returns {Object} - The success status and success response.
 */
exports.updateUserService = (id, body) => {
  let users = readFileModel();
  var dataToBeUpdated = body;
  var index = undefined;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      index = i;
    }
  }
  if (index === undefined) {
    return { success: false, response: "Value doesn't exists" };
  } else {
    users[index].fName = dataToBeUpdated.fName;
    users[index].mName = dataToBeUpdated.mName;
    users[index].lName = dataToBeUpdated.lName;
    users[index].gender = dataToBeUpdated.gender;
    users[index].dob = dataToBeUpdated.dob;
    users[index].email = dataToBeUpdated.email;
    const hash = bcrypt.hashSync(dataToBeUpdated.password, 10);
    users[index].password = hash;
    users[index].contact = dataToBeUpdated.contact;
    users[index].address = dataToBeUpdated.address;
    users[index].address1 = dataToBeUpdated.address1;
    users[index].landmark = dataToBeUpdated.landmark;
    users[index].city = dataToBeUpdated.city;
    users[index].state = dataToBeUpdated.state;
    users[index].pinCode = dataToBeUpdated.pinCode;

    let json = JSON.stringify(users);
    writeFileModel(json);
  }
  return { success: true, response: `User Data Updated ${id}` };
};
