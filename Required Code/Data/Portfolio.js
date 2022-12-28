// Filters
[[filterVariables]];

const filters = [[filterList]];

const generateFilterString = (...fils) => {
  return Array.from(fils).join(" ");
};

// URL Types
[[urlVariables]];

// Category Types
const cat_types = [[catTypes]];

// Projects
const projects = [[projectList]];

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
