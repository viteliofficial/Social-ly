// Simulált adatbázisból származó videók
const videos = [
    { title: "Videó 1", url: "https://www.w3schools.com/html/mov_bbb.mp4", uploader: "Feltöltő 1", uploadDate: "2024-07-12" },
    { title: "Videó 2", url: "https://www.w3schools.com/html/mov_bbb.mp4", uploader: "Feltöltő 2", uploadDate: "2024-07-11" },
    { title: "Videó 3", url: "https://www.w3schools.com/html/mov_bbb.mp4", uploader: "Feltöltő 3", uploadDate: "2024-07-10" },
    { title: "Videó 4", url: "https://www.tiktok.com/@slt_kanzo/video/7389066651632667937", uploader: "Feltöltő 4", uploadDate: "2024-07-09" },
    { title: "Videó 5", url: "https://www.tiktok.com/@bros_and_cons/video/7390271505503931681", uploader: "Feltöltő 5", uploadDate: "2024-07-08" }
];

// HTML elemek létrehozása és hozzáadása
const videoListElem = document.getElementById('videoList');

function createVideoElement(video) {
    const videoElem = document.createElement('div');
    videoElem.classList.add('video-item');
    videoElem.innerHTML = `
        <h3>${video.title}</h3>
        <div class="video-thumbnail">
            <video src="${video.url}" preload="metadata" muted></video>
        </div>
        <div class="video-info">
            <p>${video.uploader}</p>
            <p>Feltöltve: ${video.uploadDate}</p>
            <button class="watch-video">Nézd meg</button>
        </div>
    `;

    // Eseménykezelő a videó lejátszásához
    const videoTag = videoElem.querySelector('video');
    videoTag.addEventListener('mouseover', () => {
        videoTag.play();
    });

    videoTag.addEventListener('mouseout', () => {
        videoTag.pause();
        videoTag.currentTime = 0;
    });

    videoTag.addEventListener('click', () => {
        const videoModal = document.createElement('div');
        videoModal.classList.add('video-modal');
        videoModal.innerHTML = `
            <div class="video-modal-content">
                <span class="close">&times;</span>
                <video src="${video.url}" controls autoplay></video>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>${video.uploader}</p>
                    <p>Feltöltve: ${video.uploadDate}</p>
                </div>
            </div>
        `;
        document.body.appendChild(videoModal);

        // Eseménykezelő a modal bezárásához
        videoModal.querySelector('.close').addEventListener('click', () => {
            document.body.removeChild(videoModal);
        });
    });

    return videoElem;
}

document.addEventListener('DOMContentLoaded', () => {
    videos.forEach(video => {
        const videoElem = createVideoElement(video);
        videoListElem.appendChild(videoElem);
    });

    // Eseménykezelő a startButton kattintásához
    document.getElementById('startButton').addEventListener('click', () => {
        window.location.href = "auth.html";
    });
});
