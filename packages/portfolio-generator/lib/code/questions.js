const chalk = require("chalk");
const path = require("path");
const fs = require("fs-extra");
const { showError } = require("cybersaksham-npm-logs");
const prompts = require("prompts");
const packageJson = require("../../package.json");

// Validators
const trimmer = (val) => val.trim();
const emptyValidator = (val) => String(val).trim().length >= 1;
const birthDateChecker = (val) => {
  let currDate = new Date();
  if (val > currDate) return "Birthdate is in future. Welcome Alien!!";
  return true;
};
const minmaxChecker = (val, min = null, max = null) => {
  let value = val;
  let lengthTypes = ["string", "object"];
  let stringType = lengthTypes.indexOf(typeof val) !== -1;

  let unit = "value";
  if (stringType) {
    value = val.length;
    unit = "length";
  }

  if (min && value < min) return `Minimum ${min} ${unit} required.`;
  if (max && value > max) return `Maximum ${max} ${unit} allowed.`;
  return true;
};
const urlValidator = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return "Enter a valid url with http or https protocols.";
  }
};
const emailValidator = (email) => {
  let result = email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (result) return true;
  else return "Email in invalid.";
};

const applyMultipleValidators = (val, ...validators) => {
  for (let i = 0; i < validators.length; i++) {
    let result = validators[i](val);
    if (typeof result === Boolean && result === true) continue;
    return result;
  }
  return true;
};

const onCancel = (prompt) => {
  showError({
    code: 400,
    errors: [
      "Interactive input is interuppted by user.",
      "The data will not be saved. You have lost the generated data.",
      `Run ${chalk.green(
        "npx portfolio-generator"
      )} again to re-generate data.`,
    ],
    summary: [
      `Run ${chalk.cyan(`${packageJson.name} --help`)} to see all options.`,
      `Run ${chalk.cyan(
        `${packageJson.name} --info`
      )} to see environment information.`,
      "",
      `If you have any problems, do not hesitate to file an issue:`,
      `  ${chalk.cyan(packageJson.bugs.url)}`,
    ],
  });
  process.exit(1);
};

module.exports.aboutQuestions = async (dummy = false) => {
  if (dummy) {
    prompts.inject([
      "Saksham Bindal",
      "Full Stack Developer, Flutter App Developer, Blockchain Developer, Competitive Coder, Entrepreneur",
      "Pursuing B. Tech at MNIT Jaipur in Computer Science Branch. 3rd Year Student.",
      "I'm a developer with experience in building full-stack websites for individuals and organizations. I also develop flutter android apps. I am expert in Python, CPP, MERN Stack, Next JS, Flask. I am a competitive coder. I develop Web 3.0 Decentralized apps (DApps) based on blockchain technology & ICP (Internet Computer Protocol)",
      "2000-01-01T00:00:00.000Z",
      "Hindaun, Rajasthan, India",
      "UG",
    ]);
  }
  // About.js Data
  let aboutData = await prompts(
    [
      {
        type: "text",
        name: "name",
        message: "What is your name?",
        format: trimmer,
        validate: (val) => minmaxChecker(val, 3, 20),
      },
      {
        type: "list",
        separator: ",",
        name: "about",
        message: "Your professions seperated by ','?",
        initial: "Full-Stack Developer, Designer",
        validate: (about) => {
          let arr = Array.from(about.split(",")).map((el) => el.trim());
          for (let i = 0; i < arr.length; i++) {
            const el = arr[i].trim();
            if (!el || el.length < 1) return "Profession cannot be empty.";
            if (arr.slice(0, i).indexOf(arr[i]) >= 0)
              return "Duplicate professions are not allowed";
          }
          return true;
        },
      },
      {
        type: "text",
        name: "shortBio",
        min: 40,
        max: 100,
        message: "Give a one line bio?",
        format: trimmer,
        validate: (val) => minmaxChecker(val, 40, 100),
      },
      {
        type: "text",
        name: "longBio",
        message: "Give a complete bio?",
        format: trimmer,
        validate: (val) => minmaxChecker(val, 125, 400),
      },
      {
        type: "date",
        name: "dob",
        message: "Your birth date?",
        validate: birthDateChecker,
      },
      {
        type: "text",
        name: "city",
        message: "What is your city?",
        format: trimmer,
        validate: (val) => minmaxChecker(val, 3, 40),
      },
      {
        type: "text",
        name: "degree",
        message: "What is your degree?",
        format: trimmer,
        validate: (val) => minmaxChecker(val, 2, 15),
      },
    ],
    { onCancel }
  );

  if (aboutData.dob) {
    // Cleaning up birthdate
    aboutData.dob = new Date(aboutData.dob);
    aboutData.birthDate = aboutData.dob.getDate();
    aboutData.birthMonth = aboutData.dob.getMonth() + 1;
    aboutData.birthYear = aboutData.dob.getFullYear();
    delete aboutData.dob;
  }

  return aboutData;
};

