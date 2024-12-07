
"use strict";
//light and dark mode
document.getElementById("themeToggle").addEventListener("click", function () {
    // Toggle the dark mode class on the body
    document.body.classList.toggle("dark-mode");

    // Handle icon visibility
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");

    if (document.body.classList.contains("dark-mode")) {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
    } else {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
    }
});


// guessing game
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guessingGame(event) {
    event.preventDefault(); // Prevent form submission

    // Get the elements for display and message
    let displayYourGuess = document.getElementById("yourguess");
    let displayRandomNum = document.getElementById("random");
    let gameMessage = document.getElementById("guessMsg");

    // Generate random number between 1 and 10
    let randomNum = getRandomNumber(1, 10);

    // Get the user's guess from the input field
    let yourGuessNum = parseInt(document.getElementById("yourguessIn").value, 10);

    if (isNaN(yourGuessNum) || yourGuessNum < 1 || yourGuessNum > 10) {
        gameMessage.textContent = "⚠️ Please enter a number between 1 and 10.";
        return; // Exit the function if input is invalid
    }

    // Display the random number and the user's guess
    displayYourGuess.textContent = `Your Guess: ${yourGuessNum}`;
    displayRandomNum.textContent = `My Guess: ${randomNum}`;

    // Compare the guess and show the result
    if (randomNum === yourGuessNum) {
        gameMessage.textContent = "🎉 You guessed right! You win!";
    } else {
        gameMessage.textContent = "❌ Try again, you lose.";
    }
}

// Add event listener for the game button
document.getElementById("gamePlay").addEventListener("click", guessingGame);

//product display
document.addEventListener("DOMContentLoaded", () => {
    let products = document.querySelectorAll("figure.carousel");
    let productButtons = document.querySelectorAll(".product-btn");

    let currentProductIndex = 0;
    let currentSlideIndices = Array.from(products).map(() => 0);

    // Function to update displayed products
    function updateProductDisplay() {
        products.forEach((product, index) => {
            product.style.display = index === currentProductIndex ? "block" : "none";
        });
    }

    // Function to update displayed slide within a product
    function updateSlideDisplay(productIndex) {
        let slides = products[productIndex].querySelectorAll(".carousel-slide");
        slides.forEach((slide, index) => {
            slide.style.display = index === currentSlideIndices[productIndex] ? "block" : "none";
        });
    }

    // Add event listeners for product buttons
    productButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            currentProductIndex = index;
            updateProductDisplay();
        });
    });

    // Add event listeners for navigation buttons within each product
    products.forEach((product, productIndex) => {
        let prevBtn = product.querySelector(".prev-btn");
        let nextBtn = product.querySelector(".next-btn");
        let slides = product.querySelectorAll(".carousel-slide");

        // Initial setup for slides
        updateSlideDisplay(productIndex);

        prevBtn.addEventListener("click", () => {
            currentSlideIndices[productIndex] = 
                (currentSlideIndices[productIndex] - 1 + slides.length) % slides.length;
            updateSlideDisplay(productIndex);
        });

        nextBtn.addEventListener("click", () => {
            currentSlideIndices[productIndex] = 
                (currentSlideIndices[productIndex] + 1) % slides.length;
            updateSlideDisplay(productIndex);
        });
    });

    // Initialize display
    updateProductDisplay();
});



//form validation
document.getElementById("contact").addEventListener("submit", function (event) {
    event.preventDefault(); 

    // Collect inputs
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const tel = document.getElementById("tel").value.trim();
    const email = document.getElementById("email").value.trim();
    const comments = document.getElementById("comments").value.trim();
    const preferredContact = document.querySelector('input[name="radio"]:checked');

    // Regex for validation
    const phoneRegex = /^[0-9]{10}$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    // Error tracking
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll(".message").forEach((msg) => (msg.style.display = "none"));

    // Validate fields
    if (!firstname) {
        document.getElementById("error-firstname").textContent = "First name is required.";
        document.getElementById("error-firstname").style.display = "block";
        isValid = false;
    }

    if (!lastname) {
        document.getElementById("error-lastname").textContent = "Last name is required.";
        document.getElementById("error-lastname").style.display = "block";
        isValid = false;
    }

    if (preferredContact && preferredContact.value === "phone" && !phoneRegex.test(tel)) {
        document.getElementById("error-tel").textContent = "Please enter a valid 10-digit phone number.";
        document.getElementById("error-tel").style.display = "block";
        isValid = false;
    }

    if (preferredContact && preferredContact.value === "email" && !emailRegex.test(email)) {
        document.getElementById("error-email").textContent = "Please enter a valid email address.";
        document.getElementById("error-email").style.display = "block";
        isValid = false;
    }

    if (!comments) {
        document.getElementById("error-comments").textContent = "Comments are required.";
        document.getElementById("error-comments").style.display = "block";
        isValid = false;
    }

    if (!preferredContact) {
        document.getElementById("error-radio").textContent = "Please select your preferred method of contact.";
        document.getElementById("error-radio").style.display = "block";
        isValid = false;
    }

    // If form is valid
    if (isValid) {
        // Create customer object
        const customer = {
            firstname,
            lastname,
            phone: tel,
            email,
            comments,
            preferredContact: preferredContact.value,
        };

        // Show success message
        document.getElementById("contact").reset();
        document.getElementById("successfulSubmit").style.display = "block";
        document.getElementById("formSub").innerHTML = `
            Name: ${customer.firstname} ${customer.lastname}<br>
            Preferred Contact: ${customer.preferredContact}<br>
            ${customer.preferredContact === "phone" ? `Phone: ${customer.phone}` : `Email: ${customer.email}`}<br>
            Comments: ${customer.comments}
        `;
    }
});
