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

## Code Structure

```js
// Filters
// const game_filter = "filter-game";

const filters = [
  // game_filter
];

const generateFilterString = (...fils) => {
  return Array.from(fils).join(" ");
};

// URL Types
// const git = "Github";

// Category Types
const cat_types = {
  // [game_filter]: "Game",
};

// Projects
const projects = [
  {
    name, // "Face Detector"
    filter: generateFilterString(), // generateFilterString(game_filter, ai_filter)
    img, // "face_detector"
    slides: 1,
    desc: [],
    urls: [], // [[[git], "https://github.com/cybersaksham/Face-Detector"]]
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