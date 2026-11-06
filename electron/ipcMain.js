const { ipcMain } = require('electron');
const fs = require('fs')
const path = require('path')
// Custom Functions/libs
const { checkJavaInstallations } = require('./libs/createServerHelper');
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
        checkJavaInstallations();
        break;

      default:
        break;
    }
  })

  ipcMain.handle("getServerList", () => {
    // Assumes the servers folder is next to this IPC file.
    const dir = path.join(__dirname, "../servers");

    if (!fs.existsSync(dir)) {
      return [];
    }
    console.log(
      fs.readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    )

    return fs.readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  });

}

module.exports = loadIpcHandler;