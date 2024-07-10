// Simulált adatbázisból származó videók
const videos = [
    { title: "Videó 1", url: "https://www.example.com/video1" },
    { title: "Videó 2", url: "https://www.example.com/video2" },
    { title: "Videó 3", url: "https://www.example.com/video3" },
    { title: "Videó 4", url: "https://www.example.com/video4" },
    { title: "Videó 5", url: "https://www.example.com/video5" }
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