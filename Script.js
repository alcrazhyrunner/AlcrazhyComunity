
function testButton() {
    alert("JavaScript berhasil bekerja!");
}

// ===== ELEMEN PANEL PROFIL =====
const profileButton = document.getElementById("profileButton");
const profileScreen = document.getElementById("profileScreen");
const closeProfile = document.getElementById("closeProfile");
const panelHandle = document.querySelector(".panel-handle");

// ===== BUKA PANEL PROFIL =====
profileButton.addEventListener("click", function () {
    profileScreen.style.transform = "";
    profileScreen.classList.add("show");
});

// ===== TUTUP PANEL DENGAN TOMBOL =====
closeProfile.addEventListener("click", function () {
    profileScreen.classList.remove("show");
    profileScreen.style.transform = "";
});

// ===== GESTURE SWIPE =====
let startY = 0;
let currentY = 0;
let isDragging = false;

panelHandle.addEventListener("touchstart", function (event) {
    startY = event.touches[0].clientY;
    currentY = startY;
    isDragging = true;

    profileScreen.style.transition = "none";
}, { passive: true });

panelHandle.addEventListener("touchmove", function (event) {
    if (!isDragging) return;

    currentY = event.touches[0].clientY;
    const distance = Math.max(0, currentY - startY);

    profileScreen.style.transform =
        `translateY(${distance}px)`;
}, { passive: true });

function stopDragging() {
    if (!isDragging) return;

    isDragging = false;
    const distance = currentY - startY;

    profileScreen.style.transition = "transform 0.5s ease";

    if (distance > 50) {
        profileScreen.classList.remove("show");

        setTimeout(function () {
            profileScreen.style.transform = "";
        }, 260);
    } else {
        profileScreen.style.transform = "translateY(0)";
    }
}

panelHandle.addEventListener("touchend", stopDragging);

panelHandle.addEventListener("touchcancel", function () {
    if (!isDragging) return;

    isDragging = false;
    profileScreen.style.transition = "transform 0.25s ease";
    profileScreen.style.transform = "translateY(0)";
});
