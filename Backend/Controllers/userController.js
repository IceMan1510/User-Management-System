const e = require("express");

const {
  createUserService,
  getAllUsersService,
  getSingleUserService,
  deleteUserService,
  updateUserService,
} = require("../Services/userServices");
exports.addUser = (req, res) => {
  var serviceResponse = createUserService(req.body);

  if (serviceResponse.success === true) {
    res.status(200).send(serviceResponse.body);
  } else {
    res.status(400).send(serviceResponse.error);
  }
};

exports.getAllUsers = (req, res) => {
  var serviceResponse = getAllUsersService;
  res.status(200).send(serviceResponse());
};
exports.getSingleUser = (req, res) => {
  var serviceResponse = getSingleUserService(req.params.id);
  if (serviceResponse === false) {
    res.status(400).send("Value doesn't exists");
  } else;
  res.status(200).send(serviceResponse);
};
exports.deleteUser = (req, res) => {
  var serviceResponse = deleteUserService(req.params.id);
  if (serviceResponse.success === true) {
    res.status(200).send(serviceResponse.response);
  } else {
    res.status(400).send(serviceResponse.response);
  }
};
exports.updateUser = (req, res) => {
  var serviceResponse = updateUserService(req.params.id, req.body);
  if (serviceResponse.success === true) {
    res.status(200).send(serviceResponse.response);
  } else {
    res.status(400).send(serviceResponse.response);
  }
};
