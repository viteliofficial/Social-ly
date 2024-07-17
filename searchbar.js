// searchbar.js

// Initialize Firebase

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
      videoListDiv.innerHTML = '<p>Nincs találat.</p>';
    }
  }).catch((error) => {
    console.error("Error searching videos: ", error);
  });
}
