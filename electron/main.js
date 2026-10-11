
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      devTools: false,
      nodeIntegration: true
    }
  });
  // win.menuBarVisible = false;
  win.loadFile(path.join(__dirname, "../frontend/index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.on("frontend-message", (event, message) => {
  console.log("Message from webpage:", message);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
