// Coaching Readiness Assessment - Questions and Scoring Logic

const questions = [
    // SECTION 1: Wellbeing at Work (6 questions)
    {
        id: 1,
        section: 1,
        sectionTitle: "Wellbeing at Work",
        type: "multiple-choice",
        text: "When you wake up, does your day feel like a song, a checklist, or a climb?",
        options: [
            { text: "A song", scores: { energy: 25, alignment: 20, confidence: 15 } },
            { text: "A checklist", scores: { energy: 10, alignment: 5, confidence: 5 } },
            { text: "A climb", scores: { energy: -10, alignment: -15, readiness: 15 } },
            { text: "Other (please share)", scores: { alignment: 10, readiness: 10 }, allowText: true }
        ]
    },
    {
        id: 2,
        section: 1,
        sectionTitle: "Wellbeing at Work",
        type: "multiple-choice",
        text: "How often do you pause or rest before your body forces you to?",
        options: [
            { text: "Always", scores: { somatic: 100, readiness: 20 } },
            { text: "Often", scores: { somatic: 75, readiness: 15 } },
            { text: "Sometimes", scores: { somatic: 50, readiness: 10 } },
            { text: "Rarely", scores: { somatic: 25, readiness: 5 } },
            { text: "Never", scores: { somatic: 0, readiness: 10 } }
        ]
    },
    {
        id: 3,
        section: 1,
        sectionTitle: "Wellbeing at Work",
        type: "multiple-choice",
        text: "When you're stressed at work, how aware are you of your body (breath, shoulders, heartbeat, tension)?",
        options: [
            { text: "Very aware", scores: { somatic: 100, confidence: 20 } },
            { text: "Somewhat aware", scores: { somatic: 65, confidence: 10 } },
            { text: "Not really", scores: { somatic: 30, confidence: 5 } },
            { text: "Only after I crash", scores: { somatic: 0, readiness: 15 } }
        ]
    },
    {
        id: 4,
        section: 1,
        sectionTitle: "Wellbeing at Work",
        type: "multiple-choice",
        text: "How do work and life currently interact for you? Which best describes you:",
        options: [
            { text: "I hold clear boundaries that let both breathe", scores: { somatic: 100, alignment: 30, confidence: 25 } },
            { text: "I feel uneasy resting or taking time off unless I'm completely drained", scores: { somatic: 20, alignment: 10, readiness: 15 } },
            { text: "I often stay \"switched on,\" checking messages or thinking about work long after hours", scores: { somatic: 25, alignment: 15, readiness: 12 } },
            { text: "I'm learning to weave work and life into a rhythm that feels sustainable — one that honors both my ambition and my aliveness", scores: { somatic: 75, alignment: 50, readiness: 20 } }
        ]
    },
    {
        id: 5,
        section: 1,
        sectionTitle: "Wellbeing at Work",
        type: "multiple-choice",
        text: "When you notice signs of burnout or fatigue, what tends to happen next?",
        options: [
            { text: "I push through and hope it passes", scores: { somatic: 10, readiness: 15 } },
            { text: "I tell myself it's fine, part of the job", scores: { somatic: 20, readiness: 10 } },
            { text: "I numb or distract to get by", scores: { somatic: 15, readiness: 18 } },
            { text: "I pay attention and rest early", scores: { somatic: 100, alignment: 25, confidence: 20 } },
            { text: "I rarely experience burnout or fatigue at work", scores: { somatic: 100, alignment: 30, confidence: 30 } }
        ]
    },
    {
        id: 6,
        section: 1,
        sectionTitle: "Wellbeing at Work",
        type: "multiple-choice",
        text: "How supported do you feel — emotionally, mentally, or professionally — in your current environment?",
        options: [
            { text: "Very supported", scores: { somatic: 30, alignment: 30, confidence: 30 } },
            { text: "Somewhat", scores: { somatic: 15, alignment: 15, confidence: 15 } },
            { text: "Barely", scores: { somatic: 5, alignment: 5, readiness: 20 } },
            { text: "Not at all", scores: { somatic: 0, alignment: 0, readiness: 25 } }
        ]
    },

    // SECTION 2: Alignment & Fulfillment (7 questions)
    {
        id: 7,
        section: 2,
        sectionTitle: "Alignment & Fulfillment",
        sectionTransition: "Take three slow breaths. Let your exhale be a little longer than your inhale.",
        type: "multiple-choice",
        text: "My work currently feels like...",
        options: [
            { text: "A calling — meaningful and energizing", scores: { alignment: 100, confidence: 25 } },
            { text: "A responsibility — something I must keep up", scores: { alignment: 40, readiness: 10 } },
            { text: "A cycle I can't seem to break", scores: { alignment: 10, readiness: 25 } },
            { text: "Something else (please share)", scores: { alignment: 35, readiness: 15 }, allowText: true }
        ]
    },
    {
        id: 8,
        section: 2,
        sectionTitle: "Alignment & Fulfillment",
        type: "multiple-choice",
        text: "When I achieve something, it feels...",
        options: [
            { text: "Nourishing — like true success", scores: { alignment: 100, confidence: 30 } },
            { text: "Fleeting — a brief high, then on to the next", scores: { alignment: 35, confidence: 10, readiness: 15 } },
            { text: "Oddly empty — like it didn't land the way I thought it would", scores: { alignment: 15, confidence: 5, readiness: 25 } },
            { text: "Something else (please share)", scores: { alignment: 30, readiness: 18 }, allowText: true }
        ]
    },
    {
        id: 9,
        section: 2,
        sectionTitle: "Alignment & Fulfillment",
        type: "multiple-choice",
        text: "If your career path had a color today, would it be...",
        options: [
            { text: "✦ Warm gold — steady, meaningful, and fulfilling", scores: { alignment: 100, confidence: 25 } },
            { text: "✦ Muted gray — flat, routine, lacking spark", scores: { alignment: 20, readiness: 20 } },
            { text: "✦ Neon red — intense, exciting, but a little unstable", scores: { alignment: 50, confidence: 15, readiness: 15 } },
            { text: "✦ Dusty violet — rich in purpose, but muted in energy", scores: { alignment: 70, somatic: 20, readiness: 25 } },
            { text: "Other (please share)", scores: { alignment: 40, readiness: 10 }, allowText: true }
        ]
    },
    {
        id: 10,
        section: 2,
        sectionTitle: "Alignment & Fulfillment",
        type: "multiple-choice",
        text: "When you walk into a meeting, a new project, or a room full of confident people — what usually happens inside you?",
        options: [
            { text: "I feel grounded and steady", scores: { confidence: 100, alignment: 30 } },
            { text: "I shrink a little but recover quickly", scores: { confidence: 65, alignment: 20, readiness: 15 } },
            { text: "I second-guess myself and over-prepare", scores: { confidence: 35, readiness: 20 } },
            { text: "My mind races and I try to blend in or prove I belong", scores: { confidence: 20, readiness: 25 } },
            { text: "I become hyper-aware of every move, facial expression, or silence", scores: { confidence: 15, readiness: 25 } },
            { text: "I freeze, then replay the moment in my head afterward", scores: { confidence: 10, readiness: 30 } }
        ]
    },
    {
        id: 11,
        section: 2,
        sectionTitle: "Alignment & Fulfillment",
        type: "multiple-choice",
        text: "Which statement feels truest?",
        options: [
            { text: "I'm stable but uninspired", scores: { alignment: 40, readiness: 20 } },
            { text: "I'm questioning what I want next", scores: { alignment: 50, readiness: 25 } },
            { text: "I'm surviving and exhausted", scores: { alignment: 10, somatic: 5, readiness: 30 } },
            { text: "I'm thriving and expanding", scores: { alignment: 100, somatic: 30, confidence: 30 } }
        ]
    },
    {
        id: 12,
        section: 2,
        sectionTitle: "Alignment & Fulfillment",
        type: "multiple-choice",
        text: "How much space do you give yourself to dream beyond your current role or title?",
        options: [
            { text: "Regularly", scores: { alignment: 100, confidence: 25 } },
            { text: "Occasionally", scores: { alignment: 60, confidence: 15 } },
            { text: "Rarely", scores: { alignment: 30, readiness: 15 } },
            { text: "Never", scores: { alignment: 10, readiness: 20 } }
        ]
    },
    {
        id: 13,
        section: 2,
        sectionTitle: "Alignment & Fulfillment",
        type: "text",
        text: "If your work felt aligned and easeful, what would change in your life?",
        helper: "Take your time. Write from your heart.",
        placeholder: "Type your response here..."
    },

    // SECTION 3: Coaching Fit & Future Vision (6 questions)
    {
        id: 14,
        section: 3,
        sectionTitle: "Coaching Fit & Future Vision",
        sectionTransition: "Notice your shoulders. Let them soften. You're doing beautifully.",
        type: "multiple-choice",
        text: "Which best describes your current situation?",
        options: [
            { text: "Employee", scores: { readiness: 10 } },
            { text: "Manager", scores: { readiness: 10, confidence: 10 } },
            { text: "Entrepreneur", scores: { readiness: 10, confidence: 15 } },
            { text: "Student", scores: { readiness: 10 } },
            { text: "Between jobs", scores: { readiness: 20 } },
            { text: "Other", scores: { readiness: 10 }, allowText: true }
        ]
    },
    {
        id: 15,
        section: 3,
        sectionTitle: "Coaching Fit & Future Vision",
        type: "multiple-choice",
        text: "What do you most want to experience in the next 90 days?",
        options: [
            { text: "Clarity and confidence", scores: { readiness: 30, confidence: 20 } },
            { text: "Healthier boundaries and calm", scores: { readiness: 30, somatic: 20 } },
            { text: "Career direction or transition", scores: { readiness: 30, alignment: 20 } },
            { text: "More purpose and joy", scores: { readiness: 30, alignment: 25 } },
            { text: "Other (please share)", scores: { readiness: 25 }, allowText: true }
        ]
    },
    {
        id: 16,
        section: 3,
        sectionTitle: "Coaching Fit & Future Vision",
        type: "multiple-choice",
        text: "What do you feel is the biggest obstacle right now?",
        helper: "You can select multiple if they all feel true.",
        multiple: true,
        options: [
            { text: "I barely have time or mental space to breathe, let alone reflect or expand", scores: { somatic: -10, readiness: 25 } },
            { text: "Money feels tight — there's pressure to prioritize survival over intentional change", scores: { readiness: 20 } },
            { text: "I don't know who or what to trust for guidance", scores: { readiness: 25, confidence: 10 } },
            { text: "I feel caught in systems or routines that weren't built for my wellbeing", scores: { alignment: 10, readiness: 25 } },
            { text: "A part of me has started to settle or lose faith in what's possible", scores: { alignment: 5, readiness: 30 } },
            { text: "Not applicable", scores: { readiness: 5 } },
            { text: "Other (please share)", scores: { readiness: 20 }, allowText: true }
        ]
    },
    {
        id: 17,
        section: 3,
        sectionTitle: "Coaching Fit & Future Vision",
        type: "text",
        text: "What have you already tried to shift this (books, therapy, courses, meditation, etc.)?",
        helper: "This helps me understand what's worked and what hasn't.",
        placeholder: "Share what you've explored so far..."
    },
    {
        id: 18,
        section: 3,
        sectionTitle: "Coaching Fit & Future Vision",
        type: "multiple-choice",
        text: "Which kind of support feels most soothing or helpful to you right now?",
        options: [
            { text: "1:1 Coaching sessions (deep work & accountability)", scores: { readiness: 40 } },
            { text: "Practical tools & wellbeing tips", scores: { readiness: 20, somatic: 15 } },
            { text: "Group or community learning", scores: { readiness: 25 } },
            { text: "I'm not sure yet — I just want to explore", scores: { readiness: 30 } }
        ]
    },
    {
        id: 19,
        section: 3,
        sectionTitle: "Coaching Fit & Future Vision",
        type: "text",
        text: "Is there anything else you'd like me to know about you?",
        helper: "Optional — only if it feels right to share.",
        placeholder: "Anything on your heart...",
        optional: true
    }
];

