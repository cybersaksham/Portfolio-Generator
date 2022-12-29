const convert = (data) => {
  let result = [];
  for (const key in data) result.push(data[key]);
  console.log(result);
};

const path = require("path");
const data = require(path.resolve(process.argv[2]));
convert(data);
