// Simulált adatbázisból származó videók
const videos = [
    { title: "Videó 1", url: "https://vm.tiktok.com/ZGeG3mUJ4/" },
    { title: "Videó 2", url: "https://vm.tiktok.com/ZGeG3Mwap/" },
    { title: "Videó 3", url: "https://vm.tiktok.com/ZGeG3ut8G/" },
    { title: "Videó 4", url: "https://vm.tiktok.com/ZGeG3FGV7/" },
    { title: "Videó 5", url: "https://vm.tiktok.com/ZGeG39tkh/" }
];

// HTML elemek létrehozása és hozzáadása
const videoListElem = document.getElementById('videoList');

document.getElementById('startButton').addEventListener('click', function() {
    // Véletlenszerűen válasszunk ki egy videót a listából
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideo = videos[randomIndex];

    // Videó elem létrehozása és hozzáadása a listához
    const videoElem = document.createElement('div');
    videoElem.classList.add('video-item');
    videoElem.innerHTML = `<h3>${randomVideo.title}</h3><a href="${randomVideo.url}" target="_blank">Nézd meg</a>`;

    videoListElem.innerHTML = ''; // Előző videók törlése
    videoListElem.appendChild(videoElem);
});// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    startButton.addEventListener("click", () => {
        window.location.href = "auth.html";
    });
});