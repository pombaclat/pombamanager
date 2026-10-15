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
    const { execSync } = require('child_process')
    // const installedJavaVersion = ;
    return execSync('java --version').toString().match(/\d+/)[0];
}


module.exports = {
    getRequiredJavaVersion,
    getInstalledJavaVersion,
}