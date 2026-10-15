const fs = require('fs')
const path = require('path')
const { ipcMain } = require('electron');
const { execSync } = require('child_process');

// Custom Functions/libs
const { getRequiredJavaVersion, getInstalledJavaVersion } = require('./libs/java');



async function loadIpcHandler() {

  ipcMain.on("createServerBtn", (event, name, description, version, type) => {

    const server = { name, description, version, type };
    const requiredJavaVersion = getRequiredJavaVersion(server.version);
    const installedJavaVersion = getInstalledJavaVersion()

    if (requiredJavaVersion !== installedJavaVersion) {
      console.log('Please install the required java version: ', requiredJavaVersion)
    }



  });
}





module.exports = loadIpcHandler;