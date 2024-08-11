// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// Function to show notification
function showNotification(videoInfo) {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notifications");
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
      } else {
        console.log("Notification permission denied");
      }
    }).catch(function (err) {
      console.error("Notification permission request failed:", err);
    });
  }
}

// Function to listen for new video uploads
function listenForNewVideos() {
  const videosMetadataRef = database.ref('videosMetadata');

  videosMetadataRef.on('child_added', function(snapshot) {
    const videoInfo = snapshot.val();
    showNotification(videoInfo);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

// Request notification permission and start listening for new videos on page load
document.addEventListener('DOMContentLoaded', function() {
  if (Notification.permission !== "granted" && Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        console.log("Notification permission granted");
      } else {
        console.log("Notification permission denied");
      }
      listenForNewVideos();  // Start listening regardless of the permission state
    }).catch(function (err) {
      console.error("Notification permission request failed:", err);
      listenForNewVideos();  // Start listening even if permission request fails
    });
  } else {
    listenForNewVideos();  // If already granted or denied, just start listening
  }
});