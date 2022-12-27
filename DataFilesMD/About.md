# About.js File

- This file contains common details of the user.
- Those details are as follows.

```txt
- Birth Year
- Birth Month
- Birth Date
- Name
- About
- Short Bio
- Long Bio
- City
- Degree
```

## Code Structure

```js
let currDate = new Date();
let year = currDate.getFullYear() - birthYear;
let month = currDate.getMonth() - birthMonth;
let date = currDate.getDate() - birthDate;

if (month < 0) year -= 1;
else if (month === 0) {
  if (date < birthDate) year -= 1;
}

const about = {
  name: name,
  about: about,
  bio: shortBio,
  longBio: longBio,
  birthday: birthday,
  city: city,
  age: year,
  degree: degree,
};

export default about;
```
