const fs = require("fs");
exports.readFileModel = () => {
  const jsonData = fs.readFileSync("data.json");
  return JSON.parse(jsonData);
};
