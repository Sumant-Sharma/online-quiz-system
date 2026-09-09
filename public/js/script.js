// ============================================
// Global Variables
// ============================================
let currentQuiz = null;
let userAnswers = [];
let currentPage = 'home';

// ============================================
// Page Navigation
// ============================================
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update nav buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.nav-btn[data-page="${pageName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    currentPage = pageName;

    // Load content if needed
    if (pageName === 'quizzes') {
        loadQuizzes();
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

function goToQuizzes() {
    showPage('quizzes');
}

function goHome() {
    showPage('home');
    userAnswers = [];
    currentQuiz = null;
}

// ============================================
// Navigation Event Listeners
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.getAttribute('data-page');
            showPage(page);
        });
    });

    // Set home as default
    showPage('home');
});

// ============================================
// Load and Display Quizzes
// ============================================
async function loadQuizzes() {
    const container = document.getElementById('quizzes-container');
    container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading quizzes...</p></div>';

    try {
        const response = await fetch('/api/quizzes');
        if (!response.ok) throw new Error('Failed to load quizzes');

        const quizzes = await response.json();
        displayQuizzes(quizzes);
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p style="color: red;">Error loading quizzes. Please try again.</p>';
    }
}

function displayQuizzes(quizzes) {
    const container = document.getElementById('quizzes-container');

    if (quizzes.length === 0) {
        container.innerHTML = '<p>No quizzes available.</p>';
        return;
    }

    container.innerHTML = quizzes.map(quiz => `
        <div class="quiz-card">
            <h3>${escapeHtml(quiz.title)}</h3>
            <p>${escapeHtml(quiz.description)}</p>
            <div class="quiz-card-meta">
                <span>📝 ${quiz.totalQuestions} Questions</span>
                <span>⏱️ ${Math.ceil(quiz.totalQuestions * 1.5)} mins</span>
            </div>
            <button class="quiz-card-button" onclick="startQuiz(${quiz.id})">Start Quiz</button>
        </div>
    `).join('');
}

// ============================================
// Start Quiz
// ============================================
async function startQuiz(quizId) {
    try {
        const response = await fetch(`/api/quizzes/${quizId}`);
        if (!response.ok) throw new Error('Failed to load quiz');

        currentQuiz = await response.json();
        userAnswers = new Array(currentQuiz.questions.length).fill(-1);

        displayQuiz();
        showPage('quiz-taking');
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading quiz. Please try again.');
    }
}

// ============================================
// Display Quiz Questions
// ============================================
function displayQuiz() {
    if (!currentQuiz) return;

    // Update title
    document.getElementById('quiz-title').textContent = currentQuiz.title;

    // Update question counter
    updateProgressBar();

    // Display questions
    const container = document.getElementById('questions-container');
    container.innerHTML = currentQuiz.questions.map((question, index) => `
        <div class="question-block">
            <div class="question-text">
                <span style="color: var(--primary-color);">Question ${index + 1}:</span> ${escapeHtml(question.question)}
            </div>
            <div class="options">
                ${question.options.map((option, optIndex) => `
                    <label class="option">
                        <input type="radio" 
                               name="question-${index}" 
                               value="${optIndex}"
                               ${userAnswers[index] === optIndex ? 'checked' : ''}
                               onchange="updateAnswer(${index}, ${optIndex})">
                        <label style="margin: 0; cursor: pointer;">${escapeHtml(option)}</label>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// ============================================
// Update Answer
// ============================================
function updateAnswer(questionIndex, answerIndex) {
    userAnswers[questionIndex] = answerIndex;
    updateProgressBar();
}

// ============================================
// Update Progress Bar
// ============================================
function updateProgressBar() {
    if (!currentQuiz) return;

    const totalQuestions = currentQuiz.questions.length;
    const answeredQuestions = userAnswers.filter(ans => ans !== -1).length;
    const percentage = (answeredQuestions / totalQuestions) * 100;

    document.getElementById('question-counter').textContent = `${answeredQuestions}/${totalQuestions}`;
    document.getElementById('progress-fill').style.width = percentage + '%';
}

// ============================================
// Submit Quiz
// ============================================
async function submitQuiz(event) {
    event.preventDefault();

    // Check if all questions are answered
    if (userAnswers.includes(-1)) {
        alert('Please answer all questions before submitting.');
        return;
    }

    try {
        const response = await fetch('/api/submit-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quizId: currentQuiz.id,
                answers: userAnswers
            })
        });

        if (!response.ok) throw new Error('Failed to submit quiz');

        const results = await response.json();
        displayResults(results);
        showPage('results');
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting quiz. Please try again.');
    }
}

