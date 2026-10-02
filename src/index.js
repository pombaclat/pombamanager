const express = require("express");
const {
    startServer,
    stopServer,
    createServer
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



app.listen(3000, () => {
    console.log("Manager running on http://localhost:3000");
});