"use strict";

const https = require("https");
const semver = require("semver");
const { execSync } = require("child_process");
const { showError, showWarning } = require("cybersaksham-npm-logs");
const { program } = require("commander");
const chalk = require("chalk");
const envinfo = require("envinfo");
const packageJson = require("./package.json");

const init = () => {
  let projectName;

  program
    .name(packageJson.name)
    .version(packageJson.version)
    .description(packageJson.description)
    .argument("[project-directory]")
    .usage(`${chalk.green("[project-directory]")} [options]`)
    .action((name) => {
      projectName = name;
    })
    .option("--info", "print environment debug info")
    .allowUnknownOption()
    .on("--help", () => {
      console.log();
      console.log(
        `    Only ${chalk.green("[project-directory]")} is required.`
      );
      console.log();
      console.log(
        `    If you have any problems, do not hesitate to file an issue:`
      );
      console.log(`      ${chalk.cyan(packageJson.bugs.url)}`);
      console.log();
    })
    .parse(process.argv);

  const options = program.opts();

  // Environment information
  if (options.info) {
    console.log(chalk.green("\nEnvironment Info:"));
    console.log(
      `\n  current version of ${packageJson.name}: ${packageJson.version}`
    );
    console.log(`  running from ${chalk.cyan(__dirname)}`);
    return envinfo
      .run(
        {
          System: ["OS", "CPU", "Memory", "Shell"],
          Binaries: ["Node", "npm", "Yarn"],
          Browsers: [
            "Chrome",
            "Firefox",
            "Opera",
            "Edge",
            "Internet Explorer",
            "Safari",
          ],
          npmPackages: ["react", "react-dom", "react-scripts"],
          npmGlobalPackages: [packageJson.name],
        },
        {
          duplicates: true,
          showNotFound: true,
        }
      )
      .then(console.log);
  }

  // If project directory is not given
  if (typeof projectName === "undefined") {
    showError({
      code: 400,
      errors: [
        "Please specify the project directory:",
        `  ${chalk.cyan(program.name())} ${chalk.green("[project-directory]")}`,
        "",
        "For example:",
        `  ${chalk.cyan(program.name())} ${chalk.green("my-portfolio")}`,
      ],
      summary: [
        `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`,
        `Run ${chalk.cyan(
          `${program.name()} --info`
        )} to see environment information.`,
        "",
        `If you have any problems, do not hesitate to file an issue:`,
        `  ${chalk.cyan(packageJson.bugs.url)}`,
      ],
    });
    process.exit(1);
  }

  // We first check the registry directly via the API, and if that fails, we try
  // the slower `npm view [package] version` command.
  //
  // This is important for users in environments where direct access to npm is
  // blocked by a firewall, and packages are provided exclusively via a private
  // registry.
  checkForLatestVersion()
    .catch(() => {
      try {
        return execSync(`npm view ${packageJson.name} version`)
          .toString()
          .trim();
      } catch (e) {
        return null;
      }
    })
    .then((latest) => {
      if (latest && semver.lt(packageJson.version, latest)) {
        showWarning({
          warnings: [
            `You are running \`${packageJson.name}\` ${packageJson.version}, which is behind the latest release (${latest}).`,
            "",
            `We recommend always using the latest version of ${packageJson.name} if possible.`,
          ],
          summary: [
            "The latest instructions for creating a new app can be found here:",
            chalk.cyan(
              "https://portfolio-generator.cybersaksham.co.in/docs/getting-started/"
            ),
          ],
        });
        process.exit(1);
      } else {
      }
    });
};

function checkForLatestVersion() {
  return new Promise((resolve, reject) => {
    https
      .get(
        `https://registry.npmjs.org/-/package/${packageJson.name}/dist-tag`,
        (res) => {
          if (res.statusCode === 200) {
            let body = "";
            res.on("data", (data) => (body += data));
            res.on("end", () => {
              resolve(JSON.parse(body).latest);
            });
          } else {
            reject();
          }
        }
      )
      .on("error", () => {
        reject();
      });
  });
}

module.exports = { init };
