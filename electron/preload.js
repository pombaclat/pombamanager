const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getAppVersion: () =>
    ipcRenderer.invoke("get-app-version"),

  createServer: (name, description, version, type) =>
    ipcRenderer.send("createServerBtn", name, description, version, type),

  getServerList: () =>
    ipcRenderer.invoke("getServerList"),
});