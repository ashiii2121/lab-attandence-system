document.querySelector('.Submit').addEventListener('click', () => {
});

document.querySelector('.GoBack').addEventListener('click', () => {
    window.location.href="http://127.0.0.1:5500/project/labattandence/1.html";
});

function displayTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeText = `${hours}:${minutes}:${seconds}`;
    document.getElementById('time').textContent = timeText;
}
setInterval(displayTime, 1000);
