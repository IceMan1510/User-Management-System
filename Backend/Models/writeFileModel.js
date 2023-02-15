const fs = require("fs");
/**
 * @param {object} json -  json we are getting from the user
 * @param {string} id - ID
 * @param {string} fName - First Name
 * @param {string} mName - Middle Name
 * @param {string} lName - Last Name
 * @param {String} gender - Gender
 * @param {String} email - E-Mail
 * @param {string} password - Password
 * @param {string} address - Location
 * @param {string} contact - Phone Number
 * @returns {} - the file gets written
 */
exports.writeFileModel = (json) => {
  fs.writeFile("data.json", json, (err) => {
    if (err) {
      return err;
    }
  });
};
