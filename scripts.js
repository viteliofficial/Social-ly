// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    startButton.addEventListener("click", () => {
        window.location.href = "auth.html";
    });
});