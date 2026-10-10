
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("pomba", {
  appName: "PombaManager",
  version: "1.0.0"
});