// State Management
let currentQuestion = 0;
let responses = [];
let scores = { somatic: 0, alignment: 0, readiness: 0, confidence: 0 };
let textResponses = {};
let userEmail = '';
let userName = '';
let bandResult = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSavedProgress();
});

// Start Assessment
function startAssessment() {
    document.getElementById('welcomeScreen').classList.remove('active');
    document.getElementById('progressText').style.display = 'block';

    setTimeout(() => {
        showQuestion(0);
    }, 300);

    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'assessment2_started', {
            event_category: 'Assessment',
            event_label: 'Coaching Readiness'
        });
    }
}

// Show Question
function showQuestion(index) {
    currentQuestion = index;
    updateProgress();

    const question = questions[index];
    const container = document.getElementById('questionContainer');

    // Build question HTML based on type
    let questionHTML = `
        <div class="screen active question-screen" id="question-${index}">
            ${question.sectionTransition ? `
                <div class="section-transition">${question.sectionTransition}</div>
            ` : ''}
            <div class="question-card">
                <div class="section-label">${question.sectionTitle} — Question ${getQuestionNumberInSection(index)}</div>
                <h2 class="question-text">${question.text}</h2>
                ${question.helper ? `<p class="question-helper">${question.helper}</p>` : ''}
    `;

    if (question.type === 'multiple-choice') {
        questionHTML += `<div class="options" id="options-${index}">`;
        question.options.forEach((option, i) => {
            questionHTML += `
                <div class="option" data-index="${i}" onclick="selectOption(${index}, ${i}, ${question.multiple || false})">
                    ${option.text}
                </div>
            `;
            if (option.allowText) {
                questionHTML += `
                    <input type="text" class="text-input" id="text-${index}-${i}"
                           placeholder="Please specify..." style="display:none; margin-top: -0.5rem;">
                `;
            }
        });
        questionHTML += `</div>`;
    } else if (question.type === 'text') {
        questionHTML += `
            <textarea class="textarea-input" id="text-response-${index}"
                      placeholder="${question.placeholder || 'Type your response...'}"
                      oninput="handleTextInput(${index})">${textResponses[index] || ''}</textarea>
        `;
    }

    questionHTML += `
                <div class="btn-nav-group">
                    ${index > 0 ? `<button class="btn btn-secondary" onclick="previousQuestion()">← Back</button>` : ''}
                    <button class="btn btn-primary btn-next ${question.optional ? 'enabled' : ''}" id="next-${index}" onclick="nextQuestion()">
                        ${index < questions.length - 1 ? 'Continue' : 'See My Results'}
                    </button>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = questionHTML;

    // Restore previous selection if exists
    if (responses[index] !== undefined) {
        if (question.type === 'multiple-choice') {
            if (question.multiple && Array.isArray(responses[index])) {
                responses[index].forEach(optionIndex => {
                    selectOption(index, optionIndex, true, true);
                });
            } else {
                selectOption(index, responses[index], question.multiple || false, true);
            }
        }
    }

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Get question number within section
function getQuestionNumberInSection(index) {
    const question = questions[index];
    let count = 0;
    for (let i = 0; i <= index; i++) {
        if (questions[i].section === question.section) {
            count++;
        }
    }
    return count;
}

// Select Option
function selectOption(questionIndex, optionIndex, isMultiple = false, skipSave = false) {
    const question = questions[questionIndex];
    const options = document.querySelectorAll(`#options-${questionIndex} .option`);
    const selectedOption = options[optionIndex];

    if (isMultiple) {
        // Multi-select
        selectedOption.classList.toggle('selected');

        // Build array of selected indices
        const selected = [];
        options.forEach((opt, i) => {
            if (opt.classList.contains('selected')) {
                selected.push(i);
            }
        });

        responses[questionIndex] = selected.length > 0 ? selected : undefined;

        // Enable next if at least one selected
        if (selected.length > 0) {
            document.getElementById(`next-${questionIndex}`).classList.add('enabled');
        } else {
            document.getElementById(`next-${questionIndex}`).classList.remove('enabled');
        }
    } else {
        // Single select
        options.forEach(opt => opt.classList.remove('selected'));
        selectedOption.classList.add('selected');
        responses[questionIndex] = optionIndex;
        document.getElementById(`next-${questionIndex}`).classList.add('enabled');

        // Show text input if option allows it
        if (question.options[optionIndex].allowText) {
            const textInput = document.getElementById(`text-${questionIndex}-${optionIndex}`);
            if (textInput) {
                textInput.style.display = 'block';
                setTimeout(() => textInput.focus(), 100);
            }
        }
    }

    if (!skipSave) {
        saveProgress();
    }

    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'question_answered', {
            event_category: 'Assessment2',
            event_label: `Q${questionIndex + 1}`,
            value: optionIndex
        });
    }
}

