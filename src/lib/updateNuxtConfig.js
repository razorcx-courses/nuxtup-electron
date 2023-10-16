const process = require("process");
const fs = require("fs");
const path = require("path");

const { devDependencies } = require("./devDependencies.js");

const updateNuxtConfig = (folder, projectName, dep) => {
  try {
    const dir = path.join(folder, projectName);
    process.chdir(dir);

    const fileName = "./nuxt.config.ts";
    const data = fs.readFileSync(fileName, { encoding: "utf8", flag: "r" });

    const modules = [];
    devDependencies.forEach((m) => {
      if (dep.includes(m.name.toLowerCase()))
        if (m.module.length > 0) modules.push(`'${m.module}'`);
    });

    const modulesString = modules.join(", ");
    const cssString = '["~/assets/css/main.css", "~/assets/css/tailwind.css"]';
    const appString = `{
pageTransition: { name: "page", mode: "out-in" },
head: {
charset: "utf-16",
viewport: "width=device-width,initial-scale=1",
title:
  "",
meta: [
  {
    name: "description",
    content: "",
  },
],
//https://daisyui.com/docs/themes/
//https://nuxt.com/docs/getting-started/seo-meta
htmlAttrs: {
  ["data-theme"]: "emerald",
  class: "scroll-smooth",
},
link: [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inconsolata&display=swap",
  },
],
},
}`;

    //https://bobbyhadz.com/blog/node-js-replace-string-in-file
    const replaced = data.replace(
      /devtools: { enabled: true }/g,
      `devtools: { enabled: true },
modules: [${modulesString}],
app: ${appString},
css: ${cssString},`
    );

    // https://www.geeksforgeeks.org/node-js-fs-writefilesync-method/
    fs.writeFileSync(fileName, replaced);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { updateNuxtConfig };
