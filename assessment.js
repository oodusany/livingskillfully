// Assessment Questions and Scoring Logic
const questions = [
    // Energy & Vitality (Q1-Q4)
    {
        id: 1,
        theme: "Energy & Vitality",
        transition: "Notice your breath. Is it shallow, steady, or deepening?",
        text: "When you wake up, does your day feel like...",
        options: [
            { text: "a song", scores: { energy: 25, alignment: 20, connection: 15 } },
            { text: "a checklist", scores: { energy: 10, alignment: 5, connection: 5 } },
            { text: "a climb", scores: { energy: -10, alignment: -15, connection: 0 } }
        ]
    },
    {
        id: 2,
        theme: "Energy & Vitality",
        text: "Right now, my body feels most like...",
        options: [
            { text: "a calm river", scores: { energy: 25, alignment: 15, connection: 15 } },
            { text: "a steady engine", scores: { energy: 15, alignment: 10, connection: 5 } },
            { text: "a stretched rubber band", scores: { energy: -15, alignment: -10, connection: -5 } }
        ]
    },
    {
        id: 3,
        theme: "Energy & Vitality",
        text: "By midday, I usually feel...",
        options: [
            { text: "in flow", scores: { energy: 25, alignment: 20, connection: 10 } },
            { text: "functional", scores: { energy: 10, alignment: 0, connection: 0 } },
            { text: "running on borrowed energy", scores: { energy: -20, alignment: -15, connection: -10 } }
        ]
    },
    {
        id: 4,
        theme: "Energy & Vitality",
        text: "Take one slow breath. Where do you feel it most?",
        options: [
            { text: "belly", scores: { energy: 20, alignment: 15, connection: 15 } },
            { text: "chest", scores: { energy: 10, alignment: 5, connection: 5 } },
            { text: "throat", scores: { energy: -10, alignment: -5, connection: -5 } },
            { text: "nowhere", scores: { energy: -20, alignment: -15, connection: -15 } }
        ]
    },

    // Work & Alignment (Q5-Q7)
    {
        id: 5,
        theme: "Work & Alignment",
        transition: "Relax your jaw. Unclench your hands.",
        text: "My work feels like...",
        options: [
            { text: "a calling", scores: { energy: 15, alignment: 25, connection: 15 } },
            { text: "a responsibility", scores: { energy: 5, alignment: 0, connection: 0 } },
            { text: "a cycle I can't break", scores: { energy: -10, alignment: -25, connection: -10 } }
        ]
    },
    {
        id: 6,
        theme: "Work & Alignment",
        text: "When I achieve something, it feels...",
        options: [
            { text: "nourishing", scores: { energy: 15, alignment: 25, connection: 20 } },
            { text: "fleeting", scores: { energy: 5, alignment: -5, connection: -5 } },
            { text: "oddly empty", scores: { energy: -10, alignment: -20, connection: -15 } }
        ]
    },
    {
        id: 7,
        theme: "Work & Alignment",
        text: "If your career path had a color today, would it be...",
        options: [
            { text: "✦ Warm gold — steady, meaningful, and fulfilling", scores: { energy: 15, alignment: 25, connection: 15 } },
            { text: "✦ Neon red — intense, exciting, but a little unstable", scores: { energy: 5, alignment: -10, connection: -5 } },
            { text: "✦ Muted gray — flat, routine, lacking spark", scores: { energy: -15, alignment: -20, connection: -10 } }
        ]
    },

    // Connection & Fulfillment (Q8-Q10)
    {
        id: 8,
        theme: "Connection & Fulfillment",
        transition: "Recall the face of someone who supports you. Notice how your shoulders respond.",
        text: "The people around me...",
        options: [
            { text: "energize me", scores: { energy: 20, alignment: 15, connection: 25 } },
            { text: "blur into the background", scores: { energy: 0, alignment: -5, connection: -15 } },
            { text: "quietly drain me", scores: { energy: -15, alignment: -10, connection: -25 } }
        ]
    },
    {
        id: 9,
        theme: "Connection & Fulfillment",
        text: "My success feeds relationships, rest, and creativity...",
        options: [
            { text: "consistently", scores: { energy: 20, alignment: 20, connection: 25 } },
            { text: "inconsistently", scores: { energy: 5, alignment: -5, connection: -5 } },
            { text: "rarely", scores: { energy: -15, alignment: -15, connection: -25 } }
        ]
    },
    {
        id: 10,
        theme: "Connection & Fulfillment",
        text: "When I get free time, I...",
        options: [
            { text: "savor it", scores: { energy: 20, alignment: 15, connection: 25 } },
            { text: "catch up", scores: { energy: -5, alignment: -10, connection: -10 } },
            { text: "fill it to avoid slowing down", scores: { energy: -20, alignment: -15, connection: -20 } }
        ]
    },

    // Self-Actualization & Expansion (Q11-Q15)
    {
        id: 11,
        theme: "Self-Actualization & Expansion",
        transition: "Let your exhale be 1 second longer.",
        text: "Imagining the next chapter, I feel...",
        options: [
            { text: "quietly excited", scores: { energy: 20, alignment: 25, connection: 15 } },
            { text: "unsure", scores: { energy: 0, alignment: -5, connection: -5 } },
            { text: "numb", scores: { energy: -20, alignment: -20, connection: -15 } }
        ]
    },
    {
        id: 12,
        theme: "Self-Actualization & Expansion",
        text: "My relationship with ambition is...",
        options: [
            { text: "a dance", scores: { energy: 20, alignment: 25, connection: 15 } },
            { text: "a tug-of-war", scores: { energy: -10, alignment: -15, connection: -10 } },
            { text: "a distant echo", scores: { energy: -15, alignment: -20, connection: -20 } }
        ]
    },
    {
        id: 13,
        theme: "Self-Actualization & Expansion",
        text: "The pace of my life is...",
        options: [
            { text: "rhythmic", scores: { energy: 25, alignment: 20, connection: 20 } },
            { text: "tense but tolerable", scores: { energy: -5, alignment: -10, connection: -10 } },
            { text: "sprinting in circles", scores: { energy: -25, alignment: -25, connection: -15 } }
        ]
    },
    {
        id: 14,
        theme: "Self-Actualization & Expansion",
        text: "When I slow down, my mind...",
        options: [
            { text: "settles", scores: { energy: 25, alignment: 20, connection: 20 } },
            { text: "resists", scores: { energy: -10, alignment: -15, connection: -10 } },
            { text: "panics", scores: { energy: -25, alignment: -25, connection: -20 } }
        ]
    },
    {
        id: 15,
        theme: "Self-Actualization & Expansion",
        text: "If life were a garden, it's...",
        options: [
            { text: "thriving in balance", scores: { energy: 25, alignment: 25, connection: 25 } },
            { text: "growing wild", scores: { energy: 10, alignment: -10, connection: 5 } },
            { text: "neat but missing color", scores: { energy: -10, alignment: -15, connection: -20 } }
        ]
    }
];