// Handle Text Input
function handleTextInput(questionIndex) {
    const textarea = document.getElementById(`text-response-${questionIndex}`);
    const text = textarea.value.trim();

    textResponses[questionIndex] = text;

    // Enable next button if text entered (or if optional)
    const question = questions[questionIndex];
    if (text.length > 0 || question.optional) {
        document.getElementById(`next-${questionIndex}`).classList.add('enabled');
    } else {
        document.getElementById(`next-${questionIndex}`).classList.remove('enabled');
    }

    saveProgress();
}

// Next Question
function nextQuestion() {
    const question = questions[currentQuestion];

    // Validate response
    if (question.type === 'multiple-choice' && responses[currentQuestion] === undefined && !question.optional) {
        return;
    }

    if (question.type === 'text' && !textResponses[currentQuestion] && !question.optional) {
        return;
    }

    // Hide current question
    document.getElementById(`question-${currentQuestion}`).classList.remove('active');

    // Show next or email screen
    if (currentQuestion < questions.length - 1) {
        setTimeout(() => {
            showQuestion(currentQuestion + 1);
        }, 300);
    } else {
        showEmailScreen();
    }
}

// Previous Question
function previousQuestion() {
    document.getElementById(`question-${currentQuestion}`).classList.remove('active');

    setTimeout(() => {
        showQuestion(currentQuestion - 1);
    }, 300);
}

