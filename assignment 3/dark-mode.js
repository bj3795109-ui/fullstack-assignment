// --- App 1: Dark Mode Toggle ---

// Create the theme button
let themeBtn = document.createElement("button");
themeBtn.innerText = "Toggle Dark Mode";
document.body.appendChild(themeBtn);

// Check local storage for saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
}

// Add click event to toggle theme
themeBtn.addEventListener("click", function () {
    if (document.body.style.backgroundColor === "black") {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        localStorage.setItem("theme", "light");
    } else {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        localStorage.setItem("theme", "dark");
    }
});