module.exports.contactQuestions = async (dummy = false) => {
  if (dummy) {
    prompts.inject([
      "https://twitter.com/cybersaksham",
      "https://www.instagram.com/saksham.1908",
      "https://github.com/cybersaksham",
      "https://www.linkedin.com/in/cybersaksham/",
      "+91 **********",
      "saksham.bindal2004@gmail.com",
      "https://www.cybersaksham.co.in",
    ]);
  }

  // Contact.js Data
  let contactData = await prompts(
    [
      {
        type: "text",
        name: "twitterLink",
        message: "Twitter profile link?",
        validate: urlValidator,
        format: trimmer,
      },
      {
        type: "text",
        name: "instagramLink",
        message: "Instagram profile link?",
        validate: urlValidator,
        format: trimmer,
      },
      {
        type: "text",
        name: "githubLink",
        message: "Github profile link?",
        validate: urlValidator,
        format: trimmer,
      },
      {
        type: "text",
        name: "linkedinLink",
        message: "Linkedin profile link?",
        validate: urlValidator,
        format: trimmer,
      },
      {
        type: "text",
        name: "phone",
        message: "Phone no?",
        validate: (val) => minmaxChecker(val, 1, 15),
        format: trimmer,
      },
      {
        type: "text",
        name: "email",
        message: "Email address?",
        validate: emailValidator,
        format: trimmer,
      },
      {
        type: "text",
        name: "website",
        message: "Portfolio Website?",
        validate: urlValidator,
        format: trimmer,
      },
    ],
    { onCancel }
  );

  return contactData;
};

module.exports.counterQuestions = async (dummy = false) => {
  if (dummy) {
    prompts.inject([
      4,
      "bi bi-globe",
      50,
      1,
      "Websites",
      "bi bi-phone",
      10,
      1,
      "Android Apps",
      "bi bi-currency-bitcoin",
      3,
      1,
      "Web 3.0 Apps",
      "bi bi-lightbulb-fill",
      "2",
      1,
      "Years of Experience",
    ]);
  }
  // Counter.js Data
  const { itemsCount } = await prompts(
    {
      type: "number",
      name: "itemsCount",
      message: "No of counter items you want to include",
      validate: (val) => minmaxChecker(val, 2, 4),
    },
    { onCancel }
  );

  let items = [];

  for (let i = 0; i < itemsCount; i++) {
    if (!dummy) console.log(`\nEnter data for counter item ${i + 1};`);
    let data = await prompts(
      [
        {
          type: "text",
          name: "icon",
          message: "Bootstrap icon?",
          initial: "bi bi-globe",
          format: trimmer,
        },
        {
          type: "number",
          name: "count",
          message: "Maximum count?",
          validate: emptyValidator,
        },
        {
          type: "number",
          name: "duration",
          message: "Animation Duration?",
          validate: emptyValidator,
        },
        {
          type: "text",
          name: "title",
          message: "Title?",
          validate: (val) => minmaxChecker(val, 3, 15),
          format: trimmer,
        },
      ],
      { onCancel }
    );
    items.push(data);
  }

  return { items };
};

