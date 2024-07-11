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
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function 
  function register () {
      // Get all our input fields
      username = document.getElementById('username').value
      password = document.getElementById('password').value
      email = document.getElementById('email').value
      follower = "1"

      // Validate input fields
      if (validate_email(email) == false || validate_password(password) == false) {
        alert('Helytelen jelszó vagy email')
        return
        // Dont't continue running the code
      }
      if (validate_field(username) == false) {
        alert('Helytelen Felhasználónév')
        return
      }
  
      // Move on with Auth
      auth.createUserWithEmailAndPassword(email, password)
      .then(function () {
        // Declare user variable
        var user = auth.currentUser;
    
        // Add this user to Firebase Database
        var database_ref = database.ref();
    
        // Create User data
        var user_data = {
          email : email,
          username : username,
          password : password,
          follower : follower,
          last_login : Date.now()
        };
    
        database_ref.child('users/' + user.uid).set(user_data);
    
        alert('Felhasználó Létrehozva!');
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage); // Megjelenítjük a hibaüzenetet
      });
      
    
  
  
  
  
  
  }
  
  function login() {
    username = document.getElementById('username_log').value
    password = document.getElementById('password_log').value
    email = document.getElementById('email_log').value
    
    login_status = false
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Helytelen jelszó vagy email')
      return
      // Dont't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
        // Declare user variable
        var user = auth.currentUser;
    
        // Add this user to Firebase Database
        var database_ref = database.ref();
  
        // Fetch user data from database
        database_ref.child('users/' + user.uid).once('value')
          .then(function(snapshot) {
            var user_data = snapshot.val();
            if (user_data) {
              // User data found in database
              var follower = user_data.follower; // Get the user's level from the database
              // Update last login time
              database_ref.child('users/' + user.username).update({last_login: Date.now(), follower: user_data.follower});
              
              // Save username and level to localStorage
              localStorage.setItem('username', username);
              localStorage.setItem('follower', follower);
              
              // Redirect to the menu page
              window.location.href = "index.html";
            } else {
              // User data not found in database
              alert("Felhasználó adatai nem találhatók az adatbázisban.");
            }
          })
          .catch(function(error) {
            console.error("Hiba történt a felhasználó adatainak lekérdezésekor:", error);
          });
    
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage); // Megjelenítjük a hibaüzenetet
    });
  }
  
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only acccepts lenght greater than 6
    if (password < 6) {
      return false  
    } else {
    return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false;
    }
  
    if (field.length <= 0) {
      return false;
    } else {
      return true;
    }
  }
  
  