// Update Progress
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';

    const currentSection = questions[currentQuestion].section;
    document.getElementById('progressText').textContent = `Section ${currentSection} of 3`;
}

// Calculate Results
function calculateScores() {
    scores = { somatic: 0, alignment: 0, readiness: 0, confidence: 0 };

    responses.forEach((response, questionIndex) => {
        const question = questions[questionIndex];

        if (question.type === 'multiple-choice') {
            if (question.multiple && Array.isArray(response)) {
                // Multiple selections
                response.forEach(optionIndex => {
                    const option = question.options[optionIndex];
                    if (option.scores) {
                        Object.keys(option.scores).forEach(dim => {
                            scores[dim] = (scores[dim] || 0) + option.scores[dim];
                        });
                    }
                });
            } else if (response !== undefined) {
                // Single selection
                const option = question.options[response];
                if (option.scores) {
                    Object.keys(option.scores).forEach(dim => {
                        scores[dim] = (scores[dim] || 0) + option.scores[dim];
                    });
                }
            }
        }
    });

    return scores;
}

// Show Email Screen
function showEmailScreen() {
    document.getElementById('questionContainer').innerHTML = '';
    document.getElementById('progressBar').style.width = '100%';
    document.getElementById('emailScreen').classList.add('active');

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Submit Email
function submitEmail() {
    const emailInput = document.getElementById('emailInput');
    const nameInput = document.getElementById('nameInput');
    const emailError = document.getElementById('emailError');

    const email = emailInput.value.trim();
    const name = nameInput.value.trim();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        emailError.style.display = 'block';
        emailInput.focus();
        return;
    }

    emailError.style.display = 'none';
    userEmail = email;
    userName = name || '';

    // Calculate scores to determine band
    calculateScores();
    bandResult = determineBand(scores);

    // Send to Google Sheets (which will also handle MailerLite)
    sendToGoogleSheets();

    // Show results
    showResults();
}