module.exports.portfolioQuestions = async (dummy = false) => {
  if (dummy) {
    prompts.inject([
      6,
      "game_filter",
      "game",
      "web_filter",
      "web",
      "desktop_filter",
      "desktop",
      "ai_filter",
      "ai",
      "android_filter",
      "android",
      "blockchain_filter",
      "blockchain",
      4,
      "git",
      "Github",
      "playstore",
      "Playstore",
      "setup",
      "Setup",
      "web",
      "Website",
      "Game",
      "Website",
      "Desktop App",
      "Artificial Intelligence",
      "Android App",
      "Blockchain",
      2,
      "Face Detector",
      ["ai_filter", "desktop_filter"],
      "face_detector",
      [
        "It is an AI project to detect your face & eyes either by live webcam, uploaded photo or video.",
        "Made in python using OpenCV.",
      ],
      2,
      "git",
      "https://github.com/cybersaksham/Face-Detector",
      "setup",
      "https://github.com/cybersaksham/Face-Detector/raw/master/setup_face_detector.exe",
      "INC",
      ["web_filter", "blockchain_filter"],
      "inc",
      [
        "INC(Indian National Coin) is a demo crypto-currency made in motoko.",
        "You can view, transfer & receive INC coins on this website",
      ],
      1,
      "git",
      "https://github.com/cybersaksham/INC",
    ]);
  }

  // Portfolio.js Data
  let portfolioData = {};

  // filterVariables
  const { filterVariablesLength } = await prompts(
    {
      type: "number",
      name: "filterVariablesLength",
      message: "No of filter variables?",
      initial: 3,
      validate: (val) => minmaxChecker(val, 3, 8),
    },
    { onCancel }
  );
  let filterVariablesList = [];
  for (let i = 0; i < filterVariablesLength; i++) {
    if (!dummy) console.log(`\nEnter data for filter variable ${i + 1}:`);
    let data = await prompts(
      [
        {
          type: "text",
          name: "varibaleName",
          message: "Variable name?",
          initial: `filter_var_${i + 1}`,
          format: trimmer,
          validate: (val) => minmaxChecker(val, null, 30),
        },
        {
          type: "text",
          name: "filterName",
          message: "Filter name?",
          initial: `var${i + 1}`,
          format: (val) => "filter-" + trimmer(val),
          validate: (val) => minmaxChecker(val, null, 10),
        },
      ],
      { onCancel }
    );
    filterVariablesList.push(data);
  }
  let filterVariableStrings = filterVariablesList.map(
    (el) => `const ${el.varibaleName} = "${el.filterName}";`
  );
  portfolioData.filterVariables = filterVariableStrings.join("\n");

  // filterList
  portfolioData.filterList = `[${filterVariablesList
    .map((el) => el.varibaleName)
    .toString()}]`;

  // urlVariables
  if (!dummy) console.log();
  const { urlVariablesLength } = await prompts(
    {
      type: "number",
      name: "urlVariablesLength",
      message: "No of URL variables?",
      initial: 0,
    },
    { onCancel }
  );
  let urlVariablesList = [];
  for (let i = 0; i < urlVariablesLength; i++) {
    if (!dummy) console.log(`\nEnter data for urls variable ${i + 1}:`);
    let data = await prompts(
      [
        {
          type: "text",
          name: "varibaleName",
          message: "Variable name?",
          initial: `url_var_${i + 1}`,
          format: trimmer,
          validate: (val) => minmaxChecker(val, null, 30),
        },
        {
          type: "text",
          name: "urlName",
          message: "URL name?",
          initial: `URL ${i + 1}`,
          format: trimmer,
          validate: (val) => minmaxChecker(val, null, 10),
        },
      ],
      { onCancel }
    );
    urlVariablesList.push(data);
  }
  let urlVariableStrings = urlVariablesList.map(
    (el) => `const ${el.varibaleName} = "${el.urlName}";`
  );
  portfolioData.urlVariables = urlVariableStrings.join("\n");

  // catTypes
  if (!dummy) console.log();
  let catTypesList = [];
  for (let i = 0; i < filterVariablesLength; i++) {
    let { category } = await prompts(
      {
        type: "text",
        name: "category",
        message: `Category name for filter variable ${filterVariablesList[i].varibaleName}?`,
        initial: `Cat ${i + 1}`,
        format: trimmer,
        validate: (val) => minmaxChecker(val, null, 10),
      },
      { onCancel }
    );
    catTypesList.push(
      `[${filterVariablesList[i].varibaleName}]: "${category}"`
    );
  }
  portfolioData.catTypes = `{\n ${catTypesList.join(",\n")} \n}`;

  // projectList
  if (!dummy) console.log();
  const { projectsLength } = await prompts(
    {
      type: "number",
      name: "projectsLength",
      message: "No of projects?",
      initial: 0,
    },
    { onCancel }
  );
  let projectsList = [];
  for (let i = 0; i < projectsLength; i++) {
    if (!dummy) console.log(`\nEnter data for project ${i + 1}:`);
    let data = await prompts(
      [
        {
          type: "text",
          name: "name",
          message: "Project name?",
          initial: `Project ${i + 1}`,
          format: trimmer,
          validate: (val) => minmaxChecker(val, null, 20),
        },
        {
          type: "autocompleteMultiselect",
          name: "filter",
          message: "Select available filters?",
          format: (val) => `generateFilterString(${val.join(", ")})`,
          choices: filterVariablesList.map((el) => {
            return { title: el.varibaleName, value: el.varibaleName };
          }),
        },
        {
          type: "text",
          name: "img",
          message: "Project gallery folder name?",
          initial: `project-${i + 1}`,
          format: trimmer,
          validate: (val) => minmaxChecker(val, null, 20),
        },
        {
          type: "list",
          name: "desc",
          separator: "\\n",
          message: "Description statements (seperated by \\n)?",
          format: (val) => val.filter(emptyValidator).map(trimmer),
        },
      ],
      { onCancel }
    );
    let urls = [];
    if (urlVariablesLength > 0) {
      let { urlsLength } = await prompts(
        {
          type: "number",
          name: "urlsLength",
          message: "No of URLs for the project?",
          initial: 0,
        },
        { onCancel }
      );
      for (let j = 0; j < urlsLength; j++) {
        let urlData = await prompts([
          {
            type: "autocomplete",
            name: "type",
            message: "Select url type?",
            choices: urlVariablesList.map((el) => {
              return { title: el.varibaleName, value: el.varibaleName };
            }),
            validate: emptyValidator,
          },
          {
            type: "text",
            name: "value",
            message: "Required URL?",
            format: trimmer,
            validate: urlValidator,
          },
        ]);
        urls.push(`[[${urlData.type}], "${urlData.value}"]`);
      }
    }
    if (data) {
      data.urls = urls;
      let dataString = "{";
      for (const key in data) {
        if (key === "filter") {
          dataString = dataString.concat(`${key}:${data[key]},`);
        } else if (key === "desc") {
          dataString = dataString.concat(
            `${key}: [ ${data[key].map(JSON.stringify).join(",")} ],`
          );
        } else if (key === "urls") {
          dataString = dataString.concat(`${key}: [ ${data[key].join(",")} ],`);
        } else {
          dataString = dataString.concat(`${key}:"${data[key]}",`);
        }
      }
      dataString = dataString.concat("}");
      projectsList.push(dataString);
    }
  }
  portfolioData.projectList = "[" + projectsList.join(",") + "]";

  return portfolioData;
};

