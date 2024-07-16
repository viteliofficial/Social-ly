// Firebase configuration
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

const auth = firebase.auth();
const db = firebase.firestore();

// Function to fetch user profile data from Firestore
async function fetchUserProfile(uid) {
    try {
        const userDoc = await db.collection("users").doc(uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            document.getElementById("username").textContent = userData.username || "Felhasználó";
            document.getElementById("follower").textContent = userData.followers || "0";
            const videosList = document.getElementById("videos_list");
            videosList.innerHTML = ""; // Clear previous list items
            if (userData.videos && userData.videos.length > 0) {
                userData.videos.forEach(video => {
                    const li = document.createElement("li");
                    li.textContent = video;
                    videosList.appendChild(li);
                });
            } else {
                const li = document.createElement("li");
                li.textContent = "Nincsenek feltöltött videók.";
                videosList.appendChild(li);
            }
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        // Handle offline mode or retry logic here
        if (error.code === "unavailable") {
            // Display a message to the user or retry after a delay
            console.log("Firestore is unavailable. Retrying in 5 seconds...");
            setTimeout(() => {
                fetchUserProfile(uid); // Retry fetching profile after delay
            }, 5000); // Retry after 5 seconds
        } else {
            // Handle other errors or display a message to the user
            console.error("Other Firestore error:", error.message);
            // Example: Display error message to user
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Failed to fetch user profile. Please try again later.";
            document.body.appendChild(errorMessage);
        }
    }
}

// Check if user is authenticated
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in
        console.log("User is signed in:", user.uid);
        fetchUserProfile(user.uid); // Fetch and display user profile data
    } else {
        // User is signed out
        console.log("User is signed out");
        window.location.href = "auth.html"; // Redirect to login page if not logged in
    }
});
