const express = require("express");
const {
    startServer,
    stopServer,
    createServer,
    deleteServer,
} = require("./serverManager");

const app = express();

app.use(express.json());


app.post("/api/server/create", (req, res) => {
    createServer("MyTestServer", "26.2");
    res.json({ message: "Creating Server"})
})

app.post("/api/server/start", (req, res) => {
    startServer("servers/test");
    res.json({ message: "Server starting" });
});

app.post("/api/server/stop", (req, res) => {
    stopServer();
    res.json({ message: "Server stopping" });
});

app.post("/api/server/stop", (req, res) => {
    stopServer();
    deleteServer();
    res.json({ message: "Server deleted" });
});


app.listen(3000, () => {
    console.log("Manager running on http://localhost:3000");
});

