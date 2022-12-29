const chalk = require("chalk");
const { showError } = require("cybersaksham-npm-logs");
const prompts = require("prompts");
const packageJson = require("../../package.json");

// Validators
const trimmer = (val) => val.trim();
const emptyValidator = (val) => val.trim().length >= 1;
const birthDateChecker = (val) => {
  let currDate = new Date();
  if (val > currDate) return "Birthdate is in future. Welcome Alien!!";
  return true;
};
const minmaxChecker = (val, min = null, max = null) => {
  let value = val;
  let lengthTypes = ["string", "object"];
  if (lengthTypes.indexOf(typeof val) !== -1) value = val.length;
  if (min && value < min) return `Minimum ${min} length required.`;
  if (max && value > max) return `Maximum ${max} length allowed.`;
  return true;
};
const urlValidator = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return "URL must be of form https://www.linkedin.com/in/cybersaksham/";
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
      },
      {
        type: "text",
        name: "instagramLink",
        message: "Instagram profile link?",
        validate: urlValidator,
      },
      {
        type: "text",
        name: "githubLink",
        message: "Github profile link?",
        validate: urlValidator,
      },
      {
        type: "text",
        name: "linkedinLink",
        message: "Linkedin profile link?",
        validate: urlValidator,
      },
      {
        type: "text",
        name: "phone",
        message: "Phone no?",
        validate: (val) => minmaxChecker(val, 1, 15),
      },
      {
        type: "text",
        name: "email",
        message: "Email address?",
        validate: emailValidator,
      },
      {
        type: "text",
        name: "website",
        message: "Portfolio Website?",
        validate: urlValidator,
      },
    ],
    { onCancel }
  );

  return contactData;
};
