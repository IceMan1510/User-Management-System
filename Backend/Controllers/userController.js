const e = require("express");
const fs = require("fs");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");
exports.addUser = (req, res) => {
  let user = req.body;
  if (
    user.fName.trim() === "" ||
    !validator.isAlpha(user.lName) ||
    user.mName.trim() === "" ||
    !validator.isAlpha(user.mName) ||
    user.lName.trim() === "" ||
    !validator.isEmail(user.email) ||
    !validator.isAlpha(user.fName)
  ) {
    res.status(400).send("Please send appropriate data");
  } else if (isEmailExists(user.email)) {
    res.status(400).send("Email already exists");
  } else {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    let users = readFile();
    user = { id: uuidv4(), ...user };
    users.push(user);
    let json = JSON.stringify(users);
    fs.writeFile("data.json", json, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("User registered");
        res.status(200).send(`Thank You For The Registration ${user.fName}`);
      }
    });
  }
};

exports.getAllUsers = (req, res) => {
  res.send(readFile());
};
exports.getSingleUser = (req, res) => {
  const users = readFile();
  const { id } = req.params;

  const findId = (user) => {
    return user.id === id;
  };
  var checkId = users.find(findId);
  if (checkId === undefined) {
    res.status(404).send("Value doesn't exists");
  } else {
    res.status(200).send(checkId);
  }
};
exports.deleteUser = (req, res) => {
  const users = readFile();
  const { id } = req.params;
  const filteredUsers = users.filter((user) => user.id !== id);
  let json = JSON.stringify(filteredUsers);
  fs.writeFile("data.json", json, (err) => {
    if (err) {
      console.logm(err);
    } else {
      console.log("User Deleted");
      res.status(200).send(`User is deleted ${id}`);
    }
  });
};
exports.updateUser = (req, res) => {
  const { id } = req.params;
  let users = readFile();
  var dataToBeUpdated = req.body;
  var findId = (user) => {
    return user.id === id;
  };
  var checkId = users.find(findId);
  if (checkId === undefined) {
    res.status(404).send("Value doesn't exists");
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
    fs.writeFile("data.json", json, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`User Data Updated ${req.params.id}`);
        res.status(200).send(`Data updated for id ${req.params.id}`);
      }
    });
  }
};

const readFile = () => {
  const jsonData = fs.readFileSync("data.json");
  return JSON.parse(jsonData);
};
const isEmailExists = (email) => {
  const users = readFile();
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return true;
    }
  }
};
