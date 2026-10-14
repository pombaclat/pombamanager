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
