localStorage.removeItem('follower')
// ID
username = document.getElementById('username').value
follower = document.getElementById('follower').value


// Betöltés a LocalStorageből
getted_username = localStorage.getItem('username')
getted_follower = localStorage.getItem('follower')


// áttírás
document.getElementById('username').innerHTML = "" + getted_username
document.getElementById('follower').innerHTML = "followers: " + getted_follower


// Adat törlés

function del_storage_data() {
    localStorage.removeItem('username')
    localStorage.removeItem('follower')

}

if (localStorage.getItem('username') || localStorage.getItem('follower')) {
    function Scan_login() {
        return false;
    } 


} else {
    alert("Kérlek jelentkezz be!")
    window.location.href = "auth.html";
}



 




