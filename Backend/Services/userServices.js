const e = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");
const { readFileModel } = require("../Models/readFileModel");
const { writeFileModel } = require("../Models/writeFileModel");

exports.createUserService = (user) => {
  if (
    user.fName.trim() === "" ||
    !validator.isAlpha(user.lName) ||
    user.mName.trim() === "" ||
    !validator.isAlpha(user.mName) ||
    user.lName.trim() === "" ||
    !validator.isEmail(user.email) ||
    !validator.isAlpha(user.fName)
  ) {
    return { success: false, error: "Please enter appropriate data" };
  } else if (isEmailExists(user.email)) {
    return { success: false, error: "Email already exists" };
    // res.status(400).send("Email already exists");
  } else {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    let users = readFileModel();
    user = { id: uuidv4(), ...user };
    users.push(user);
    let json = JSON.stringify(users);
    writeFileModel(json);
    return { success: true, body: `Thank you for registration ${user.fName}` };
  }
};

exports.getAllUsersService = () => {
  var responseArray = readFileModel();
  return responseArray;
};

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

exports.deleteUserService = (id) => {
  const users = readFileModel();
  const filteredUsers = users.filter((user) => user.id !== id);
  if (filteredUsers.length === users.length) {
    return { success: false, response: "Value doesn't exists" };
  } else {
    let json = JSON.stringify(filteredUsers);

    writeFileModel(json);
    return { success: true, response: `User is deleted with id ${id}` };
  }
};

exports.updateUserService = (id, body) => {
  let users = readFileModel();
  var dataToBeUpdated = body;
  var findId = (user) => {
    return user.id === id;
  };
  var checkId = users.find(findId);
  if (checkId === undefined) {
    return { success: false, response: "Value doesn't exists" };
  } else {
    // get results that don't match
    let filteredUsers = users.filter((user) => user.id !== id);
    checkId.fName = dataToBeUpdated.fName;
    checkId.mName = dataToBeUpdated.mName;
    checkId.lName = dataToBeUpdated.lName;
    checkId.gender = dataToBeUpdated.gender;
    checkId.dob = dataToBeUpdated.dob;
    checkId.email = dataToBeUpdated.email;
    const hash = bcrypt.hashSync(dataToBeUpdated.password, 10);
    checkId.password = hash;
    checkId.contact = dataToBeUpdated.contact;
    checkId.address = dataToBeUpdated.address;
    filteredUsers.push(checkId);
    let json = JSON.stringify(filteredUsers);
    writeFileModel(json);
  }
  return { success: true, response: `User Data Updated ${id}` };
};

const isEmailExists = (email) => {
  const users = readFileModel();
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return true;
    }
  }
};
