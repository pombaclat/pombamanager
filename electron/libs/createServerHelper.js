const fs = require("fs");
const path = require("path");

const { execSync } = require('child_process')


function createServerFolder(serverName) {
    if (!/^[a-zA-Z0-9_-]+$/.test(serverName)) {
        throw new Error("Invalid server name");
    }

    const folder = path.join(__dirname, "../../servers", serverName);
    fs.mkdirSync(folder, { recursive: true });

    return folder;
}


// * ===============================
// ? get the required java version for a specific minecraft version. 
// * ===============================
function getRequiredJavaVersion(mcVersion) {
    if (mcVersion.startsWith("26")) {
        return 25;
    } else if (mcVersion.startsWith("1.21")) {
        return 21;
    } else if (mcVersion.match(/^1\.(17|18|19|20)/)) { // 1.17, - 1.20
        return 17;
    } else if (mcVersion.match(/^1\.(7|8||9|10|11|12|13|14|15|16)/)) { // 1.7 - 1.16 
        return 8;
    }
    return 'Invalid Version!';
}


// * ===============================
// ? check what version of java is installed 
// * ===============================
function getInstalledJavaVersion() {
    // const installedJavaVersion = ;
    return execSync('java --version').toString().match(/\d+/)[0];
}




function checkJavaInstallations() {
    const fs = require("fs");
    const path = require("path");
    const os = require("os");

    const home = os.homedir();
    const env = process.env;

    const folders = [
        // App-local Java downloads
        path.join(__dirname, "../../../javas"),
        path.join(__dirname, "../../../java"),
        path.join(__dirname, "../../../runtimes"),

        // Environment variables
        env.JAVA_HOME,
        env.JDK_HOME,
        env.JRE_HOME,

        // PATH entries (may contain Java executables directly)
        ...(env.PATH || "").split(path.delimiter),

        // User-level Java managers
        path.join(home, ".jdks"),
        path.join(home, ".sdkman/candidates/java"),
        path.join(home, ".jabba/jdk"),
        path.join(home, ".gradle/jdks"),
        path.join(home, ".local/share/mise/installs/java"),
        path.join(home, ".asdf/installs/java"),

        ...(process.platform === "win32"
            ? [
                // Standard Windows Java locations
                env.ProgramFiles && path.join(env.ProgramFiles, "Java"),
                env["ProgramFiles(x86)"] &&
                path.join(env["ProgramFiles(x86)"], "Java"),
                env.ProgramFiles &&
                path.join(env.ProgramFiles, "Eclipse Adoptium"),
                env.ProgramFiles &&
                path.join(env.ProgramFiles, "Microsoft"),
                env.LOCALAPPDATA && path.join(env.LOCALAPPDATA, "Programs"),
                env.LOCALAPPDATA && path.join(env.LOCALAPPDATA, "Microsoft"),
                env.APPDATA && path.join(env.APPDATA, ".minecraft"),
                env.APPDATA && path.join(env.APPDATA, "PrismLauncher"),
                env.APPDATA && path.join(env.APPDATA, "ATLauncher"),
                env.APPDATA && path.join(env.APPDATA, "Lunar Client"),
                env.APPDATA && path.join(env.APPDATA, ".tlauncher"),
                env.ProgramFiles && path.join(env.ProgramFiles, "Minecraft Launcher"),
                "C:\\Java",
                "C:\\jdk",
                "C:\\jvm",
                "C:\\tools\\java",
            ]
            : []),

        ...(process.platform === "linux"
            ? [
                "/usr/lib/jvm",
                "/usr/java",
                "/opt/java",
                "/opt/jdks",
                "/snap",
                path.join(home, ".minecraft"),
                path.join(home, ".local/share/PrismLauncher"),
                path.join(home, ".var/app"),
            ]
            : []),

        ...(process.platform === "darwin"
            ? [
                "/Library/Java/JavaVirtualMachines",
                path.join(home, "Library/Java/JavaVirtualMachines"),
                "/opt/homebrew/opt",
                "/usr/local/opt",
                path.join(home, "Library/Application Support/minecraft"),
                path.join(home, "Library/Application Support/PrismLauncher"),
            ]
            : []),
    ].filter(Boolean);

    // Remove duplicate paths
    const uniqueFolders = [...new Set(folders.map(p => path.resolve(p)))];

}
module.exports = {
    createServerFolder,
    getRequiredJavaVersion,
    getInstalledJavaVersion,
    checkJavaInstallations,

}