const util = require("util");
const fs = require("fs");
const path = require("path");

let folders = [];
let files = [];

function dirTree(filename) {
  var stats = fs.lstatSync(filename),
    info = {
      path: path.resolve(filename),
      name: path.basename(filename),
    };

  if (stats.isDirectory()) {
    folders.push(filename);
    info.type = "folder";
    info.children = fs.readdirSync(filename).map(function (child) {
      return dirTree(filename + "/" + child);
    });
  } else {
    // Assuming it's a file. In real life it could be a symlink or
    // something else!
    info.type = "file";
    files.push({
      name: filename,
      source:
        "https://raw.githubusercontent.com/cybersaksham/Portfolio-Generator/master/Required%20Code/" +
        filename,
    });
  }

  return info;
}

const data = util.inspect(dirTree(process.argv[2]), true, null);
fs.writeFile(
  "data.json",
  JSON.stringify({
    folders,
    files,
  }),
  function (err) {
    if (err) {
      console.log(err);
    }
  }
);
console.log("Folders:", folders.length);
console.log("Files:", files.length);
