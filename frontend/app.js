// Server list
document.addEventListener("DOMContentLoaded", async () => {
    const list = document.getElementById("server-list");
    const servers = await window.electronAPI.getServerList();

    list.innerHTML = "";

    servers.forEach((server) => {
        const li = document.createElement("li");
        li.textContent = server;
        list.appendChild(li);
    });
});



// BUTTONS
// BUTTONS
// BUTTONS
// Create Button
const createServerBtn = document.getElementById('btn-create-server')
const createServerModalSubBtn = document.getElementById('createServerModalSubBtn')

createServerBtn.addEventListener('click', () => {
    document.getElementById('createServerModal').style.display = 'block';
})

createServerModalSubBtn.addEventListener('click', () => {
    let name = document.getElementById('createServerName').value;
    let description = document.getElementById('createServerDescription').value;
    let version = document.getElementById('createServerVersion').value;
    let type = document.getElementById('createServerType').value;
    window.electronAPI.createServer(name, description, version, type);
    document.getElementById('createServerModal').style.display = 'none';
})
