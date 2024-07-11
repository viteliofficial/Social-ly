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
    // Fetch user's display name from Users collection
    const userRef = database.ref(`Users/${video.uploadedBy}`);
    return userRef.once('value')
      .then(snapshot => {
        const user = snapshot.val();
        if (user && user.username) {
          const uploadedBy = user.username;
  
          const videoElem = document.createElement('div');
          videoElem.classList.add('video-item');
          videoElem.innerHTML = `
            <h3>${video.description}</h3>
            <div class="video-thumbnail">
              <video controls preload="metadata">
                <source src="${video.downloadURL}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="video-info">
              <p>Uploaded by: ${uploadedBy}</p>
              <p>Uploaded at: ${new Date(video.timestamp).toLocaleString()}</p>
              <button class="watch-video">Watch</button>
            </div>
          `;
  
          videoElem.querySelector('.watch-video').addEventListener('click', () => {
            const videoModal = document.createElement('div');
            videoModal.classList.add('video-modal');
            videoModal.innerHTML = `
              <div class="video-modal-content">
                <span class="close">&times;</span>
                <video controls autoplay>
                  <source src="${video.downloadURL}" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
                <div class="video-info">
                  <h3>${video.description}</h3>
                  <p>Uploaded by: ${uploadedBy}</p>
                  <p>Uploaded at: ${new Date(video.timestamp).toLocaleString()}</p>
                </div>
              </div>
            `;
            document.body.appendChild(videoModal);
  
            videoModal.querySelector('.close').addEventListener('click', () => {
              document.body.removeChild(videoModal);
            });
          });
  
          return videoElem;
        } else {
          console.error(`User ${video.uploadedBy} not found or does not have a display name.`);
          const videoElem = document.createElement('div');
          videoElem.classList.add('video-item');
          videoElem.innerHTML = `
            <h3>${video.description}</h3>
            <div class="video-thumbnail">
              <video controls preload="metadata">
                <source src="${video.downloadURL}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="video-info">
              <p>Uploaded by: Unknown User</p>
              <p>Uploaded at: ${new Date(video.timestamp).toLocaleString()}</p>
              <button class="watch-video">Watch</button>
            </div>
          `;
  
          videoElem.querySelector('.watch-video').addEventListener('click', () => {
            const videoModal = document.createElement('div');
            videoModal.classList.add('video-modal');
            videoModal.innerHTML = `
              <div class="video-modal-content">
                <span class="close">&times;</span>
                <video controls autoplay>
                  <source src="${video.downloadURL}" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
                <div class="video-info">
                  <h3>${video.description}</h3>
                  <p>Uploaded by: Unknown User</p>
                  <p>Uploaded at: ${new Date(video.timestamp).toLocaleString()}</p>
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
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        const videoElem = document.createElement('div');
        videoElem.classList.add('video-item');
        videoElem.innerHTML = `
          <h3>${video.description}</h3>
          <div class="video-thumbnail">
            <video controls preload="metadata">
              <source src="${video.downloadURL}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="video-info">
            <p>Uploaded by: Unknown User</p>
            <p>Uploaded at: ${new Date(video.timestamp).toLocaleString()}</p>
            <button class="watch-video">Watch</button>
          </div>
        `;
  
        videoElem.querySelector('.watch-video').addEventListener('click', () => {
          const videoModal = document.createElement('div');
          videoModal.classList.add('video-modal');
          videoModal.innerHTML = `
            <div class="video-modal-content">
              <span class="close">&times;</span>
              <video controls autoplay>
                <source src="${video.downloadURL}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <div class="video-info">
                <h3>${video.description}</h3>
                <p>Uploaded by: Unknown User</p>
                <p>Uploaded at: ${new Date(video.timestamp).toLocaleString()}</p>
              </div>
            </div>
          `;
          document.body.appendChild(videoModal);
  
          videoModal.querySelector('.close').addEventListener('click', () => {
            document.body.removeChild(videoModal);
          });
        });
  
        return videoElem;
      });
  }
  
  function displayUserVideos(userId) {
    const userVideosRef = database.ref(`User/${userId}/video`);
    userVideosRef.once('value')
      .then(snapshot => {
        snapshot.forEach(videoSnapshot => {
          const videoData = videoSnapshot.val();
          createVideoElement(videoData)
            .then(videoElem => {
              videoListElem.appendChild(videoElem);
            })
            .catch(error => {
              console.error('Error creating video element:', error);
            });
        });
      })
      .catch(error => {
        console.error('Error fetching user videos:', error);
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Ensure user is authenticated
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in, get the user ID
        const userId = user.uid;
        // Display videos for the authenticated user
        displayUserVideos(userId);
      } else {
        // No user is signed in, handle this case if needed
        console.log('No user signed in');
      }
    });
  });