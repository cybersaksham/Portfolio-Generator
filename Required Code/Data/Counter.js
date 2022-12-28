let currDate = new Date();
let year = currDate.getFullYear() - 2020;

const counterItems = [
  {
    icon: "bi bi-globe",
    count: 50,
    duration: 0.5,
    title: "Websites",
  },
  {
    icon: "bi bi-phone",
    count: 10,
    duration: 0.5,
    title: "Android Apps",
  },
  {
    icon: "bi bi-currency-bitcoin",
    count: 3,
    duration: 0.5,
    title: "Web 3.0 Apps",
  },
  {
    icon: "bi bi-lightbulb-fill",
    count: year,
    duration: 0.5,
    title: "Years of Experience",
  },
];

export default counterItems;
