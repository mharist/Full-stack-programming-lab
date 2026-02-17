document.addEventListener('DOMContentLoaded', () => {
    // --- Task 1: Store each question and answer in separate variables ---
    
    // Question 1 Data
    const q1_text = "What is the correct way to declare a variable in modern JavaScript?";
    const q1_options = ["var myVar;", "variable myVar;", "let myVar;", "dim myVar;"];
    const q1_answer = 2; // Index of the correct answer (0-based)

    // Question 2 Data
    const q2_text = "Which method is used to select an element by its ID?";
    const q2_options = ["getElement(id)", "querySelector('#id')", "selectId(id)", "find('#id')"];
    const q2_answer = 1;

    // Question 3 Data
    const q3_text = "What does the '===' operator check for?";
    const q3_options = ["Value only", "Type only", "Value and Type", "Reference address"];
    const q3_answer = 2;

    // Question 4 Data
    const q4_text = "Which array method adds an element to the end of an array?";
    const q4_options = ["push()", "pop()", "unshift()", "append()"];
    const q4_answer = 0;

    // Question 5 Data
    const q5_text = "How do you write a comment in JavaScript?";
    const q5_options = ["<!-- comment -->", "// comment", "** comment **", "# comment"];
    const q5_answer = 1;

    // Grouping variables for easier iteration (optional but clean approach)
    // While the requirement says "store in separate variables", we can use an array of objects *referencing* those variables 
    // or construction logic to build the DOM. Let's build a simple structure to manage the quiz flow.
    
    // We will construct the quiz data structure from the individual variables to make rendering easier, 
    // respecting the "separate variables" rule for the source of truth.
    const quizData = [
        { text: q1_text, options: q1_options, correct: q1_answer },
        { text: q2_text, options: q2_options, correct: q2_answer },
        { text: q3_text, options: q3_options, correct: q3_answer },
        { text: q4_text, options: q4_options, correct: q4_answer },
        { text: q5_text, options: q5_options, correct: q5_answer }
    ];

    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score-display');
    const feedbackMessage = document.getElementById('feedback-message');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');

    // --- Task: Display results dynamically using DOM manipulation ---
    
    function buildQuiz() {
        quizContainer.innerHTML = ''; // Clear existing content
        
        quizData.forEach((question, index) => {
            // Create Question Block
            const questionBlock = document.createElement('div');
            questionBlock.classList.add('question-block');
            
            // Question Text
            const questionTitle = document.createElement('div');
            questionTitle.classList.add('question-text');
            questionTitle.textContent = `${index + 1}. ${question.text}`;
            questionBlock.appendChild(questionTitle);
            
            // Options Container
            const optionsList = document.createElement('div');
            optionsList.classList.add('options-list');
            
            // Generate Options
            question.options.forEach((option, optIndex) => {
                const label = document.createElement('label');
                label.classList.add('option-label');
                
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question${index}`; // Group radio buttons by question
                radio.value = optIndex;
                
                label.appendChild(radio);
                label.appendChild(document.createTextNode(option));
                optionsList.appendChild(label);
            });
            
            questionBlock.appendChild(optionsList);
            quizContainer.appendChild(questionBlock);
        });
    }

    // --- Task: Use functions to check each answer individually and calculate total score ---

    function calculateScore() {
        let score = 0;
        const totalQuestions = quizData.length;
        
        quizData.forEach((question, index) => {
            const selector = `input[name="question${index}"]:checked`;
            const selectedOption = document.querySelector(selector);
            
            // Reset styles
            const allLabels = document.querySelectorAll(`input[name="question${index}"]`);
            allLabels.forEach(input => {
                input.parentElement.style.borderColor = "transparent";
            });

            if (selectedOption) {
                const userAnswer = parseInt(selectedOption.value);
                if (userAnswer === question.correct) {
                    score++;
                    // Visual feedback for correct answer
                    selectedOption.parentElement.style.borderColor = "var(--success-color)";
                    selectedOption.parentElement.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
                } else {
                    // Visual feedback for wrong answer
                    selectedOption.parentElement.style.borderColor = "var(--danger-color)";
                    selectedOption.parentElement.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                }
            }
        });
        
        return score;
    }

    function showResults() {
        const score = calculateScore();
        const total = quizData.length;
        
        scoreDisplay.textContent = `${score} / ${total}`;
        
        // --- Task: Use conditional statements to display messages based on the score ---
        let message = "";
        let messageColor = "";
        
        if (score === total) {
            message = "Perfect Score! You are a JavaScript Master! 🚀";
            messageColor = "var(--success-color)";
        } else if (score >= total * 0.6) {
            message = "Great job! You know your stuff. 👍";
            messageColor = "var(--warning-color)";
        } else {
            message = "Keep practicing! You'll get there. 📚";
            messageColor = "var(--danger-color)";
        }
        
        feedbackMessage.textContent = message;
        feedbackMessage.style.color = messageColor;
        
        resultContainer.classList.remove('hidden');
        
        // Scroll to results
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // --- Task: Include a Reset Quiz button to clear all inputs and results ---

    function resetQuiz() {
        // Clear all radio inputs
        const allInputs = document.querySelectorAll('input[type="radio"]');
        allInputs.forEach(input => input.checked = false);
        
        // Reset styles
        const allLabels = document.querySelectorAll('.option-label');
        allLabels.forEach(label => {
            label.style.borderColor = "transparent";
            label.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        });

        // Hide results
        resultContainer.classList.add('hidden');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Event Listeners
    submitBtn.addEventListener('click', showResults);
    resetBtn.addEventListener('click', resetQuiz);

    // Initialize
    buildQuiz();
});