// State Management
let currentQuestion = 0;
let responses = [];
let scores = { energy: 0, alignment: 0, connection: 0 };

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSavedProgress();
});

// Start Assessment
function startAssessment() {
    document.getElementById('welcomeScreen').classList.remove('active');
    document.getElementById('progressText').style.display = 'block';
    showQuestion(0);

    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'assessment_started', {
            event_category: 'Assessment',
            event_label: 'Start'
        });
    }
}

// Show Question
function showQuestion(index) {
    currentQuestion = index;
    updateProgress();

    const question = questions[index];
    const container = document.getElementById('questionContainer');

    // Create question HTML
    const questionHTML = `
        <div class="screen active" id="question-${index}">
            ${question.transition ? `<div class="transition-prompt">${question.transition}</div>` : ''}
            <div class="question-card">
                <div class="question-theme">${question.theme}</div>
                <h2 class="question-text">${question.text}</h2>
                <div class="options" id="options-${index}">
                    ${question.options.map((option, i) => `
                        <div class="option" data-index="${i}" onclick="selectOption(${index}, ${i})">
                            ${option.text}
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-primary btn-next" id="next-${index}" onclick="nextQuestion()">
                    ${index < questions.length - 1 ? 'Next' : 'Continue'}
                </button>
            </div>
        </div>
    `;

    container.innerHTML = questionHTML;

    // Restore previous selection if exists
    if (responses[index] !== undefined) {
        selectOption(index, responses[index], true);
    }

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Select Option
function selectOption(questionIndex, optionIndex, skipSave = false) {
    // Remove previous selections
    const options = document.querySelectorAll(`#options-${questionIndex} .option`);
    options.forEach(opt => opt.classList.remove('selected'));

    // Add selection
    options[optionIndex].classList.add('selected');

    // Enable next button
    document.getElementById(`next-${questionIndex}`).classList.add('enabled');

    // Save response
    responses[questionIndex] = optionIndex;

    if (!skipSave) {
        saveProgress();
    }

    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'question_answered', {
            event_category: 'Assessment',
            event_label: `Q${questionIndex + 1}`,
            value: optionIndex
        });
    }
}

