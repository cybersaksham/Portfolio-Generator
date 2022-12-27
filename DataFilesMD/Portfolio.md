# Portfolio.js File

- This file contains data of portfolio of user to showcase.
- Those details are as follows.

```txt
├── Filters List
│   ├── Category Name
│   └── Filter Name
├── Projects Information
│   ├── Description List
│   ├── Filters Applied
│   ├── Image Folder Name
│   ├── Name
│   └── URLs List
│       ├── Given URL
│       └── URL Type
└── URL Types
```

## Data Structure

```js
Array filters; // Eg: ["filter-game"]
Object cat_types = {
  filter_name: cat_name, // Eg: "filter-game": "Game"
  ...
};
Array urls;
Array projects;
```

## Code Structure

```js
// Filters
// const game_filter = "filter-game";

const generateFilterString = (...fils) => {
  return Array.from(fils).join(" ");
};

// URL Types
// const git = "Github";

// Projects
const projects = [
  {
    name,
    filter: generateFilterString(),
    img,
    slides: 1,
    desc: [],
    urls: [],
  },
];

// Get Details
const getDetails = (id) => {
  if (!id || id < 0 || id >= projects.length) return projects[0];

  const pr = projects[id];
  let fils_ = pr.filter.split(" ");
  let cats_ = [];
  fils_.forEach((el) => {
    cats_ = [...cats_, cat_types[el]];
  });
  let cat = cats_.join(", ");
  pr["category"] = cat;

  return pr;
};

export default { filters, projects, getDetails };
```
