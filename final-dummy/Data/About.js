let currDate = new Date();
let year = currDate.getFullYear() - 2000;
let month = currDate.getMonth() - 1;
let date = currDate.getDate() - 1;

const givenDate = new Date(2000, 1 - 1, 1);
const birthday = givenDate
  .toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  .replace(/ /g, "-");

if (month < 0) year -= 1;
else if (month === 0) {
  if (date < 1) year -= 1;
}

const about = {
  name: "Saksham Bindal",
  about:
    "Full Stack Developer, Flutter App Developer, Blockchain Developer, Competitive Coder, Entrepreneur",
  bio: "Pursuing B. Tech at MNIT Jaipur in Computer Science Branch. 3rd Year Student.",
  longBio:
    "I'm a developer with experience in building full-stack websites for individuals and organizations. I also develop flutter android apps. I am expert in Python, CPP, MERN Stack, Next JS, Flask. I am a competitive coder. I develop Web 3.0 Decentralized apps (DApps) based on blockchain technology & ICP (Internet Computer Protocol)",
  birthday,
  city: "Hindaun, Rajasthan, India",
  age: year,
  degree: "UG",
};

export default about;
