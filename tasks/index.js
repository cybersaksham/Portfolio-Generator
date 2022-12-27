#! /usr/bin/env node

console.log("Welcome to Portfolio Generator!");

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Folder name not given");
  process.exit(1);
}