// ============================================
// Display Results
// ============================================
function displayResults(results) {
    // Update score display
    const scoreNumber = document.getElementById('score-number');
    const totalQuestions = document.getElementById('total-questions');
    const percentage = document.getElementById('percentage');
    const scoreCircle = document.getElementById('score-circle');

    scoreNumber.textContent = results.score;
    totalQuestions.textContent = results.totalQuestions;
    percentage.textContent = results.percentage;

    // Color code the score circle
    if (results.percentage >= 80) {
        scoreCircle.style.background = 'linear-gradient(135deg, var(--success-color), #34d399)';
    } else if (results.percentage >= 60) {
        scoreCircle.style.background = 'linear-gradient(135deg, var(--warning-color), #fbbf24)';
    } else {
        scoreCircle.style.background = 'linear-gradient(135deg, var(--danger-color), #f87171)';
    }

    // Display detailed results
    const resultsDetails = document.getElementById('results-details');
    resultsDetails.innerHTML = `
        <h3 style="margin-bottom: 1.5rem; color: var(--text-dark);">Review Your Answers</h3>
        ${results.results.map((result, index) => `
            <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'}">
                <div class="result-question">Question ${index + 1}: ${escapeHtml(result.question)}</div>
                <div class="result-answer">
                    <span class="result-your-answer">Your Answer: ${escapeHtml(result.userAnswer)}</span>
                </div>
                ${!result.isCorrect ? `
                    <div class="result-answer">
                        <span class="result-correct-answer">Correct Answer: ${escapeHtml(result.correctAnswer)}</span>
                    </div>
                ` : ''}
                <div class="result-status ${result.isCorrect ? 'correct' : 'incorrect'}">
                    ${result.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </div>
            </div>
        `).join('')}
    `;
}

// ============================================
// Utility Functions
// ============================================

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add smooth scrolling for touch devices
document.addEventListener('touchstart', () => {
    document.documentElement.style.scrollBehavior = 'auto';
});

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'H' to go home
    if (e.key === 'h' || e.key === 'H') {
        if (currentPage !== 'home') {
            goHome();
        }
    }
    // Press 'Q' to go to quizzes
    if (e.key === 'q' || e.key === 'Q') {
        if (currentPage !== 'quizzes') {
            goToQuizzes();
        }
    }
});

// ============================================
// Responsive Adjustments
// ============================================
window.addEventListener('resize', () => {
    // Handle any responsive adjustments if needed
});

// ============================================
// Local Storage for Quiz Progress
// ============================================
function saveQuizProgress() {
    const progress = {
        quizId: currentQuiz?.id,
        answers: userAnswers,
        timestamp: new Date().getTime()
    };
    localStorage.setItem('quizProgress', JSON.stringify(progress));
}

function loadQuizProgress() {
    const progress = localStorage.getItem('quizProgress');
    if (progress) {
        return JSON.parse(progress);
    }
    return null;
}

// Auto-save progress every 30 seconds
setInterval(() => {
    if (currentQuiz && currentPage === 'quiz-taking') {
        saveQuizProgress();
    }
}, 30000);

// ============================================
// Analytics (Optional - for tracking)
// ============================================
function trackEvent(event, data) {
    console.log(`Event: ${event}`, data);
    // You can send this data to a backend service for analytics
}
