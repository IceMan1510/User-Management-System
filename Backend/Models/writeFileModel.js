const fs = require("fs");
exports.writeFileModel = (json) => {
  fs.writeFile("data.json", json, (err) => {
    if (err) {
      return err;
    }
  });
};
