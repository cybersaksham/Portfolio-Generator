const { showWarning } = require("cybersaksham-npm-logs");
const { checkNodeVersion } = require("./versions");

module.exports.createApp = (name, version) => {
  if (!checkNodeVersion()) {
    showWarning({
      warnings: [
        `You are using Node ${process.version} so the project will be bootstrapped with an old unsupported version of tools.`,
        `Please update to Node 14 or higher for a better, fully supported experience.`,
      ],
      summary: ["Falling to react scripts version react-scripts@0.9.x"],
    });
    // Fall back to latest supported react-scripts on Node 4
    version = "react-scripts@0.9.x";
  }
};
