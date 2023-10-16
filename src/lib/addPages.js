const { execSync } = require("node:child_process");
const process = require("process");
const path = require("path");

const addPages = (folder, projectName) => {
  try {
    const dir = path.join(folder, projectName);
    process.chdir(dir);

    const pages = [
      "--force page index",
      'page "product/[id]"',
      "page products",
      'page "category/[id]"',
      "page about",
      "page contact",
      "page auth",
    ];

    const addPages = () => {
      pages.forEach((p) => {
        execSync(`npx nuxi add ${p}`);
      });
    };

    let commands = "";

    pages.forEach((p) => {
      commands += `npx nuxi add ${p} && `;
    });

    commands += " exit";

    const command = `start cmd /k "${commands}"`;

    execSync(command);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addOtherStuff = (folder, projectName) => {
  try {
    const dir = path.join(folder, projectName);
    process.chdir(dir);

    const others = [
      "middleware auth",
      "plugin analytics",
      "layout default",
      "layout custom",
      "composable useAppState",
      "component TheHeader",
      "component TheHero",
      "component TheFeature",
      "component TheCta",
      "component TheFooter",
      "api products.get",
      `api "product/[id].get"`,
    ];

    let commands = "";

    others.forEach((p) => {
      commands += `npx nuxi add ${p} && `;
    });

    commands += " exit";

    const command = `start cmd /k "${commands}"`;

    execSync(command);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { addPages, addOtherStuff };
