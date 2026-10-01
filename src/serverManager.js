const { spawn } = require("child_process");

let minecraftProcess = null;

function startServer(serverPath) {
    if (minecraftProcess) {
        console.log("Minecraft is already running.");
        return;
    }

    minecraftProcess = spawn(
        "C:\\Program Files\\Eclipse Adoptium\\jdk-25.0.4.101-hotspot\\bin\\java.exe", //* Improve Fixed Paths
        [
            "-Xms1G",
            "-Xmx2G",
            "-jar",
            "server.jar",
            "nogui"
        ],
        {
            cwd: serverPath,
            stdio: ["pipe", "pipe", "pipe"]
        }
    );

    console.log("Minecraft server starting...");
}

function stopServer() {
    if (!minecraftProcess) {
        console.log("Minecraft is not running.");
        return;
    }

    minecraftProcess.stdin.write("stop\n");
    console.log("Stopping Minecraft server...");
}

module.exports = {
    startServer,
    stopServer,
};