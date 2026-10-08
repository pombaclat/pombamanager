const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

let minecraftProcess = null;




async function createServer(name, version) {
    const dir = `servers/${name}`;
    const file = `server-${version.replaceAll(".", "")}.jar`;
    const path = `${dir}/${file}`;

    fs.mkdirSync(dir, { recursive: true });

    // Remove old server
    fs.readdirSync(dir).forEach(oldFile => {
        if (oldFile.startsWith("server-") && oldFile !== file)
            fs.rmSync(`${dir}/${oldFile}`);
    });

    console.log("Checking if file exists!");

    if (fs.existsSync(path)) {
        console.log("File exists!");
        startServer(path);
        return;
    }

    const res = await fetch(
        `https://fill.papermc.io/v3/projects/paper/versions/${version}/builds/latest`
    );

    const { downloads } = await res.json();
    const jar = await fetch(downloads["server:default"].url);

    fs.writeFileSync(path, Buffer.from(await jar.arrayBuffer()));

    console.log(`Downloaded ${file}`);
    startServer(path);
}





function startServer(serverPath) {
    const dir = path.dirname(serverPath);
    const jar = path.basename(serverPath);

    console.log("Minecraft server starting...");

    const server = spawn("java", [
        "-Xms1G",
        "-Xmx2G",
        "-jar",
        jar,
        "nogui"
    ], {
        cwd: dir,
        stdio: "inherit"
    });

    server.on("error", console.error);
}

function stopServer() {
    if (!minecraftProcess) {
        console.log("Minecraft is not running.");
        return;
    }

    minecraftProcess.stdin.write("stop\n");
    console.log("Stopping Minecraft server...");
}

function deleteServer() {
    
    console.log("Deleting Minecraft server...");
}

module.exports = {
    startServer,
    stopServer,
    createServer,
    deleteServer,
};