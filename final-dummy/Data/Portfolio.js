// Filters
const game_filter = "filter-game";
const web_filter = "filter-web";
const desktop_filter = "filter-desktop";
const ai_filter = "filter-ai";
const android_filter = "filter-android";
const blockchain_filter = "filter-blockchain";

const filters = [
  game_filter,
  web_filter,
  desktop_filter,
  ai_filter,
  android_filter,
  blockchain_filter,
];

const generateFilterString = (...fils) => {
  return Array.from(fils).join(" ");
};

// URL Types
const git = "Github";
const playstore = "Playstore";
const setup = "Setup";
const web = "Website";

// Category Types
const cat_types = {
  [game_filter]: "Game",
  [web_filter]: "Website",
  [desktop_filter]: "Desktop App",
  [ai_filter]: "Artificial Intelligence",
  [android_filter]: "Android App",
  [blockchain_filter]: "Blockchain",
};

// Projects
const projects = [
  {
    name: "Face Detector",
    filter: generateFilterString(ai_filter, desktop_filter),
    img: "face_detector",
    desc: [
      "It is an AI project to detect your face & eyes either by live webcam, uploaded photo or video.",
      "Made in python using OpenCV.",
    ],
    urls: [
      [[git], "https://github.com/cybersaksham/Face-Detector"],
      [
        [setup],
        "https://github.com/cybersaksham/Face-Detector/raw/master/setup_face_detector.exe",
      ],
    ],
  },
  {
    name: "INC",
    filter: generateFilterString(web_filter, blockchain_filter),
    img: "inc",
    desc: [
      "INC(Indian National Coin) is a demo crypto-currency made in motoko.",
      "You can view, transfer & receive INC coins on this website",
    ],
    urls: [[[git], "https://github.com/cybersaksham/INC"]],
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
