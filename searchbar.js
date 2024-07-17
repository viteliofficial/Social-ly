// searchbar.js

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

// Ensure Firebase is initialized before accessing Firestore
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

function searchVideos() {
  const searchTerm = document.getElementById('searchBar').value.toLowerCase();
  const videoListDiv = document.getElementById('videoList');
  videoListDiv.innerHTML = ''; // Clear previous results

  db.collection("videos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const description = data.description.toLowerCase();

      if (description.includes(searchTerm)) {
        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
          <h3>${data.title}</h3>
          <p>${data.description}</p>
          <video controls>
            <source src="${data.videoUrl}" type="video/mp4">
          </video>
        `;
        videoListDiv.appendChild(videoElement);
      }
    });

    if (videoListDiv.innerHTML === '') {
      videoListDiv.innerHTML = '<p>No videos found.</p>';
    }
  }).catch((error) => {
    console.error("Error searching videos: ", error);
  });
}