// Send to Google Sheets
function sendToGoogleSheets() {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbygOcpxrbCe01WzL0K31MKGYtigdTqN4RKDBK1lww1p9m9RBbSBxry2sNkDHlkeuBWh/exec';

    // Convert response indices to actual answer text
    const readableResponses = responses.map((response, index) => {
        const question = questions[index];
        if (!question) return '';

        if (Array.isArray(response)) {
            // Multiple selections
            return response.map(optIndex => question.options[optIndex]?.text || '').join('; ');
        } else if (response !== undefined && question.options) {
            // Single selection
            return question.options[response]?.text || '';
        }
        return '';
    });

    const data = {
        timestamp: new Date().toISOString(),
        email: userEmail,
        name: userName,
        band: bandResult,
        scores: scores,
        responses: responses,
        readableResponses: readableResponses,
        textResponses: textResponses
    };

    console.log('Sending to Google Sheets:', data);

    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log('Google Sheets request completed');
        console.log('Note: no-cors mode prevents reading response, but request was sent');

        // Track event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'data_saved_sheets', {
                event_category: 'Assessment2',
                event_label: bandResult
            });
        }
    })
    .catch(error => {
        console.error('Google Sheets fetch error:', error);
    });
}

// Determine Band (moved from results file for access)
function determineBand(scores) {
    // Normalize scores (rough averages based on max possible)
    const somaticNorm = scores.somatic / 400 * 100;
    const alignmentNorm = scores.alignment / 450 * 100;
    const readinessNorm = scores.readiness / 300 * 100;
    const confidenceNorm = scores.confidence / 200 * 100;

    // Band logic
    if (somaticNorm >= 80 && alignmentNorm >= 80 && readinessNorm >= 70) {
        return 'thriving';
    } else if (somaticNorm >= 60 && alignmentNorm >= 60) {
        return 'growing';
    } else if (readinessNorm >= 50 || (alignmentNorm >= 40 && readinessNorm >= 35)) {
        return 'seeking';
    } else {
        return 'rebuilding';
    }
}

// Show Results
function showResults() {
    document.getElementById('emailScreen').classList.remove('active');
    document.getElementById('progressText').style.display = 'none';
    document.getElementById('progressBar').style.width = '100%';

    // Display results using results file
    displayResults(scores, responses, textResponses, userName);

    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'assessment2_completed', {
            event_category: 'Assessment',
            event_label: 'Coaching Readiness',
            value: Math.round((scores.somatic + scores.alignment + scores.readiness + scores.confidence) / 4)
        });
    }

    // Clear saved progress
    clearProgress();
}

// Progress Saving (Local Storage)
function saveProgress() {
    localStorage.setItem('assessment2_progress', JSON.stringify({
        currentQuestion,
        responses,
        textResponses,
        timestamp: Date.now()
    }));
}

function loadSavedProgress() {
    const saved = localStorage.getItem('assessment2_progress');
    if (saved) {
        const data = JSON.parse(saved);
        // Only restore if less than 24 hours old
        if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
            responses = data.responses || [];
            textResponses = data.textResponses || {};
        }
    }
}

function clearProgress() {
    localStorage.removeItem('assessment2_progress');
}
