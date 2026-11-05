







// Server list
document.addEventListener("DOMContentLoaded", async () => {
    const list = document.querySelector(".server-list");
    const servers = await window.electronAPI.getServerList();

    list.innerHTML = "";

    servers.forEach((server) => {
        const li = document.createElement("li");
        li.textContent = server;
        list.appendChild(li);

        const card = document.createElement("div");
        card.className = "card-server";
        li.appendChild(card);

        const button = document.createElement("button");
        button.className =+ "btn-primary"
        button.className =+ "btn-open-server"
        button.textContent = "Open Server"
        card.appendChild(button);

        button.addEventListener("click", () => {
            openPage('server', server);
        })
    });
});


// Create Button
const createServerBtn = document.getElementById('btn-create-server')
const createServerModalSubBtn = document.getElementById('createServerModalSubBtn')

createServerBtn.addEventListener('click', () => {
    document.getElementById('createServerModal').style.display = 'grid';
})

createServerModalSubBtn.addEventListener('click', () => {
    let name = document.getElementById('createServerName').value;
    let description = document.getElementById('createServerDescription').value;
    let version = document.getElementById('createServerVersion').value;
    let type = document.getElementById('createServerType').value;
    window.electronAPI.createServer(name, description, version, type);
    document.getElementById('createServerModal').style.display = 'none';
})


function openPage(page, server) {
    if (page == null) console.log('Page is required');
    if (server == null) console.log('Invalid Server');

    alert(`Page: ${page} | Server: ${server}`);
}