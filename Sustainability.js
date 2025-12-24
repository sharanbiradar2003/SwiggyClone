  const btn = document.getElementById("sustainabilityBtn");
    const menu = document.getElementById("dropdownMenu");

    btn.addEventListener("click", function (e) {
        e.stopPropagation();
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", function () {
        menu.style.display = "none";
    });