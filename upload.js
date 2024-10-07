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
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('uploadForm');
    const progressBarContainer = document.getElementById('progressBarContainer');
    const progressBar = document.getElementById('progressBar');
  
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Check if user is logged in
        const user = auth.currentUser;
        if (!user) {
            alert('Jelentkezz be!');
            return;
        }
        
        const fileInput = document.getElementById('videoFile');
        const descriptionInput = document.getElementById('videoDescription');
        
        // Validate file selection
        if (!fileInput.files || fileInput.files.length === 0) {
            alert('Válaszd ki amit felszeretnél tölteni');
            return;
        }
        
        const file = fileInput.files[0];
        
        // Show the progress bar
        progressBarContainer.style.display = 'block';
        progressBar.style.width = '0%'; // Reset progress bar

        // Upload video file to Firebase Storage
        const storageRef = storage.ref('videos/' + user.uid + '/' + file.name);
        const uploadTask = storageRef.put(file);
        
        // Update progress bar during upload
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.style.width = `${progress}%`;
            },
            (error) => {
                console.error('Error uploading video:', error);
                alert('Hiba történt a feltöltés során.');
            },
            () => {
                // Upload completed successfully, now save metadata to Realtime Database
                uploadTask.snapshot.ref