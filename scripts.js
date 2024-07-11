// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBJnSlqLNlVqQ_-U4Cz0KTI0TnopiWwwUU",
    authDomain: "socially-684f7.firebaseapp.com",
    databaseURL: "https://socially-684f7-default-rtdb.firebaseio.com",
    projectId: "socially-684f7",
    storageBucket: "socially-684f7.appspot.com",
    messagingSenderId: "671621318686",
    appId: "1:671621318686:web:1fa7e78755553c7377c60f",
    measurementId: "G-RK1TY34ZPH"
  };
    firebase.initializeApp(firebaseConfig);

    // Initialize variables
    const database = firebase.database();
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

      const videoTag = videoElem.querySelector('video');
      videoTag.addEventListener('mouseover', () => {
        videoTag.play();
      });

      videoTag.addEventListener('mouseout', () => {
        videoTag.pause();
        videoTag.currentTime = 0;
      });

      videoElem.querySelector('.watch-video').addEventListener('click', () => {
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

        videoModal.querySelector('.close').addEventListener('click', () => {
          document.body.removeChild(videoModal);
        });
      });

      return videoElem;
    }

    function displayVideos() {
      database.ref('User').once('value', (snapshot) => {
        snapshot.forEach((userSnapshot) => {
          userSnapshot.child('video').forEach((videoSnapshot) => {
            const videoData = videoSnapshot.val();
            const videoElem = createVideoElement(videoData);
            videoListElem.appendChild(videoElem);
          });
        });
      }, (error) => {
        console.error('Error fetching videos:', error);
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      displayVideos();
    });