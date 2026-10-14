function getRequiredJavaVersion(mcVersion) {
    if (mcVersion.startsWith("26.") || mcVersion.startsWith("1.22")) {
        return 25; 
    } else if (mcVersion.startsWith("1.21") || mcVersion === "1.20.5" || mcVersion === "1.20.6") {
        return 21; 
    } else if (mcVersion.startsWith("1.18") || mcVersion.startsWith("1.19") || mcVersion.startsWith("1.20")) {
        return 17; 
    } else if (mcVersion.startsWith("1.17")) {
        return 16;
    } else if (mcVersion.match(/^1\.(12|13|14|15|16)/)) {
        return 8; 
    }
    return 8;
}


module.exports = {
    getRequiredJavaVersion
}