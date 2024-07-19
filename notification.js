// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// Function to show notification
function showNotification(videoInfo) {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
    return;
  }

  // Check if notification permissions are granted
  if (Notification.permission === "granted") {
    new Notification("New Video Uploaded!", {
      body: `${videoInfo.name}\n${videoInfo.description}`
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification("New Video Uploaded!", {
          body: `${videoInfo.name}\n${videoInfo.description}`
        });
      }
    });
  }
}

// Function to listen for new video uploads
function listenForNewVideos() {
  const videosMetadataRef = database.ref('videosMetadata');

  videosMetadataRef.on('child_added', function(snapshot) {
    const videoInfo = snapshot.val();
    showNotification(videoInfo);
  });
}

// Request notification permission on page load
document.addEventListener('DOMContentLoaded', function() {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
  listenForNewVideos();
});