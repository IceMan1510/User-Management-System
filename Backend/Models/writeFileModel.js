const fs = require("fs");
/**
 * @param {*} -  json we are getting from the user
 * @param {string} - ID
 * @param {string} - First Name
 * @param {string} - Middle Name
 * @param {string} - Last Name
 * @param {String} - Gender
 * @param {String} - E-Mail
 * @param {string} - Password
 * @param {string} - Location
 * @param {string} - Phone Number
 * @returns {} - the file gets written
 */
exports.writeFileModel = (json) => {
  fs.writeFile("data.json", json, (err) => {
    if (err) {
      return err;
    }
  });
};
