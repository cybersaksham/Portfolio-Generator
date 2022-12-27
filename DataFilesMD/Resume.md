# Resume.js File

- This file contains data of resume of user.
- Those details are as follows.

```txt
├── Education List
│   ├── From
│   ├── Result
│   ├── Time
│   └── Title
├── Exams List
│   ├── Result
│   └── Title
├── Experience List
│   ├── Company
│   ├── Links List
│   ├── Location
│   ├── Points List
│   ├── Time
│   └── Title
└── Skill List
    ├── Items List
    └── Title
```

## Code Structure

```js
const education = [
  {
    title, // "B.Tech Computer Science"
    time, // "2020 - present"
    from, // "Malaviya National Institute of Technology, Rajasthan, India"
    result, // "CGPA: 8.57"
  },
];

const exams = [
  {
    title, // "JEE Mains"
    result, // "AIR: 5126"
  },
];

const skills = [
  {
    title, // "Languages"
    items, // ["Java", "Python"],
  },
];

const experience = [
  {
    title, // "Software Engineer Intern"
    company, // "Atlassian"
    time, // "In summer 2023"
    location, // "Remote + Bangalore"
    points, // ["Developed Rest APIs", "Worked on JIRA"]
    links, // ["https://www.atlassian.com/"]
  },
];

export default { education, exams, skills, experience };
```
