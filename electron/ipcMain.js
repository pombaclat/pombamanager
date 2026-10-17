const { ipcMain } = require('electron');
const fs = require('fs')
// Custom Functions/libs
const { getRequiredJavaVersion, getInstalledJavaVersion, createServerFolder, checkJavaInstallations } = require('./libs/createServerHelper');
const { downloadPaperJar } = require('./libs/serverjars/papermc');



async function loadIpcHandler() {
  ipcMain.on("createServerBtn", (event, name, description, version, type) => {
    const server = { name, description, version, type };

    if (server.name == "") return;
    if (server.version == "") return;
    if (server.type == "") return;

    switch (server.type) {
      case 'paper':
        downloadPaperJar(server.version, server.name);
        break;

      default:
        break;
    }

    const requiredJavaVersion = getRequiredJavaVersion(server.version);
    const installedJavaVersion = getInstalledJavaVersion();

    if (requiredJavaVersion !== installedJavaVersion) {
      checkJavaInstallations();
    }

    createServerFolder(server.name);
    try {
      fs.access(__dirname, '../servers', server.name);
      console.log("Path exists");
    } catch {
      console.log("Path does not exist or is inaccessible");
      return;
    }




    // Download Server Jar file





  });
}





module.exports = loadIpcHandler;