// Next Question
function nextQuestion() {
    if (responses[currentQuestion] === undefined) return;

    // Hide current question
    document.getElementById(`question-${currentQuestion}`).classList.remove('active');

    if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
    } else {
        showMicropause();
    }
}

// Show Micro-pause
function showMicropause() {
    document.getElementById('questionContainer').innerHTML = '';
    document.getElementById('micropauseScreen').classList.add('active');
    updateProgress(true);

    // Focus input
    setTimeout(() => {
        document.getElementById('seasonWord').focus();
    }, 300);
}

// Calculate Results
function calculateResults() {
    scores = { energy: 0, alignment: 0, connection: 0 };

    responses.forEach((responseIndex, questionIndex) => {
        const question = questions[questionIndex];
        const selectedOption = question.options[responseIndex];

        scores.energy += selectedOption.scores.energy;
        scores.alignment += selectedOption.scores.alignment;
        scores.connection += selectedOption.scores.connection;
    });

    return scores;
}

// Determine Band
function determineBand(scores) {
    const composite = (scores.alignment * 0.4) + (scores.energy * 0.3) + (scores.connection * 0.3);

    // Pattern recognition
    const allPositive = scores.energy > 0 && scores.alignment > 0 && scores.connection > 0;
    const energyAndAlignmentNegative = scores.energy < 0 && scores.alignment < 0;
    const lowestDimension = Math.min(scores.energy, scores.alignment, scores.connection);

    // Band determination
    if (composite >= 150 && allPositive && lowestDimension >= 50) {
        return 'grounded-expander';
    } else if (composite < 50 || energyAndAlignmentNegative) {
        return 'overextended';
    } else {
        return 'disconnected-dreamer';
    }
}

// Show Results
function showResults() {
    const seasonWord = document.getElementById('seasonWord').value.trim();

    document.getElementById('micropauseScreen').classList.remove('active');
    document.getElementById('progressText').style.display = 'none';
    document.getElementById('progressBar').style.width = '100%';

    // Calculate scores and band
    calculateResults();
    const band = determineBand(scores);

    // Get lowest dimension for personalization
    let lowestDimension = 'energy';
    if (scores.alignment < scores.energy && scores.alignment < scores.connection) {
        lowestDimension = 'alignment';
    } else if (scores.connection < scores.energy && scores.connection < scores.alignment) {
        lowestDimension = 'connection';
    }

    // Get highest dimension
    let highestDimension = 'energy';
    if (scores.alignment > scores.energy && scores.alignment > scores.connection) {
        highestDimension = 'alignment';
    } else if (scores.connection > scores.energy && scores.connection > scores.alignment) {
        highestDimension = 'connection';
    }

    // Display results
    displayResults(band, seasonWord, lowestDimension, highestDimension);

    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'assessment_completed', {
            event_category: 'Assessment',
            event_label: band,
            value: Math.round(scores.alignment * 0.4 + scores.energy * 0.3 + scores.connection * 0.3)
        });
    }

    // Clear saved progress
    clearProgress();
}

// Update Progress
function updateProgress(complete = false) {
    const progress = complete ? 100 : ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = complete
        ? 'Complete'
        : `Question ${currentQuestion + 1} of ${questions.length}`;
}

// Progress Saving (Local Storage)
function saveProgress() {
    localStorage.setItem('assessment_progress', JSON.stringify({
        currentQuestion,
        responses,
        timestamp: Date.now()
    }));
}

function loadSavedProgress() {
    const saved = localStorage.getItem('assessment_progress');
    if (saved) {
        const data = JSON.parse(saved);
        // Only restore if less than 24 hours old
        if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
            responses = data.responses;
            // Optionally prompt user to continue
        }
    }
}

function clearProgress() {
    localStorage.removeItem('assessment_progress');
}

// Email Capture (MailerLite integration)
function captureEmail() {
    const email = document.getElementById('resultEmail').value.trim();

    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    // MailerLite API integration
    if (typeof ml !== 'undefined') {
        ml('account', '1738459');
        // Add subscriber logic here
    }

    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'email_captured', {
            event_category: 'Assessment',
            event_label: 'Results Email'
        });
    }

    document.getElementById('emailCapture').innerHTML = `
        <p style="color: #C3A059; font-weight: 600;">✓ Thank you! Check your inbox.</p>
    `;
}