module.exports.skillsQuestions = async (dummy = false) => {
  if (dummy) {
    prompts.inject([
      14,
      "Python",
      95,
      "React",
      95,
      "Next",
      90,
      "Flask",
      92,
      "HTML",
      85,
      "Blockchain",
      80,
      "Bootstrap",
      80,
      "Javascript",
      80,
      "C++",
      80,
      "Flutter",
      80,
      "C",
      75,
      "Java",
      75,
      "Machine Learning",
      70,
      "Artificial Intelligence",
      70,
    ]);
  }

  // Skill.js
  let skillData = {};

  // skillList
  let { skillLength } = await prompts(
    {
      type: "number",
      name: "skillLength",
      message: "Number of skills?",
      initial: 0,
    },
    { onCancel }
  );
  let skillsList = [];
  for (let i = 0; i < skillLength; i++) {
    if (!dummy) console.log(`\nEnter data for skill ${i + 1}:`);
    let data = await prompts(
      [
        {
          type: "text",
          name: "title",
          message: "Skill name?",
          format: trimmer,
          validate: (val) => minmaxChecker(val, 1, 30),
        },
        {
          type: "number",
          name: "value",
          message: "Value out of 100?",
          initial: 0,
          validate: (val) => minmaxChecker(val, 0, 100),
        },
      ],
      { onCancel }
    );
    skillsList.push(data);
  }
  skillData.skillList = skillsList;

  return skillData;
};

