// A `localStorage`-ban tárolt felhasználói adatokat az `users` kulcs alatt tároljuk.
// Ha még nincs ilyen kulcs, akkor az üres objektumot állítjuk be kezdőértéknek.
const users = JSON.parse(localStorage.getItem('users')) || {};

// Az űrlapok elküldésekor végrehajtott függvények.
// A `preventDefault()` metódus megakadályozza az alapértelmezett űrlap-kezelő működését,
// vagyis a lap újratöltését.
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Ellenőrizzük, hogy az adott felhasználónév és jelszó szerepel-e az `users` objektumban.
  if (users[username] && users[username].password === password) {
    alert('Sikeres bejelentkezés!');
    // átirányítás egy másik oldalra
    window.location.href = "../index.html";
  } else {
    alert('Hibás felhasználónév vagy jelszó.');
  }
}

function handleRegistration(event) {
  event.preventDefault();

  const username = document.getElementById('new_username').value;
  const password = document.getElementById('new_password').value;

  // Ellenőrizzük, hogy az adott felhasználónév még nem szerepel-e az `users` objektumban.
  if (!users[username]) {
    users[username] = { password: password };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sikeres regisztráció!');
    localStorage.setItem("username",username)
  } else {
    alert('Ezzel a felhasználónévvel már van regisztrálva.');
}
}

// Az űrlapokhoz hozzárendeljük az elküldés eseménykezelő függvényeket.
document.getElementsByTagName('form')[0].addEventListener('submit', handleLogin);
document.getElementsByTagName('form')[1].addEventListener('submit', handleRegistration);


  const user_name_lekeres = JSON.parse(localStorage.getItem('users'));
  const user_name_text = document.getElementById("username_here");
  if (user_name_text !== null) {
      user_name_text.innerHTML = "" + user_name_lekeres;
  } else {
    console.log("nem található az user_name_text elem");
  }
  
  
  



