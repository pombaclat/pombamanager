
const fs = require("fs").promises;
const path = require("path");

async function downloadPaperJar(version, serverName, event) {
    try {
        const headers = {
            "User-Agent": "PombaManager/0.1 (contact: info@noahpombas.ch)",
            Accept: "application/json",
        };

        const api =
            `https://fill.papermc.io/v3/projects/paper/versions/${version}/builds?channel=STABLE`;

        const response = await fetch(api, { headers });

        if (!response.ok) {
            throw new Error(`Paper API: ${response.status}`);
        }

        const builds = await response.json();

        if (!Array.isArray(builds) || builds.length === 0) {
            throw new Error("No stable Paper build found.");
        }

        const download = builds[0].downloads?.["server:default"];

        if (!download?.url) {
            throw new Error("No server download found.");
        }

        const jarResponse = await fetch(download.url);

        if (!jarResponse.ok) {
            throw new Error(`JAR download failed: ${jarResponse.status}`);
        }

        const folder = path.resolve(
            __dirname,
            "../../../servers",
            serverName
        );

        await fs.mkdir(folder, { recursive: true });

        const jarPath = path.join(folder, "server.jar");

        await fs.writeFile(
            jarPath,
            Buffer.from(await jarResponse.arrayBuffer())
        );

        console.log(`Paper ${version} downloaded to ${jarPath}`);

        event?.reply("createServerResult", {
            success: true,
            path: folder,
        });

        return { success: true, path: folder };
    } catch (error) {
        console.error("Failed to download Paper:", error);

        event?.reply("createServerResult", {
            success: false,
            error: error.message,
        });

        return { success: false, error: error.message };
    }
}

module.exports = {
    downloadPaperJar,
};
