let currDate = new Date();
let year = currDate.getFullYear() - [[birthYear]];
let month = currDate.getMonth() - [[birthMonth]];
let date = currDate.getDate() - [[birthDate]];

const givenDate = new Date([[birthYear]], [[birthMonth]] - 1, [[birthDate]]);
const birthday = givenDate
  .toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  .replace(/ /g, "-");

if (month < 0) year -= 1;
else if (month === 0) {
  if (date < 19) year -= 1;
}

const about = {
  name: "[[name]]",
  about: "[[about]]",
  bio: "[[shortBio]]",
  longBio: "[[longBio]]",
  birthday,
  city: "[[city]]",
  age: year,
  degree: "[[degree]]",
};

export default about;
