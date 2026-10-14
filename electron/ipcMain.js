const { ipcMain } = require('electron');
const { getRequiredJavaVersion } = require('./libs/java');
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process');



async function loadIpcHandler() {

  ipcMain.on("createServerBtn", (event, name, description, version, type) => {
    const server = { name, description, version, type };
    const requiredJavaVersion = getRequiredJavaVersion(server.version);


    console.log(server)
    console.log(requiredJavaVersion);
  });
}





module.exports = loadIpcHandler;