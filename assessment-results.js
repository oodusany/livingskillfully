// Results Content for Each Band
const bandContent = {
    'grounded-expander': {
        title: 'Grounded Expander',
        subtitle: 'Balanced, Ready to Grow',
        description: 'You\'ve built something rare: a life that sustains you while still leaving room to stretch. You know your rhythm, honor your capacity, and you\'re clear on what matters.',
        pattern: {
            energy: 'Your energy is steady and renewable—you know how to tend it.',
            alignment: 'Your work and life feel aligned with your deepest values.',
            connection: 'Your relationships nourish you, and you create space for what fills you up.'
        },
        growthEdge: 'You\'re ready for the next layer of expansion. The question isn\'t whether you can grow—it\'s what wants to emerge next.',
        nextSteps: [
            'Clarify your next chapter with intention.',
            'Explore how to lead, mentor, or contribute beyond your current circle.',
            'Deepen your capacity to receive—rest, support, joy.'
        ],
        cta: {
            primary: 'Book a Free Connection Call',
            primaryLink: 'index.html#book-session',
            secondary: 'Explore Coaching',
            secondaryLink: 'coaching.html'
        },
        color: '#C3A059'
    },

    'disconnected-dreamer': {
        title: 'Disconnected Dreamer',
        subtitle: 'On Autopilot, Seeking Spark',
        description: 'You\'re going through the motions with skill, but something\'s missing. The spark. The pulse. The sense that what you\'re doing actually matters to you.',
        pattern: {
            energy: 'You\'re functional, but not fully alive. Energy feels flat or inconsistent.',
            alignment: 'Your days feel fine on paper, but something doesn\'t quite fit.',
            connection: 'Relationships feel distant, or you\'re too busy to truly be present.'
        },
        growthEdge: 'You\'re yearning for reconnection—to yourself, your purpose, and the people who matter. This isn\'t about burning it all down. It\'s about recalibrating.',
        nextSteps: [
            'Slow down long enough to ask: What do I actually want?',
            'Reconnect with what once lit you up—hobbies, people, dreams.',
            'Create micro-moments of presence and pleasure in your daily life.'
        ],
        cta: {
            primary: 'Book a Free Connection Call',
            primaryLink: 'index.html#book-session',
            secondary: 'Get the Grounded Decision Kit',
            secondaryLink: 'reset-kit.html'
        },
        color: '#8B9D93'
    },

    'overextended': {
        title: 'Overextended',
        subtitle: 'Stretched Thin, Running on Fumes',
        description: 'You\'re doing too much with too little support. Your body is signaling stress, your work feels misaligned, and rest feels impossible—or guilt-inducing when you try.',
        pattern: {
            energy: 'You\'re depleted. Running on borrowed energy, caffeine, or sheer willpower.',
            alignment: 'Your work feels like a treadmill—necessary but not nourishing.',
            connection: 'You\'re isolated, whether physically or emotionally. Support feels scarce.'
        },
        growthEdge: 'You need permission to stop, breathe, and recalibrate. This isn\'t about fixing everything overnight—it\'s about stabilizing first, then rebuilding.',
        nextSteps: [
            'Identify one small thing you can release or delegate this week.',
            'Create a non-negotiable rest ritual—even 10 minutes counts.',
            'Reach out for support—coaching, therapy, a trusted friend.'
        ],
        cta: {
            primary: 'Book a Free Connection Call',
            primaryLink: 'index.html#book-session',
            secondary: 'Download the Reset Kit',
            secondaryLink: 'reset-kit.html'
        },
        color: '#D4A574'
    }
};

// Dimension Insights
const dimensionInsights = {
    energy: {
        high: 'Your energy is steady and renewable. You know how to pace yourself.',
        mid: 'Your energy is functional but could use more tending.',
        low: 'You\'re running on fumes. Rest and replenishment are essential.'
    },
    alignment: {
        high: 'Your life feels aligned with what matters most to you.',
        mid: 'You\'re doing what needs to be done, but meaning feels elusive.',
        low: 'There\'s a disconnect between your values and your daily life.'
    },
    connection: {
        high: 'Your relationships and sense of belonging nourish you.',
        mid: 'Connection feels inconsistent—sometimes present, often missing.',
        low: 'You feel isolated or drained by the people around you.'
    }
};

