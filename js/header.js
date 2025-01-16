document.addEventListener("DOMContentLoaded", () => {
    const menus = document.querySelectorAll(".header-sub-menu-container");

    menus.forEach((menu) => {
        const columnsContainer = menu.querySelector(".header-sub-menu-columns");
        let columnCount = parseInt(menu.getAttribute("data-columns") || "4"); // Parse to integer

        // Set columnCount to one less
        columnCount = columnCount > 1 ? columnCount - 1 : 1; // Ensure columnCount doesn't go below 1

        if (columnsContainer) {
            columnsContainer.setAttribute("data-columns", columnCount);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const headerContainer = document.querySelector(".header-container");
    const navbarBrand = document.querySelector(".navbar-brand");
    const headerMenuItemLabels = document.querySelectorAll(".header-menu-item-label");

    // Check if headerContainer is found
    if (!headerContainer || !navbarBrand) {
        console.error("Header container or navbar brand not found!");
        return;
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior if necessary

            // Toggle the `color-white` class on the header container and menu labels
            const isWhite = headerContainer.classList.contains("color-white");
            const isBrandWhite = navbarBrand.classList.contains("color-white");

            headerMenuItemLabels.forEach((label) => {
                if (isWhite) {
                    label.classList.remove("color-white");
                    label.classList.add("color-black");
                } else {
                    label.classList.remove("color-black");
                    label.classList.add("color-white");
                }
            });

            if (isWhite) {
                headerContainer.classList.remove("color-white");
                headerContainer.classList.add("color-black");
            } else {
                headerContainer.classList.remove("color-black");
                headerContainer.classList.add("color-white");
            }
            if (isBrandWhite) {
                navbarBrand.classList.remove("color-white");
                navbarBrand.classList.add("color-black");
            } else {
                navbarBrand.classList.remove("color-black");
                navbarBrand.classList.add("color-white");
            }

            console.log(
                `Toggled class on header-container. Current state: ${
                    isWhite ? "color-black" : "color-white"
                }`
            );
        });
    });

    // Remove classes when clicking outside the nav or dropdown
    document.addEventListener("click", (event) => {
        const isNavLink = event.target.closest(".nav-link");
        const isDropdown = event.target.closest(".dropdown-menu");

        if (!isNavLink && !isDropdown) {
            headerMenuItemLabels.forEach((label) => {
                label.classList.remove("color-white");
                label.classList.add("color-black");
            });

            headerContainer.classList.remove("color-white");
            headerContainer.classList.add("color-black");

            
            navbarBrand.classList.remove("color-white");
            navbarBrand.classList.add("color-black");
            console.log("Removed class 'color-white' from header-container.");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const headBack = document.querySelector(".head-back");

    // Create and append bg-setter and bg-setter-next
    const bgSetter = document.createElement("div");
    bgSetter.classList.add("bg-setter");
    const bgSetterNext = document.createElement("div");
    bgSetterNext.classList.add("bg-setter-next");

    headBack.appendChild(bgSetter);
    headBack.appendChild(bgSetterNext);

    // Array of background images
    const images = [
        "./images/aa.jpg",
        "./images/aa1.jpg",
        "./images/ab.jpg",
        "./images/ab1.jpg",
    ];

    let currentIndex = 0;

    // Set initial background image
    bgSetter.style.backgroundImage = `url('${images[currentIndex]}')`;

    // Preload images to avoid flickering
    const preloadImage = (src) =>
        new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.src = src;
        });

    const changeBackground = async () => {
        const nextIndex = (currentIndex + 1) % images.length;

        // Preload next image
        await preloadImage(images[nextIndex]);

        // Set next image and transition
        bgSetterNext.style.backgroundImage = `url('${images[nextIndex]}')`;
        bgSetterNext.style.opacity = 1;
        bgSetterNext.style.transform = "scale(1)";

        // Swap after transition
        setTimeout(() => {
            bgSetter.style.backgroundImage = bgSetterNext.style.backgroundImage;
            bgSetter.style.opacity = 1;
            bgSetter.style.transform = "scale(1)";
            bgSetterNext.style.opacity = 0;
            bgSetterNext.style.transform = "scale(1.1)";
            currentIndex = nextIndex;
        }, 2000); // Match transition duration
    };

    // Change the background every 6 seconds
    setInterval(changeBackground, 6000);
});
