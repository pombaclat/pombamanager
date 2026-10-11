const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getAppVersion: () =>
    ipcRenderer.invoke("get-app-version"),

  sendMessage: (message) =>
    ipcRenderer.send("frontend-message", message)
});