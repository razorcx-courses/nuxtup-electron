const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
const path = require("path");

const { session } = require("electron");

//npx tailwindcss -i ./src/renderer/css/input.css -o ./src/renderer/css/output.css --watch
//npx electromon .

const isDev = process.env.NODE_ENV !== "production";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: isDev ? 1024 : 860,
    height: 900,
    maxWidth: 860,
    frame: false,
    webPreferences: {
      nodeIntegration: false, //best security
      contextIsolation: true, //best security
      preload: path.join(__dirname, "preload.js"), //best security
    },
    minimizable: true,
    maximizable: true,
  });

  mainWindow.setPosition(840, 0);
  mainWindow.moveTop();

  // and load the index.html of the app.

  mainWindow.loadFile(path.join(__dirname, "./renderer/renderer.html"));
  // Open the DevTools.
  // if (isDev) mainWindow.webContents.openDevTools();

  const menu = [
    {
      label: "File",
      submenu: [
        {
          label: "Quit",
          click: () => app.exit(),
        },
      ],
    },
  ];

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on("ready", createWindow);

app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  mainWindow.removeAllListeners("close");
  mainWindow.close();
  mainWindow = null;
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
//https://www.digitalocean.com/community/tutorials/how-to-secure-node-js-applications-with-a-content-security-policy

app.on("ready", () => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          `script-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self'; ; frame-src 'self'; `,
        ],
      },
    });
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
const { devDependencies } = require("./lib/devDependencies.js");
const { createNuxtApp } = require("./lib/createNuxtApp.js");

ipcMain.on("loaded", async (event, args) => {
  mainWindow.webContents.send("dependencies", devDependencies);
});

ipcMain.on("minimize", async (event, args) => {
  mainWindow.minimize();
});

ipcMain.on("maximize", async (event, args) => {
  if (mainWindow.isMaximized()) {
    mainWindow.restore();
  } else mainWindow.maximize();
});

ipcMain.on("close", async (event, args) => {
  mainWindow.close();
});

ipcMain.on("dir:select", async (event, args) => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    });

    if (result.filePaths.length > 0)
      mainWindow.webContents.send("dir:selected", result.filePaths);
  } catch (error) {
    console.log(error);
  }
});

// Main process
ipcMain.on("project:create", async (event, args) => {
  try {
    createNuxtApp(mainWindow, args);
  } catch (error) {
    console.log(error);
  }
});
