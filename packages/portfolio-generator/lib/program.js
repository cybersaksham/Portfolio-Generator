const chalk = require("chalk");
const envinfo = require("envinfo");
const packageJson = require("../package.json");

module.exports.helpFunction = () => {
  // Project Directory
  console.log();
  console.log(`    Only ${chalk.green("<project-directory>")} is required.`);

  // --dummy
  console.log();
  console.log(
    `    Pass the option ${chalk.cyan(
      "--dummy"
    )} to make a dummy portfolio website`
  );
  console.log(
    `      - The website will look like ${chalk.cyan(
      "https://www.cybersaksham.co.in/"
    )}`
  );
  console.log(
    `      - The generated data will be personal data of ${chalk.green(
      "Saksham Bindal (cybersaksham)"
    )}`
  );
  console.log(
    `      - ${chalk.yellow(
      "This data is only for testing purpose. You are not allowed to misuse downloaded data."
    )}`
  );
  console.log(
    `      - You can also watch dummy website on ${chalk.cyan(
      "https://github.com/cybersaksham/Portfolio-Website-NextJS"
    )}`
  );

  // --scripts-version
  console.log();
  console.log(`    A custom ${chalk.cyan("--scripts-version")} can be one of:`);
  console.log(`      - a specific npm version: ${chalk.green("0.8.2")}`);
  console.log(`      - a specific npm tag: ${chalk.green("@next")}`);
  console.log(
    `      - a custom fork published on npm: ${chalk.green("my-react-scripts")}`
  );
  console.log(
    `      - a local path relative to the current working directory: ${chalk.green(
      "file:../my-react-scripts"
    )}`
  );
  console.log(
    `      - a .tgz archive: ${chalk.green(
      "https://mysite.com/my-react-scripts-0.8.2.tgz"
    )}`
  );
  console.log(
    `      - a .tar.gz archive: ${chalk.green(
      "https://mysite.com/my-react-scripts-0.8.2.tar.gz"
    )}`
  );
  console.log(
    `    It is not needed unless you specifically want to use a fork.`
  );

  // Summary
  console.log();
  console.log(
    `    If you have any problems, do not hesitate to file an issue:`
  );
  console.log(`      ${chalk.cyan(packageJson.bugs.url)}`);
  console.log();
};

module.exports.infoFunction = async () => {
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
};
