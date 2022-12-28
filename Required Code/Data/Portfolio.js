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
    slides: 1,
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
    name: "Chess Game",
    filter: generateFilterString(game_filter, desktop_filter),
    img: "chess_game",
    slides: 1,
    desc: [
      "A PvP chess game made in python.",
      "It has almost all functions which we have in original chess game.",
    ],
    urls: [
      [[git], "https://github.com/cybersaksham/Chess-Game"],
      [
        [setup],
        "https://github.com/cybersaksham/Chess-Game/raw/master/setup_chess_game.exe",
      ],
    ],
  },
  {
    name: "Expense Planner",
    filter: generateFilterString(android_filter),
    img: "expense_manager",
    slides: 1,
    desc: [
      "Android app made by flutter to manage your daily expenses in a right way.",
      "You can also see data by charts.",
    ],
    urls: [
      [[git], "https://github.com/cybersaksham/Expense-Manager"],
      [
        [playstore],
        "https://play.google.com/store/apps/details?id=com.cybersaksham.expense_planner",
      ],
    ],
  },
  {
    name: "INC",
    filter: generateFilterString(web_filter, blockchain_filter),
    img: "inc",
    slides: 1,
    desc: [
      "INC(Indian National Coin) is a demo crypto-currency made in motoko.",
      "You can view, transfer & receive INC coins on this website",
    ],
    urls: [[[git], "https://github.com/cybersaksham/INC"]],
  },
  {
    name: "OpenINC",
    filter: generateFilterString(web_filter, blockchain_filter),
    img: "openinc",
    slides: 1,
    desc: [
      "It is an NFT minting and trading platform",
      "You can trade NFTs here using INC coin",
    ],
    urls: [[[git], "https://github.com/cybersaksham/OpenINC"]],
  },
  {
    name: "News Website",
    filter: generateFilterString(web_filter),
    img: "news_website",
    slides: 1,
    desc: [
      "News website made in react js.",
      "Watch latest news in different categories",
    ],
    urls: [[[git], "https://github.com/cybersaksham/React-News-App"]],
  },
  {
    name: "Coffee Stores",
    filter: generateFilterString(web_filter),
    img: "coffee_stores",
    slides: 1,
    desc: [
      "It is a tutorial website to find coffee stores nearby your location.",
      "Made in Next JS and hosted on Vercel.",
      "It is superfast and a high SEO website",
    ],
    urls: [
      [[git], "https://github.com/cybersaksham/Next-Coffee-Store"],
      [[web], "https://next-coffee-stores.cybersaksham.co.in/"],
    ],
  },
  {
    name: "DSA Questions",
    filter: generateFilterString(web_filter),
    img: "dsa_questions",
    slides: 1,
    desc: [
      "It is a website where you can solve Striver sheet while having complete track record of your progress.",
      "Made in React JS and hosted on Vercel.",
      "Data is saved on localhost. Database will be added soon.",
    ],
    urls: [
      [[git], "https://github.com/cybersaksham/DSA-Questions-Website"],
      [[web], "https://dsa-questions.cybersaksham.co.in/"],
    ],
  },
  {
    name: "React iNoteBook",
    filter: generateFilterString(web_filter),
    img: "react-inotebook",
    slides: 1,
    desc: [
      "It is a website where you can create your notes and view them any time.",
      "Made in React JS and backend in Node JS.",
      "Complete data is saved on MongoDB database",
    ],
    urls: [[[git], "https://github.com/cybersaksham/React-iNoteBook"]],
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
