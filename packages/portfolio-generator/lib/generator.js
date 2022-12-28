const { showWarning, showError } = require("cybersaksham-npm-logs");
const validateProjectName = require("validate-npm-package-name");
const { checkNodeVersion } = require("./versions");
const path = require("path");
const chalk = require("chalk");

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

  const root = path.resolve(name);
  const appName = path.basename(root);
  checkAppName(appName);
};

const checkAppName = (appName) => {
  const validationResult = validateProjectName(appName);
  if (!validationResult.validForNewPackages) {
    // Show Errors
    let errors = [
      `Cannot create a project named ${chalk.green(
        `"${appName}"`
      )} because of npm naming restrictions:`,
    ];
    let validationErrors = [
      ...(validationResult.errors || []),
      ...(validationResult.warnings || []),
    ];
    if (validationErrors.length > 0) {
      errors.push("Found errors are:");
      validationErrors.forEach((err) => {
        errors.push(chalk.red(`  *${err}`));
      });
    }
    showError({
      code: 400,
      errors,
      summary: ["Please choose a different project name."],
    });

    process.exit(1);
  }
};
