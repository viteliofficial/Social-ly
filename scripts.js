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

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Reference to the Firebase storage
    const storage = firebase.storage();
    const videoListElem = document.getElementById('videoList');

    // Function to shuffle an array
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Function to create and append video elements to the DOM
    function createVideoElement(url, name) {
      const videoElem = document.createElement('div');
      videoElem.classList.add('video-item');
      videoElem.innerHTML = `
        <div class="video-thumbnail">
          <video preload="metadata"controls>
            <source src="${url}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="video-info">
          <p>${name}</p> <!-- Display video filename -->
        </div>
      `;
      videoListElem.appendChild(videoElem);
    }

    // Function to fetch and display videos for a specific user
    function fetchUserVideos(userId) {
      const userVideosRef = storage.ref('videos/' + userId + '/');

      userVideosRef.listAll().then(function(result) {
        const shuffledItems = shuffle(result.items);

        shuffledItems.forEach(function(videoRef) {
          videoRef.getDownloadURL().then(function(url) {
            createVideoElement(url, videoRef.name);
          }).catch(function(error) {
            console.error('Error fetching download URL for', videoRef.name, ':', error.message);
          });
        });
      }).catch(function(error) {
        console.error('Error listing videos in storage for user', userId, ':', error.message);
      });
    }

    // Function to fetch and display videos from all users
    function displayAllVideos() {
      const rootRef = storage.ref('videos/');

      rootRef.listAll().then(function(result) {
        result.prefixes.forEach(function(userRef) {
          const userId = userRef.name;
          fetchUserVideos(userId);
        });
      }).catch(function(error) {
        console.error('Error listing user directories in storage:', error.message);
      });
    }

    // Trigger video display when DOM content is loaded
    document.addEventListener('DOMContentLoaded', function() {
      displayAllVideos();
    });
