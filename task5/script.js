document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    const passwordInput = document.getElementById('password');
    const successMessage = document.getElementById('success-message');

    // Error Message Elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const ageError = document.getElementById('age-error');
    const passwordError = document.getElementById('password-error');

    // --- Task: Validate each input individually using functions ---

    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, "Name should not be empty");
            return false;
        } else {
            showSuccess(nameInput, nameError);
            return true;
        }
    }

    function validateEmail() {
        // Simple check for @ as requested
        if (!emailInput.value.includes('@')) {
            showError(emailInput, emailError, "Email must contain '@'");
            return false;
        } else {
            showSuccess(emailInput, emailError);
            return true;
        }
    }

    function validateAge() {
        const age = parseInt(ageInput.value);
        if (isNaN(age) || age < 18 || age > 60) {
            showError(ageInput, ageError, "Age must be between 18-60");
            return false;
        } else {
            showSuccess(ageInput, ageError);
            return true;
        }
    }

    function validatePassword() {
        if (passwordInput.value.length < 6) {
            showError(passwordInput, passwordError, "Password minimum length 6");
            return false;
        } else {
            showSuccess(passwordInput, passwordError);
            return true;
        }
    }

    // Helper functions for DOM manipulation
    function showError(input, errorElement, message) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = message;
    }

    function showSuccess(input, errorElement) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorElement.textContent = '';
    }

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submission

        // Run all validations
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isAgeValid = validateAge();
        const isPasswordValid = validatePassword();

        if (isNameValid && isEmailValid && isAgeValid && isPasswordValid) {
            // --- Task: Show success message and confirm submission using confirm() ---
            const userConfirmed = confirm("All details are valid. Do you want to submit?");

            if (userConfirmed) {
                // Hide form, show success
                form.style.display = 'none';
                successMessage.classList.remove('hidden');

                // --- Task: Bonus - Use alert() interaction after submission ---
                setTimeout(() => {
                    alert("Registration Successful! Welcome aboard.");
                }, 500);
            }
        }
    });

    // Real-time validation (optional but good UX)
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    ageInput.addEventListener('input', validateAge);
    passwordInput.addEventListener('input', validatePassword);
});
