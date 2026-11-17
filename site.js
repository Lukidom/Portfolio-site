(function () {
    var root = document.documentElement;
    var toggle = document.querySelector("[data-theme-toggle]");
    var menuButton = document.querySelector("[data-nav-toggle]");
    var menu = document.getElementById("site-nav");

    function applyTheme(theme) {
        var light = theme === "light";
        if (light) {
            root.setAttribute("data-theme", "light");
        } else {
            root.removeAttribute("data-theme");
        }
        if (toggle) {
            toggle.setAttribute("aria-pressed", light ? "true" : "false");
            toggle.textContent = light ? "Dark" : "Light";
            toggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
        }
    }

    var saved = "dark";
    try {
        saved = localStorage.getItem("portfolio-theme") || "dark";
    } catch (error) {
        saved = "dark";
    }
    applyTheme(saved === "light" ? "light" : "dark");

    if (toggle) {
        toggle.addEventListener("click", function () {
            var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
            try {
                localStorage.setItem("portfolio-theme", next);
            } catch (error) {
                /* The page still switches for this visit. */
            }
            applyTheme(next);
        });
    }

    function setMenu(open) {
        if (!menuButton || !menu) {
            return;
        }
        menuButton.setAttribute("aria-expanded", open ? "true" : "false");
        menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        menu.classList.toggle("is-open", open);
    }

    if (menuButton) {
        menuButton.addEventListener("click", function () {
            setMenu(menuButton.getAttribute("aria-expanded") !== "true");
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            setMenu(false);
        }
    });

    if (menu) {
        menu.addEventListener("click", function (event) {
            if (event.target.closest("a")) {
                setMenu(false);
            }
        });
    }
})();
