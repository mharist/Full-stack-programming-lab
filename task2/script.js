document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calcBtn = document.getElementById('calc-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultBox = document.getElementById('result-box');
    const resultValue = document.getElementById('result-value');
    const errorMsg = document.getElementById('error-msg');

    // --- Task: Use a function to calculate the result and display it dynamically ---
    function calculate() {
        // Clear previous state
        resetResultState();

        const val1 = parseFloat(num1Input.value);
        const val2 = parseFloat(num2Input.value);
        const operation = operationSelect.value;

        // --- Task: Validate input with conditional statements ---
        if (isNaN(val1) || isNaN(val2)) {
            showError("Please enter valid numbers in both fields.");
            return;
        }

        let result;

        switch (operation) {
            case 'add':
                result = val1 + val2;
                break;
            case 'subtract':
                result = val1 - val2;
                break;
            case 'multiply':
                result = val1 * val2;
                break;
            case 'divide':
                // Check for division by zero
                if (val2 === 0) {
                    showError("Cannot divide by zero.");
                    return;
                }
                result = val1 / val2;
                break;
            default:
                showError("Invalid operation.");
                return;
        }

        // Display Result
        showResult(result);
    }

    function showResult(result) {
        // rounding to avoid long floating point issues (e.g. 0.1 + 0.2)
        const displayResult = Number.isInteger(result) ? result : result.toFixed(2);

        resultValue.textContent = displayResult;
        resultBox.classList.remove('hidden');

        // --- Task: Bonus - Change background color depending on positive or negative value ---
        if (result > 0) {
            resultBox.classList.add('positive');
        } else if (result < 0) {
            resultBox.classList.add('negative');
        }
    }

    function showError(message) {
        resultBox.classList.remove('hidden');
        resultValue.textContent = "--";
        errorMsg.textContent = message;
    }

    function resetResultState() {
        resultBox.className = 'result-box hidden'; // Reset classes
        errorMsg.textContent = '';
    }

    function clearCalculator() {
        num1Input.value = '';
        num2Input.value = '';
        operationSelect.value = 'add';
        resetResultState();
    }

    // Event Listeners
    calcBtn.addEventListener('click', calculate);
    clearBtn.addEventListener('click', clearCalculator);
});
