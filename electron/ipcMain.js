const { ipcMain } = require('electron');
const fs = require('fs')
// Custom Functions/libs
const { getRequiredJavaVersion, getInstalledJavaVersion, createServerFolder, checkJavaInstallations } = require('./libs/createServerHelper');
const { downloadPaperJar } = require('./libs/serverjars/papermc');



async function loadIpcHandler() {

  ipcMain.on("createServerBtn", (event, name, description, version, type) => {

    const server = { name, description, version, type };
    const requiredJavaVersion = getRequiredJavaVersion(server.version);
    const installedJavaVersion = getInstalledJavaVersion();

    if (requiredJavaVersion !== installedJavaVersion) {
      checkJavaInstallations();
    }

    createServerFolder(name);
    try {
      fs.access(__dirname, '../servers', name);
      console.log("Path exists");
    } catch {
      console.log("Path does not exist or is inaccessible");
    }




    // Download Server Jar file
    switch (type) {
      case 'paper':
        downloadPaperJar(version, name);
        break;

      default:
        break;
    }




  });
}





module.exports = loadIpcHandler;