module.exports.resumeQuestions = async (dummy = false) => {
  if (dummy) {
    prompts.inject([
      3,
      "B.Tech Computer Science",
      "2020 - present",
      "Malaviya National Institute of Technology, Rajasthan, India",
      "CGPA: 8.57",
      "Senior Secondary (XII)",
      "2019 - 20",
      "Nirmal Happy Sr. Sec. School, Hindaun, Rajasthan, India",
      "Percentage: 91.20",
      "Secondary (X)",
      "2017 - 18",
      "DS Science Academy, Gangapur, Rajasthan, India",
      "Percentage: 96.00",
      3,
      "JEE Mains",
      "AIR: 5126",
      "JEE Advanced",
      "AIR: 3086",
      "KVPY",
      "AIR: 1403",
      4,
      "Languages",
      [
        "Java",
        "Python",
        "C",
        "CPP",
        "Motoko",
        "Javascript",
        "Dart",
        "Scheme",
        "Assmebly",
      ],
      "Platforms",
      [
        "Unix",
        "Git",
        "Android Studio",
        "Flutter",
        "AWS",
        "Firebase",
        "Vercel",
        "Postmam",
        "Playstore",
      ],
      "Frameworks",
      ["React JS", "Next JS", "Flask", "Node JS"],
      "Databases",
      ["MongoDB", "MySql", "SQLAlchemy", "Firestore", "Airtable"],
      5,
      "Software Engineer Intern",
      "Atlassian",
      "In summer 2023",
      "Remote + Bangalore",
      0,
      0,
      "Maths Expert",
      "Chegg Inc.",
      "Nov 2022 - Present",
      "Remote",
      2,
      "Basic maths expert at Chegg Inc.",
      "Solve math questions daily.",
      0,
      "Flutter App Developer",
      "Urban Culture",
      "Apr 2022 - May 2022",
      "Remote",
      3,
      "Leader of website team at Urban Culture.",
      "Developed Rest APIs.",
      "Worked on client android app & admin panel in flutter.",
      0,
      "Web Developer",
      "YouthFest MNIT Jaipur",
      "Dec 2021 - Jan 2022",
      "Remote",
      3,
      "Created a website for MNIT YouthFest 2022",
      "Leader of team of 6 people",
      "Frontend in React JS & Backend in Node JS, MongoDB",
      1,
      "https://www.mnityouthfest.in/",
      "Web Developer & Incharge",
      "Think India MNIT",
      "Nov 2021 - Oct 2022",
      "Jaipur, IN",
      2,
      "Incharge of Coding team at Think India MNIT.",
      "We work on different projects like app development, web development.",
      0,
    ]);
  }

  // Resume.js
  let resumeData = {};

  // educationList
  let { educationLength } = await prompts(
    {
      type: "number",
      name: "educationLength",
      message: "Number of education items?",
      initial: 0,
    },
    { onCancel }
  );
  let educationList = [];
  for (let i = 0; i < educationLength; i++) {
    if (!dummy) console.log(`\nEnter data for education item ${i + 1}:`);
    let data = await prompts(
      [
        {
          type: "text",
          name: "title",
          message: "Education title?",
          format: trimmer,
          validate: (val) => minmaxChecker(val, 1, 30),
        },
        {
          type: "text",
          name: "time",
          message: "Education time?",
          format: trimmer,
          validate: (val) => minmaxChecker(val, 1, 30),
        },
        {
          type: "text",
          name: "from",
          message: "School/College/University name?",
          format: trimmer,
          validate: (val) => minmaxChecker(val, 1, 75),
        },
        {
          type: "text",
          name: "result",
          message: "Education result?",
          format: trimmer,
          validate: (val) => minmaxChecker(val, 1, 30),
        },
      ],
      { onCancel }
    );
    educationList.push(data);
  }
  resumeData.educationList = educationList;

  // examList
  if (!dummy) console.log();
  let { examLength } = await prompts(
    {
      type: "number",
      name: "examLength",
      message: "Number of exam items?",
      initial: 0,
    },
    { onCancel }
  );
  let examList = [];
  for (let i = 0; i < examLength; i++) {
    if (!dummy) console.log(`\nEnter data for exam item ${i + 1}:`);
    let data = await prompts(
      [
        {
          type: "text",
          name: "title",
          message: "Exam title?",
          format: trimmer,
          validate: (val) => minmaxChecker(val, 1, 30),
        },
        {
          type: "text",
          name: "result",
          message: "Exam result?",
          format: trimmer,
          validate: (val) => minmaxChecker(val, 1, 30),
        },
      ],
      { onCancel }
    );
    examList.push(data);
  }
  resumeData.examList = examList;

  // skillList
  if (!dummy) console.log();
  let { skillsLength } = await prompts(
    {
      type: "number",
      name: "skillsLength",
      message: "Number of skill items?",
      initial: 0,
    },
    { onCancel }
  );
  let skillsList = [];
  for (let i = 0; i < skillsLength; i++) {
    if (!dummy) console.log(`\nEnter data for skill item ${i + 1}:`);
    let data = await prompts(
      [
        {
          type: "text",
          name: "title",
          message: "Skill type?",
          format: trimmer,
          validate: (val) => minmaxChecker(val, 1, 15),
        },
        {
          type: "list",
          name: "items",
          message: "Skill items (seperated by comma)?",
          format: (val) => val.filter(emptyValidator).map(trimmer),
        },
      ],
      { onCancel }
    );
    skillsList.push(data);
  }
  resumeData.skillList = skillsList;

  // experienceList
  if (!dummy) console.log();
  let { experienceLength } = await prompts(
    {
      type: "number",
      name: "experienceLength",
      message: "Number of experience items?",
      initial: 0,
    },
    { onCancel }
  );
  let experienceList = [];
  for (let i = 0; i < experienceLength; i++) {
    if (!dummy) console.log(`\nEnter data for experience item ${i + 1}:`);
    let data = await prompts(
      [
        {
          type: "text",
          name: "title",
          message: "Experience title?",
          format: trimmer,
          validate: (val) => minmaxChecker(val, 1, 30),
        },
        {
          type: "text",
          name: "company",
          message: "Company name?",
          format: trimmer,
          validate: (val) => minmaxChecker(val, 1, 30),
        },
        {
          type: "text",
          name: "time",
          message: "Experience time?",
          format: trimmer,
          validate: (val) => minmaxChecker(val, 1, 30),
        },
        {
          type: "text",
          name: "location",
          message: "Experience location?",
          format: trimmer,
          validate: (val) => minmaxChecker(val, 1, 20),
        },
      ],
      { onCancel }
    );
    let { pointCount } = await prompts(
      {
        type: "number",
        name: "pointCount",
        message: "Number of description statements?",
        initial: 0,
      },
      { onCancel }
    );
    let points = [];
    for (let j = 0; j < pointCount; j++) {
      let { pointData } = await prompts(
        {
          type: "text",
          name: "pointData",
          message: `Description statement ${j + 1}?`,
          format: trimmer,
          validate: (val) => minmaxChecker(val, 10, 100),
        },
        { onCancel }
      );
      points.push(pointData);
    }
    let { linksCount } = await prompts(
      {
        type: "number",
        name: "linksCount",
        message: "Number of urls releated to experience?",
        initial: 0,
      },
      { onCancel }
    );
    let links = [];
    for (let j = 0; j < linksCount; j++) {
      let { linkData } = await prompts(
        {
          type: "text",
          name: "linkData",
          message: `Related URL ${j + 1}?`,
          format: trimmer,
          validate: urlValidator,
        },
        { onCancel }
      );
      links.push(linkData);
    }
    if (data) {
      data.points = points;
      data.links = links;
      experienceList.push(data);
    }
  }
  resumeData.experienceList = experienceList;

  return resumeData;
};

