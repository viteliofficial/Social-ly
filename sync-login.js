// ID
username = document.getElementById('username').value


// Betöltés a LocalStorageből
getted_username = localStorage.getItem('username')


// áttírás
document.getElementById('username').innerHTML = "" + getted_username


// Adat törlés

function del_storage_data() {
    localStorage.removeItem('username')
}
function Scan_login() {
if (localStorage.getItem('username') ) {
    
        window.location.href = "index.html";
        return false;
    } else{
        console.warn("Fiók nem található")
    }} 