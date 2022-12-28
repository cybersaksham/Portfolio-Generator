const semver = require("semver");
const https = require("https");

module.exports.checkNodeVersion = () => {
  return semver.satisfies(semver.coerce(process.version), ">=14");
};

module.exports.checkForLatestVersion = (name) => {
  return new Promise((resolve, reject) => {
    https
      .get(`https://registry.npmjs.org/-/package/${name}/dist-tags`, (res) => {
        if (res.statusCode === 200) {
          let body = "";
          res.on("data", (data) => (body += data));
          res.on("end", () => {
            resolve(JSON.parse(body).latest);
          });
        } else {
          reject();
        }
      })
      .on("error", () => {
        reject();
      });
  });
};
