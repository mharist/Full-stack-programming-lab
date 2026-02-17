document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const inputs = [
        document.getElementById('color1'),
        document.getElementById('color2'),
        document.getElementById('color3')
    ];
    const addBtn = document.getElementById('add-btn');
    const clearBtn = document.getElementById('clear-btn');
    const boxContainer = document.getElementById('box-container');

    // BOM Elements
    const winWidthDisplay = document.getElementById('win-width');
    const winHeightDisplay = document.getElementById('win-height');
    const screenWidthDisplay = document.getElementById('screen-width');
    const screenHeightDisplay = document.getElementById('screen-height');
    const browserInfoDisplay = document.getElementById('browser-info');

    // --- Task: Use functions to handle each color input and DOM manipulation ---
    function addColors() {
        inputs.forEach(input => {
            const colorValue = input.value.trim();

            if (colorValue) {
                createColorBox(colorValue);
            }
        });
    }

    function createColorBox(color) {
        const box = document.createElement('div');
        box.classList.add('color-box');

        // Allow valid CSS colors (hex, name, rgb)
        box.style.backgroundColor = color;

        // Optional: Tooltip to show color name
        box.title = color;

        boxContainer.appendChild(box);
    }

    // --- Task: Include a button to clear all boxes ---
    function clearBoxes() {
        boxContainer.innerHTML = '';
        inputs.forEach(input => input.value = '');
    }

    // --- Task: Display window width/height or browser info using BOM objects ---
    function updateBOMInfo() {
        winWidthDisplay.textContent = window.innerWidth;
        winHeightDisplay.textContent = window.innerHeight;

        if (screenWidthDisplay) screenWidthDisplay.textContent = window.screen.width;
        if (screenHeightDisplay) screenHeightDisplay.textContent = window.screen.height;
        if (browserInfoDisplay) browserInfoDisplay.textContent = navigator.userAgent.split(')')[0] + ')'; // Truncate for display
    }

    // Event Listeners
    addBtn.addEventListener('click', addColors);
    clearBtn.addEventListener('click', clearBoxes);

    // Update BOM info on load and resize
    updateBOMInfo();
    window.addEventListener('resize', updateBOMInfo);
});