module.exports.manifestQuestions = async (dummy = false) => {
  if (dummy) {
    prompts.inject([
      "cybersaksham",
      "Saksham Bindal",
      "Portfolio website of Saksham Bindal",
    ]);
  }

  // manifest.json
  const manifestData = await prompts(
    [
      {
        type: "text",
        name: "author",
        message: "Author name/username?",
        format: trimmer,
        validate: emptyValidator,
      },
      {
        type: "text",
        name: "shortName",
        message: "Short name for website?",
        format: trimmer,
        validate: (val) => minmaxChecker(val, 5, 30),
      },
      {
        type: "text",
        name: "name",
        message: "Long name for website?",
        format: trimmer,
        validate: (val) => minmaxChecker(val, 10, 100),
      },
    ],
    { onCancel }
  );

  return manifestData;
};

module.exports.imagesQuestions = async (filename, extension, message = "") => {
  const { image } = await prompts(
    {
      type: "text",
      name: "image",
      message: `${
        message && message.length > 0 ? message + " " : ""
      }Provide absolute path of ${filename}?`,
      validate: (val) => {
        let filepath = path.resolve(val);
        try {
          fs.readFileSync(filepath);
          if (path.extname(filepath) !== extension) {
            return `File is not in ${extension} format`;
          }
          return true;
        } catch (e) {
          return "File not present";
        }
      },
    },
    { onCancel }
  );
  return image;
};
