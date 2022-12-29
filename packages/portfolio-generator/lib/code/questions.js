const chalk = require("chalk");
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

  let unit = "items";
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
      `[${filterVariablesList[i].varibaleName}]: "${category}";`
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
          format: (val) =>
            "[" + val.filter(emptyValidator).map(trimmer).join("\n") + "]",
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
      data.urls = "[" + urls.join(",\n") + "]";
      projectsList.push(data);
    }
  }
  portfolioData.projectList = projectsList;

  return portfolioData;
};
