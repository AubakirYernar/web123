document.addEventListener('DOMContentLoaded', () => {
    // Existing registration and login logic here
    // Ensure the currentUser information is saved and available

    // --- Filter Logic ---
    const categoryFilter = document.getElementById("category");
    const priceFilter = document.getElementById("price");
    const products = document.querySelectorAll(".product");

    // Function to apply filters based on saved or current settings
    function filterProducts() {
        const category = categoryFilter.value;
        const price = priceFilter.value;

        // Apply filters to each product
        products.forEach(product => {
            const productCategory = product.getAttribute("data-category");
            const productPrice = product.getAttribute("data-price");
            let showProduct = true;

            if (category !== "all" && productCategory !== category) {
                showProduct = false;
            }
            if (price !== "all" && productPrice !== price) {
                showProduct = false;
            }

            product.style.display = showProduct ? "block" : "none";
        });

        // Save filter settings for the current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            currentUser.filters = { category, price };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }

    // Load user's last-used filters if available
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.filters) {
        const { category, price } = currentUser.filters;
        categoryFilter.value = category || 'all';
        priceFilter.value = price || 'all';
    }

    // Add event listeners to save filter changes and filter products
    categoryFilter.addEventListener("change", filterProducts);
    priceFilter.addEventListener("change", filterProducts);

    // Initial filtering based on loaded settings
    filterProducts();

    // --- Star Rating Logic ---
    const stars = document.querySelectorAll(".star1");
    stars.forEach(star => {
        star.addEventListener("click", () => {
            const ratingValue = parseInt(star.getAttribute("data-value"));
            const ratingContainer = star.parentElement;
            const allStars = ratingContainer.querySelectorAll(".star1");

            // Reset all stars and highlight up to the clicked star
            allStars.forEach(s => s.classList.remove("active"));
            for (let i = 0; i < ratingValue; i++) {
                allStars[i].classList.add("active");
            }

            // Save the user's rating for this product if logged in
            if (currentUser) {
                const productName = ratingContainer.closest(".product").querySelector("h3").textContent;
                currentUser.ratings = currentUser.ratings || {};
                currentUser.ratings[productName] = ratingValue;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
        });
    });
});
