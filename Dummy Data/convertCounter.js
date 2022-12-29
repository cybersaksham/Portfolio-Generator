const convert = ({ items }) => {
  let result = [];
  let itemsCount = items.length;
  result.push(itemsCount);
  items.map((it) => {
    for (const key in it) result.push(it[key]);
  });
  console.log(result);
};

const path = require("path");
const data = require(path.resolve(process.argv[2]));
convert(data);
