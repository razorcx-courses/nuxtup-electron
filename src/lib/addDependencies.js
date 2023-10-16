const { execSync } = require("node:child_process");
const process = require("process");
const path = require("path");

const { devDependencies } = require("./devDependencies.js");

const addDependencies = (folder, projectName, dep) => {
  try {
    const dir = path.join(folder, projectName);
    process.chdir(dir);

    let dependencies = "";
    devDependencies.forEach((d) => {
      if (dep.includes(d.name.toLowerCase())) dependencies += ` ${d.package}`;
    });

    const command = `start cmd /k "pnpm i -D ${dependencies} && exit"`;
    execSync(command);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { addDependencies };
