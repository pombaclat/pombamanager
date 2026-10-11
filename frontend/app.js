const setButton = document.getElementById('btn-create-server')
setButton.addEventListener('click', () => {

window.electronAPI.sendMessage("Hello from the frontend!");
})
