"use strict";

const semver = require("semver");
const { execSync, exec } = require("child_process");
const { showError, showWarning } = require("cybersaksham-npm-logs");
const { program } = require("commander");
const chalk = require("chalk");
const packageJson = require("./package.json");
const { helpFunction, infoFunction } = require("./lib/program");
const { checkForLatestVersion } = require("./lib/versions");
const { createApp } = require("./lib/generator");
const path = require("path");
const spawn = require("cross-spawn");

module.exports.init = async () => {
  let projectName;

  program
    .name(packageJson.name)
    .version(packageJson.version)
    .description(packageJson.description)
    .argument("[project-directory]")
    .usage(`${chalk.green("<project-directory>")} [options]`)
    .action((name) => {
      projectName = name;
    })
    .option("--dummy", "make a dummy portfolio website")
    .option("--info", "print environment debug info")
    .option(
      "--scripts-version <alternative-package>",
      "use a non-standard version of react-scripts"
    )
    .allowUnknownOption()
    .on("--help", helpFunction)
    .parse(process.argv);

  const options = program.opts();

  // Environment information
  if (options.info) {
    return infoFunction();
  }

  // If project directory is not given
  if (typeof projectName === "undefined") {
    showError({
      code: 400,
      errors: [
        "Please specify the project directory:",
        `  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`,
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
  let latest;
  try {
    latest = await checkForLatestVersion(packageJson.name);
  } catch (e) {
    try {
      return execSync(`npm view ${packageJson.name} version`).toString().trim();
    } catch (e) {
      console.error("Unknown error occurred");
      process.exit(1);
    }
  }

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
    if (options.dummy) {
      showWarning({
        warnings: [
          `You are building with ${chalk.green("--dummy")} option.`,
          `  - The website will look like ${chalk.cyan(
            "https://www.cybersaksham.co.in/"
          )}`,
          `  - The generated data will be personal data of ${chalk.green(
            "Saksham Bindal (cybersaksham)"
          )}`,
          "",
          "  - This data is only for testing purpose. You are not allowed to misuse downloaded data.",
          "  - You are not allowed to distribute or publish this data.",
          "",
          `  - You can also watch dummy website on:`,
          `      ${chalk.cyan(
            "https://github.com/cybersaksham/Portfolio-Website-NextJS"
          )}`,
          `      ${chalk.cyan("https://www.cybersaksham.co.in/")}`,
        ],
      });
      console.log();
    }
    await createApp(projectName, options.scriptsVersion, options.dummy);

    // Run npm install
    try {
      await installPackages(projectName);
    } catch (e) {
      console.log();
      showWarning({
        warnings: [
          "Errors occurred while executing the command:",
          `  ${chalk.green(e.command)}`,
        ],
        summary: [
          `Although project is downloaded in directory ${chalk.green(
            path.resolve(projectName)
          )}`,
          "",
          "You can install package manually.",
          `If you have any problems, do not hesitate to file an issue:`,
          `  ${chalk.cyan(packageJson.bugs.url)}`,
        ],
      });
      console.log();
    }

    console.log(
      `\nSuccess! Created ${chalk.green(projectName)} at ${chalk.cyan(
        path.resolve(projectName)
      )}`
    );
    console.log(`Inside that directory, you can run several commands:\n`);

    const scripts = [
      {
        script: "npm run dev",
        description: [
          `Starts the development server.`,
          `By defualt server is started at ${chalk.cyan(
            "http://localhost:3000"
          )}`,
        ],
      },
      {
        script: "npm run build",
        description: [`Bundles the app into static files for production.`],
      },
      {
        script: "npm run start",
        description: [
          `Starts the production build made by ${chalk.green(
            "npm run build"
          )}.`,
          `By defualt server is started at ${chalk.cyan(
            "http://localhost:3000"
          )}`,
        ],
      },
    ];
    scripts.forEach((script) => {
      console.log(`  ${chalk.cyan(script.script)}`);
      script.description.forEach((desc) => {
        console.log(`    ${desc}`);
      });
      console.log();
    });

    console.log(`We suggest that you begin by typing:\n`);
    console.log(`  ${chalk.cyan("cd")} ${projectName}`);
    console.log(`  ${chalk.cyan("npm run dev")}`);

    console.log("\nHappy hacking!");
  }
};

const installPackages = (projectName) => {
  return new Promise((resolve, reject) => {
    console.log("Installing packages. This might take a couple of minutes.\n");
    let command = "npm";
    let args = ["install", "--loglevel", "error"];
    const child = spawn(command, args, {
      cwd: path.resolve(projectName),
      stdio: "inherit",
    });
    child.on("close", (code) => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(" ")}`,
          code,
        });
        return;
      }
      resolve();
    });
  });
};
