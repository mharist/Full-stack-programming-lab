document.addEventListener('DOMContentLoaded', () => {
    // Select all task rows
    const taskRows = document.querySelectorAll('.task-row');
    const resetBtn = document.getElementById('reset-all-btn');

    // --- Task: Use loops to style all tasks the same way & attach listeners ---
    taskRows.forEach(row => {
        const input = row.querySelector('.task-input');
        const completeBtn = row.querySelector('.complete-btn');
        const removeBtn = row.querySelector('.remove-btn');

        // --- Task: Users can mark a task as complete ---
        completeBtn.addEventListener('click', () => {
            // Toggle class for visual feedback (DOM manipulation)
            // Using classList.toggle handles adding/removing the 'completed' style
            row.classList.toggle('completed');

            // Optional: Disable input if completed
            if (row.classList.contains('completed')) {
                input.readOnly = true;
            } else {
                input.readOnly = false;
            }
        });

        // --- Task: Users can ... remove a task ---
        removeBtn.addEventListener('click', () => {
            // Requirement says "remove a task". 
            // Since there are "3 fixed tasks", we have two options: 
            // 1. Clear the input and styling (Resetting the row)
            // 2. Hide the row entirely.
            // Given "fixed tasks using individual input fields", let's clear the input to keep the slot available, 
            // OR hide it. Hiding it makes more sense for "Remove".

            // Let's implement actual removal (hiding), but maybe provide a way to bring them back (Reset All).
            row.style.display = 'none';
        });
    });

    // Reset function to bring everything back (not explicitly asked but good for UX with 'remove')
    resetBtn.addEventListener('click', () => {
        taskRows.forEach(row => {
            row.style.display = 'flex';
            row.classList.remove('completed');
            row.querySelector('.task-input').value = '';
            row.querySelector('.task-input').readOnly = false;
        });
    });
});
