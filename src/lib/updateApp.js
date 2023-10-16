const process = require("process");
const path = require("path");
const fs = require("fs");

const updateApp = (folder, projectName) => {
  try {
    const dir = path.join(folder, projectName);
    process.chdir(dir);

    const appFilename = "./app.vue";
    const app = fs.readFileSync(appFilename, { encoding: "utf8", flag: "r" });
    const appReplaced = app.replace(/NuxtWelcome/g, `NuxtPage`);
    fs.writeFileSync(appFilename, appReplaced);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { updateApp };
