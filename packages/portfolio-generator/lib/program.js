"use strict";

const { showError } = require("cybersaksham-npm-logs");
const { program } = require("commander");
const chalk = require("chalk");
const envinfo = require("envinfo");
const packageJson = require("../package.json");

const makeProgram = () => {
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
};

module.exports = { makeProgram };
