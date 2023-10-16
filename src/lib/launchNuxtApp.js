const { execSync, exec } = require("node:child_process");
const process = require("process");
const path = require("path");

const launchNuxtApp = (folder, projectName) => {
  const dir = path.join(folder, projectName);
  process.chdir(dir);

  exec(`start cmd /k  "dir && pnpm dev -o"`);
};

module.exports = { launchNuxtApp }