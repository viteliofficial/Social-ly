// Ensure Firebase is initialized before accessing Firestore
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

function searchVideos() {
  const searchTerm = document.getElementById('searchBar').value.toLowerCase();
  const videoListDiv = document.getElementById('videoList');
  videoListDiv.innerHTML = ''; // Clear previous results

  db.collection("User").get().then((userSnapshot) => {
    let videoCount = 0;

    userSnapshot.forEach((userDoc) => {
      db.collection(`User/${userDoc.id}/video`).get().then((videoSnapshot) => {
        videoSnapshot.forEach((videoDoc) => {
          const data = videoDoc.data();
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
            videoCount++;
          }
        });

        if (videoListDiv.innerHTML === '') {
          videoListDiv.innerHTML = '<p>No videos found.</p>';
        }

        document.getElementById('allvideo_count').textContent = `Total Videos: ${videoCount}`;
      }).catch((error) => {
        console.error("Error getting videos: ", error);
      });
    });
  }).catch((error) => {
    console.error("Error getting users: ", error);
  });
}