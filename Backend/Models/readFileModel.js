const fs = require("fs");
/**
 *  Retrieves the complete json data file.
 *  @returns {jsonData} Json array of user objects.
 */
exports.readFileModel = () => {
  const jsonData = fs.readFileSync("data.json");
  return JSON.parse(jsonData);
};
