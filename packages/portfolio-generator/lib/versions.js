const semver = require("semver");

module.exports.checkNodeVersion = () => {
  return semver.satisfies(semver.coerce(process.version), ">=14");
};
