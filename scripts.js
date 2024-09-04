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

const storage = firebase.storage();
const database = firebase.database();
const videoListElem = document.getElementById('videoList');
const videoCountElem = document.getElementById('allvideo_count');
let videoCount = 0;

// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to create and append video elements to the DOM
function createVideoElement(url, name, description, videoId, userId, likes, views) {
  const videoElem = document.createElement('div');
  videoElem.classList.add('video-item');
  videoElem.innerHTML = `
    <div class="video-thumbnail">
      <video preload="metadata" controls>
        <source src="${url}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="video-info">
      <p>${name}</p>
      <p>${description}</p>
      <p>Likes: <span class="like-count">${likes}</span></p>
      <p>Views: <span class="view-count">${views}</span></p>
      <button class="like-button">Like</button>
    </div>
  `;
  videoListElem.appendChild(videoElem);

  const likeButton = videoElem.querySelector('.like-button');
  const likeCountElem = videoElem.querySelector('.like-count');
  const viewCountElem = videoElem.querySelector('.view-count');
  const videoTag = videoElem.querySelector('video');

  // Increment likes on button click
  likeButton.addEventListener('click', function() {
    const videoRefPath = `videos/${userId}/${videoId}/likes`;
    database.ref(videoRefPath).transaction(function(currentLikes) {
      return (currentLikes || 0) + 1;
    }).then(function(result) {
      likeCountElem.textContent = result.snapshot.val();
    }).catch(function(error) {
      console.error('Error updating likes:', error.message);
    });
  });

  // Increment views when video is played
  videoTag.addEventListener('play', function() {
    const videoRefPath = `videos/${userId}/${videoId}/views`;
    database.ref(videoRefPath).transaction(function(currentViews) {
      return (currentViews || 0) + 1;
    }).then(function(result) {
      viewCountElem.textContent = result.snapshot.val();
    }).catch(function(error) {
      console.error('Error updating views:', error.message);
    });
  });
}

// Function to fetch and display videos for a specific user
function fetchUserVideos(userId) {
  const userVideosRef = storage.ref('videos/' + userId + '/');

  userVideosRef.listAll().then(function(result) {
    const shuffledItems = shuffle(result.items);

    videoCount += result.items.length;
    updateVideoCount();

    shuffledItems.forEach(function(videoRef) {
      const videoId = videoRef.name.split('.')[0];
      const videoRefPath = `videos/${userId}/${videoId}`;

      // Fetch description, likes, and views from Firebase Realtime Database
      database.ref(videoRefPath).once('value').then(function(snapshot) {
        const videoData = snapshot.val() || {};
        const description = videoData.description || '';
        const likes = videoData.likes || 0;
        const views = videoData.views || 0;

        videoRef.getDownloadURL().then(function(url) {
          createVideoElement(url, videoRef.name, description, videoId, userId, likes, views);
        }).catch(function(error) {
          console.error('Error fetching download URL for', videoRef.name, ':', error.message);
        });
      }).catch(function(error) {
        console.error('Error fetching data for', videoRef.name, ':', error.message);
      });
    });
  }).catch(function(error) {
    console.error('Error listing videos in storage for user', userId, ':', error.message);
  });
}

// Function to update the video count in the DOM
function updateVideoCount() {
  if (videoCountElem) {
    videoCountElem.textContent = "Ennyi tartalom van feltöltve: " + videoCount;
  }
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