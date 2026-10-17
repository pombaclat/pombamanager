
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const loadIpcHandler = require("./ipcMain");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      devTools: false,
      nodeIntegration: true
    },
    icon: path.join(__dirname, "../public/logo.png")
  });
  win.menuBarVisible = false;
  win.loadFile(path.join(__dirname, "../frontend/index.html"));
}

app.whenReady().then(async () => {
  await loadIpcHandler();
  
  createWindow();
});


// Mac Quit
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
