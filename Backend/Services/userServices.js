/**
 * @requires module:bcrypt
 * @requires modules:uuid
 * @requires modules:Models/readFileModel
 * @requires modules:Models/writeFileModel

 */
const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");
const { readFileModel } = require("../Models/readFileModel");
const { writeFileModel } = require("../Models/writeFileModel");

/**
 * A service that takes the takes an object from the user to add that into db
 * @module createUserService
 *  @param {object} - The user data object from the addUser controller *
 *  @returns {object} - Success status and message
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
 * A service that return the complete user list
 * @module getAllUsersService
 *  @param {void}
 *
 *  @returns {Array} - Array of user data objects
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
 * A service that return the user object from db
 * @module getSingleUserService
 *  @param {id} - The service will search by the id
 *  @returns {object} - user data object
 */
exports.getSingleUserService = (id) => {
  const users = readFileModel();
  var result = users.find(function (e) {
    return e.id === id;
  });
  if (result === undefined) {
    return false;
  } else {
    return result;
  }
};
/**
 * A service that return the user object from db
 * @module getSingleUserService
 *  @param {filteredUsers} - The array of objects after validations
 *@param {id} -The service will search by the id
 *  @returns {object} - The success status and a message
 */
exports.deleteUserService = (filteredUsers, id) => {
  let json = JSON.stringify(filteredUsers);

  writeFileModel(json);
  return { success: true, response: `User is deleted with id ${id}` };
};
/**
 * A service that updates the user object data
 * @module updateUserService
 *  @param {id} - The id of the user object
 *@param {body} -The body which needs to be updated in the array of objects
 *  @returns {object} - The success status and a message.
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

    let json = JSON.stringify(users);
    writeFileModel(json);
  }
  return { success: true, response: `User Data Updated ${id}` };
};
