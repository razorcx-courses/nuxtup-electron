const { initNuxt } = require("./initNuxt");
const { addDependencies } = require("./addDependencies");
const { addPages, addOtherStuff } = require("./addPages");
const { updateNuxtConfig } = require("./updateNuxtConfig");
const { updateTailwindConfig } = require("./updateTailwindConfig");
const { updateApp } = require("./updateApp");
const { updateIndex } = require("./updateIndex");
const { createMoreFiles } = require("./createMoreFiles");
const { launchNuxtApp } = require("./launchNuxtApp");

const createNuxtApp = (mainWindow, args) => {
  try {
    const { projectName, dep, projectDirectory } = args;

    console.log("Project name: ", projectName);
    console.log("Project directory: ", projectDirectory);
    console.log("Project dependencies: ", dep);

    if (!projectName || projectName.length < 1) return;

    mainWindow.webContents.send("status:start", { message: "Initialize Nuxt 3 project", id: "step-one" });
    const projectCreated = initNuxt(projectDirectory, projectName);

    if (projectCreated) {
      mainWindow.webContents.send("status:complete", { message: "Initialize Nuxt 3 project", id: "step-one" });
    } else {
      return;
    }

    mainWindow.webContents.send("status:start", { message: "Add dependencies", id: "step-two" });

    const addedDependencies = addDependencies(
      projectDirectory,
      projectName,
      dep
    );
    if (addedDependencies) {
      mainWindow.webContents.send("status:complete", { message: "Add dependencies", id: "step-two" });
    } else {
      return;
    }

    mainWindow.webContents.send(
      "status:start",
      { message: "Add pages, components and other directories/files", id: "step-three" }
    );

    const addedPages = addPages(projectDirectory, projectName);
    if (addedPages) {
      mainWindow.webContents.send(
        "status:complete",
        { message: "Add pages, components and other directories/files", id: "step-three" }
      );
    } else {
      return;
    }

    mainWindow.webContents.send("status:start", { message: "Add other important stuff", id: "step-four" });

    const addedOtherStuff = addOtherStuff(projectDirectory, projectName);
    if (addedOtherStuff) {
      mainWindow.webContents.send("status:complete", { message: "Add other important stuff", id: "step-four" });
    } else {
      return;
    }

    mainWindow.webContents.send("status:start", { message: "Update nuxt.config", id: "step-five" });

    const updatedNuxtConfig = updateNuxtConfig(
      projectDirectory,
      projectName,
      dep
    );
    if (updatedNuxtConfig) {
      mainWindow.webContents.send("status:complete", { message: "Update nuxt.config", id: "step-five" });
    } else {
      return;
    }

    mainWindow.webContents.send("status:start", { message: "Update tailwind.config", id: "step-six" });

    const updatedTailwindConfig = updateTailwindConfig(
      projectDirectory,
      projectName
    );
    if (updatedTailwindConfig) {
      mainWindow.webContents.send("status:complete", { message: "Update tailwind.config", id: "step-six" });
    } else {
      return;
    }

    mainWindow.webContents.send("status:start", { message: "Update app.vue", id: "step-seven" });

    const updatedApp = updateApp(projectDirectory, projectName);
    if (updatedApp) {
      mainWindow.webContents.send("status:complete", { message: "Update app.vue", id: "step-seven" });
    } else {
      return;
    }

    mainWindow.webContents.send("status:start", { message: "Update index.vue", id: "step-eight" });

    const updatedIndex = updateIndex(projectDirectory, projectName);
    if (updatedIndex) {
      mainWindow.webContents.send("status:complete", { message: "Update index.vue", id: "step-eight" });
    } else {
      return;
    }

    mainWindow.webContents.send("status:start", { message: "Create a few more files", id: "step-nine" });

    const createdMoreFiles = createMoreFiles(projectDirectory, projectName);
    if (createdMoreFiles) {
      mainWindow.webContents.send("status:complete", { message: "Create a few more files", id: "step-nine" });
    } else {
      return;
    }

    mainWindow.webContents.send("status:start", { message: "Launch dev server", id: "step-ten" });

    launchNuxtApp(projectDirectory, projectName);
    mainWindow.webContents.send("status:complete", { message: "Launch dev server", id: "step-ten" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createNuxtApp };
