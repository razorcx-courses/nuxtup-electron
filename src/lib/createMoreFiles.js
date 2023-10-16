const process = require("process");
const path = require("path");
const fs = require("fs");

const createMoreFiles = (folder, projectName) => {
  try {
    const dir = path.join(folder, projectName);
    process.chdir(dir);

    const dirs = [
      "./assets/css",
      "./assets/images",
      "./plugins",
      "./content/posts",
    ];

    const createDirectories = () => {
      dirs.forEach((d) => {
        fs.mkdirSync(d, { recursive: true }, (err) => {
          console.log("Directory created " + d);
        });
      });
    };

    const createFiles = () => {
      const markdown = `---
title: 'Title of the page'
description: 'meta description of the page'
---

# Title

This is the article content

`;
      fs.writeFileSync("./content/posts/hello-world.md", markdown);

      const gtag = `import VueGtag from "vue-gtag-next";
  import { trackRouter } from "vue-gtag-next";
  
  //https://www.npmjs.com/package/vue-gtag-next
  export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
  property: {
    id: "G-abcdefgh",  //add your gtag id here
  },
  });
  
  const router = nuxtApp.vueApp.$nuxt.$router;
  trackRouter(router);
  });`;

      fs.writeFileSync("./plugins/vue-gtag.client.js", gtag);

      const mainCss = `.page-enter-active,
  .page-leave-active {
  transition: all 0.4s;
  }
  .page-enter-from,
  .page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  }`;
      fs.writeFileSync("./assets/css/main.css", mainCss);

      const tailwindCss = `@tailwind base;
  @tailwind components;
  @tailwind utilities;`;
      fs.writeFileSync("./assets/css/tailwind.css", tailwindCss);

      const envFile = `SUPABASE_URL=""
SUPABASE_KEY=""`;
      fs.writeFileSync("./.env", envFile);
    };

    createDirectories();
    createFiles();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { createMoreFiles };