// Display Results
function displayResults(band, seasonWord, lowestDimension, highestDimension) {
    const content = bandContent[band];
    const resultsContainer = document.getElementById('resultsContent');

    // Determine dimension levels
    const dimensionLevel = (score) => {
        if (score > 100) return 'high';
        if (score > 0) return 'mid';
        return 'low';
    };

    const energyLevel = dimensionLevel(scores.energy);
    const alignmentLevel = dimensionLevel(scores.alignment);
    const connectionLevel = dimensionLevel(scores.connection);

    // Build results HTML
    const resultsHTML = `
        <div class="decorative-star">✷</div>

        ${seasonWord ? `
            <p style="color: #666; font-style: italic; margin-bottom: 1rem;">
                Your word: <strong style="color: ${content.color};">${seasonWord}</strong>
            </p>
        ` : ''}

        <h1 class="band-title" style="color: ${content.color};">${content.title}</h1>
        <p style="font-size: 1.1rem; color: #666; margin-bottom: 1rem;">${content.subtitle}</p>
        <p class="band-description">${content.description}</p>

        <div class="insight-section">
            <h3 class="insight-title">Your Pattern</h3>
            <p class="insight-text">${content.pattern[lowestDimension]}</p>
            <p class="insight-text" style="margin-top: 0.75rem;">
                <strong>What's working:</strong> ${dimensionInsights[highestDimension][dimensionLevel(scores[highestDimension])]}
            </p>
        </div>

        <div class="insight-section">
            <h3 class="insight-title">Your Growth Edge</h3>
            <p class="insight-text">${content.growthEdge}</p>
        </div>

        <div class="insight-section">
            <h3 class="insight-title">Next Steps</h3>
            <ul style="list-style: none; padding: 0;">
                ${content.nextSteps.map(step => `
                    <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative;">
                        <span style="position: absolute; left: 0; color: ${content.color};">✓</span>
                        ${step}
                    </li>
                `).join('')}
            </ul>
        </div>

        <div class="cta-group">
            <a href="${content.cta.primaryLink}" class="btn btn-primary">${content.cta.primary}</a>
            <a href="${content.cta.secondaryLink}" class="btn btn-outline">${content.cta.secondary}</a>
        </div>

        <div class="email-capture" id="emailCapture">
            <h3 class="insight-title" style="text-align: center; margin-bottom: 0.5rem;">
                Want these results in your inbox?
            </h3>
            <p style="color: #666; text-align: center; margin-bottom: 1rem;">
                Plus, join the community for weekly insights on sustainable success.
            </p>
            <input
                type="email"
                class="email-input"
                id="resultEmail"
                placeholder="Enter your email"
            >
            <div style="text-align: center;">
                <button class="btn btn-primary" onclick="captureEmail()">Send My Results</button>
            </div>
        </div>

        <div style="margin-top: 2rem; text-align: center;">
            <a href="assessment.html" style="color: #666; text-decoration: underline;">
                Retake Assessment
            </a>
        </div>
    `;

    resultsContainer.innerHTML = resultsHTML;
    document.getElementById('resultsScreen').classList.add('active');

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Enhanced Email Capture with MailerLite
function captureEmail() {
    const email = document.getElementById('resultEmail').value.trim();

    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    // Get band info for tagging
    const band = determineBand(scores);
    const bandName = bandContent[band].title;

    // MailerLite integration (if available)
    if (typeof ml !== 'undefined') {
        ml('account', '1738459');
        // You can add custom subscriber logic here with MailerLite API
        // Example: ml('subscribe', { email: email, tags: [bandName] });
    }

    // Track event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'email_captured', {
            event_category: 'Assessment',
            event_label: bandName,
            value: 1
        });
    }

    // Send results email (you'd implement server-side endpoint)
    // For now, just show confirmation
    document.getElementById('emailCapture').innerHTML = `
        <div style="text-align: center; padding: 1.5rem;">
            <div style="font-size: 3rem; color: #C3A059; margin-bottom: 0.5rem;">✓</div>
            <p style="color: #2E4A42; font-weight: 600; font-size: 1.1rem;">
                Check your inbox!
            </p>
            <p style="color: #666; margin-top: 0.5rem;">
                Your results are on their way.
            </p>
        </div>
    `;

    // Optional: Send to backend for email delivery
    fetch('/send-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            band: bandName,
            scores: scores
        })
    }).catch(err => console.log('Email service not configured'));
}
