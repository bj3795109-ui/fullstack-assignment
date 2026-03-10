document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");

    // Inputs
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");

    // Errors
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const passwordError = document.getElementById("passwordError");

    // Other elements
    const togglePasswordBtn = document.getElementById("togglePassword");
    const submitBtn = document.getElementById("submitBtn");
    const successMessage = document.getElementById("successMessage");
    const strengthBar = document.getElementById("strengthBar");
    const strengthText = document.getElementById("strengthText");

    // Validation State
    let isValidName = false;
    let isValidEmail = false;
    let isValidPhone = false;
    let isValidPassword = false;

    // --- Validation Functions ---

    // Name Validation (At least 3 characters)
    function validateName() {
        if (nameInput.value.trim().length >= 3) {
            nameError.textContent = "";
            nameInput.classList.add("valid");
            nameInput.classList.remove("invalid");
            isValidName = true;
        } else {
            nameError.textContent = "Name must be at least 3 characters.";
            nameInput.classList.add("invalid");
            nameInput.classList.remove("valid");
            isValidName = false;
        }
        checkFormValidity();
    }

    // Email Validation (Standard Regex)
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = "";
            emailInput.classList.add("valid");
            emailInput.classList.remove("invalid");
            isValidEmail = true;
        } else {
            emailError.textContent = "Please enter a valid email address.";
            emailInput.classList.add("invalid");
            emailInput.classList.remove("valid");
            isValidEmail = false;
        }
        checkFormValidity();
    }

    // Phone Validation (Exactly 10 digits)
    function validatePhone() {
        const phoneRegex = /^\d{10}$/;
        if (phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = "";
            phoneInput.classList.add("valid");
            phoneInput.classList.remove("invalid");
            isValidPhone = true;
        } else {
            phoneError.textContent = "Phone number must be exactly 10 digits.";
            phoneInput.classList.add("invalid");
            phoneInput.classList.remove("valid");
            isValidPhone = false;
        }
        checkFormValidity();
    }

    // Password Validation and Strength Meter
    function validatePassword() {
        const val = passwordInput.value;
        let strength = 0;

        if (val.length >= 8) strength++; // length at least 8
        if (/[A-Z]/.test(val)) strength++; // uppercase letter
        if (/[0-9]/.test(val)) strength++; // number
        if (/[^a-zA-Z0-9]/.test(val)) strength++; // special character

        // Update UI based on strength
        if (val.length === 0) {
            strengthBar.style.width = "0%";
            strengthBar.style.backgroundColor = "transparent";
            strengthText.textContent = "Password Strength";
            passwordError.textContent = "Password is required.";
            passwordInput.classList.add("invalid");
            passwordInput.classList.remove("valid");
            isValidPassword = false;
        } else if (strength <= 1) {
            strengthBar.style.width = "25%";
            strengthBar.style.backgroundColor = 'red';
            strengthText.textContent = "Weak";
            passwordError.textContent = "Include 8+ chars, uppercase, number, & special char.";
            passwordInput.classList.add("invalid");
            passwordInput.classList.remove("valid");
            isValidPassword = false;
        } else if (strength === 2 || strength === 3) {
            strengthBar.style.width = "60%";
            strengthBar.style.backgroundColor = 'orange';
            strengthText.textContent = "Medium";
            passwordError.textContent = "Stronger password recommended.";
            passwordInput.classList.add("valid");
            passwordInput.classList.remove("invalid");
            isValidPassword = true;  // We can let medium pass, but strongly recommend stronger
        } else if (strength === 4) {
            strengthBar.style.width = "100%";
            strengthBar.style.backgroundColor = 'green';
            strengthText.textContent = "Strong";
            passwordError.textContent = "";
            passwordInput.classList.add("valid");
            passwordInput.classList.remove("invalid");
            isValidPassword = true;
        }

        checkFormValidity();
    }

    // Enable/Disable Submit Button
    function checkFormValidity() {
        if (isValidName && isValidEmail && isValidPhone && isValidPassword) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // --- Event Listeners ---

    // Real-time inline validation triggers
    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    phoneInput.addEventListener("input", validatePhone);
    passwordInput.addEventListener("input", validatePassword);

    // Toggle password visibility
    togglePasswordBtn.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePasswordBtn.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            togglePasswordBtn.textContent = "Show";
        }
    });

    // Handle Form Submission
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Stop page reload

        // Double check all validations
        validateName();
        validateEmail();
        validatePhone();
        validatePassword();

        if (isValidName && isValidEmail && isValidPhone && isValidPassword) {

            // 1. Create submission object
            const newSubmission = {
                id: Date.now(), // unique id
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                password: passwordInput.value // Storing password for demo purposes (not recommended in real apps)
            };

            // 2. Get existing submissions from Local Storage or start empty array
            let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

            // 3. Add to array
            submissions.push(newSubmission);

            // 4. Save back to Local Storage
            localStorage.setItem("submissions", JSON.stringify(submissions));

            // Success feedback
            form.reset();

            // Reset validation states and UI styles
            [nameInput, emailInput, phoneInput, passwordInput].forEach(inp => {
                inp.classList.remove('valid', 'invalid');
            });
            strengthBar.style.width = "0%";
            strengthText.textContent = "Password Strength";
            submitBtn.disabled = true;

            // Show success message briefly
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 3000);

            console.log("Submissions array from local storage: ", JSON.parse(localStorage.getItem("submissions")));
        }
    });

    // Initial check to disable button
    checkFormValidity();
});
