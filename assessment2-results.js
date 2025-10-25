// Assessment Results - Personalized Insights and Band Content

// Band definitions with gentle, compassionate language
const bands = {
    'thriving': {
        title: 'Thriving & Expanding',
        emoji: '✨',
        color: '#C3A059',
        subtitle: 'You\'re grounded, clear, and ready to grow',
        bigReveal: 'You\'ve cultivated something rare: a life that supports you while still leaving room to stretch. You\'re somatically aware, purposefully aligned, and open to what\'s next.',
        whatIsWorking: 'You already rest before you crash. You notice your body. You hold boundaries. You dream beyond your current role. These aren\'t small things—they\'re the foundation of sustainable thriving.',
        coachingFit: 'Coaching with me would help you deepen what\'s already working and expand into the next layer of your becoming. We\'d focus on refining your vision, clarifying what wants to emerge, and holding space for bold, grounded growth.',
        nextSteps: [
            { text: 'Book a Free Connection Call', link: 'index.html#book-session', primary: true },
            { text: 'Explore Transformation Coaching', link: 'coaching.html' },
            { text: 'Join the Community', link: 'reset-kit.html' }
        ]
    },
    'growing': {
        title: 'Growing with Room to Soar',
        emoji: '🌱',
        color: '#8B9D93',
        subtitle: 'You\'re doing well—and there\'s beautiful space to expand',
        bigReveal: 'You have a solid foundation. You\'re aware. You\'re showing up. But there\'s a sense that something more is possible—more ease, more alignment, more of you fully expressed.',
        whatIsWorking: 'You\'re listening to your body (at least sometimes). You\'re questioning what you want next. You\'re not settling—you\'re seeking. That curiosity is your compass.',
        coachingFit: 'Coaching would help you move from functional to flourishing. We\'d work on deepening your somatic awareness, strengthening boundaries, and clarifying the vision that\'s quietly calling you forward.',
        nextSteps: [
            { text: 'Book a Free Connection Call', link: 'index.html#book-session', primary: true },
            { text: 'Try the Grounded Decision Kit', link: 'reset-kit.html' },
            { text: 'Read: Oh My Ego', link: 'oh-my-ego.html' }
        ]
    },
    'seeking': {
        title: 'Seeking Clarity & Support',
        emoji: '🧭',
        color: '#D4A574',
        subtitle: 'You\'re in transition—and that\'s exactly where support matters most',
        bigReveal: 'You\'re carrying a lot right now. The patterns are clear: stress is high, boundaries feel blurry, and there\'s a longing for something that feels more aligned. You\'re not lost—you\'re in the midst of becoming.',
        whatIsWorking: 'You showed up here. That matters. You\'re willing to look honestly at where you are, and that willingness is the beginning of transformation. You\'re also aware enough to know you can\'t keep going like this—and that awareness is a gift.',
        coachingFit: 'Coaching would give you the space, tools, and support to pause, recalibrate, and reconnect with what truly matters. We\'d work on nervous system regulation, boundary-setting, and clarifying what you actually want—not what you think you should want.',
        nextSteps: [
            { text: 'Book a Free Connection Call', link: 'index.html#book-session', primary: true },
            { text: 'Download the Reset Kit', link: 'reset-kit.html' },
            { text: 'Explore Foundation Coaching', link: 'coaching.html' }
        ]
    },
    'rebuilding': {
        title: 'Rebuilding Your Foundation',
        emoji: '🕊️',
        color: '#A68F7A',
        subtitle: 'You\'re carrying a lot—and it\'s time to lay some of it down',
        bigReveal: 'You\'re in survival mode, and your body is speaking loudly. Rest feels impossible. Boundaries feel non-existent. The work that once felt meaningful now feels like a weight. You\'re exhausted—and you deserve deep, compassionate support.',
        whatIsWorking: 'You\'re here. You took this assessment. That takes courage when you\'re running on empty. You\'re also honest about where you are—no pretending, no performing. That honesty is the first step toward healing.',
        coachingFit: 'Coaching would offer you a safe, grounded space to pause, breathe, and rebuild. We\'d start with nervous system care, gentle boundary work, and reconnecting you with your body and your worth. This isn\'t about pushing through—it\'s about coming home to yourself.',
        nextSteps: [
            { text: 'Book a Free Connection Call', link: 'index.html#book-session', primary: true },
            { text: 'Start with the Reset Kit', link: 'reset-kit.html' },
            { text: 'Explore Guided Meditations', link: 'https://youtube.com/@skillfullivingwkemi', external: true }
        ]
    }
};

// Display Results
function displayResults(scores, responses, textResponses, userName = '') {
    const band = determineBand(scores);
    const bandData = bands[band];

    // Generate personalized insights
    const insights = generateInsights(scores, responses, textResponses);

    // Personalized greeting
    const greeting = userName ? `${userName}, you're ` : 'You\'re ';

    // Calculate percentages for score bars (normalized to 100%)
    const alignmentPercent = Math.min(100, Math.round((scores.alignment / 450) * 100));
    const somaticPercent = Math.min(100, Math.round((scores.somatic / 400) * 100));
    const confidencePercent = Math.min(100, Math.round((scores.confidence / 200) * 100));

    // Build results HTML
    const resultsHTML = `
        <div class="decorative-star" style="font-size: 3.5rem;">${bandData.emoji}</div>

        <h1 style="font-family: 'Playfair Display', serif; font-size: 2.75rem; color: ${bandData.color}; margin: 1.5rem 0 0.5rem;">
            ${bandData.title}
        </h1>

        <p style="font-size: 1.15rem; color: #666; margin-bottom: 2rem; font-style: italic;">
            ${bandData.subtitle}
        </p>

        <!-- Score Bars -->
        <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); margin-bottom: 3rem; text-align: left;">
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #2E4A42; margin-bottom: 1.5rem; text-align: center;">
                Your Alignment Snapshot
            </h3>

            <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                    <span style="font-size: 1rem; font-weight: 600; color: #2E4A42;">⚖️ Success Alignment</span>
                    <span style="font-size: 0.9rem; color: #888;">${alignmentPercent}%</span>
                </div>
                <div style="font-size: 0.85rem; color: #666; margin-bottom: 0.5rem; font-style: italic;">
                    How closely your outer success reflects your inner truth
                </div>
                <div style="background: rgba(195, 160, 89, 0.15); height: 8px; border-radius: 10px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #C3A059 0%, #D4B36A 100%); height: 100%; width: ${alignmentPercent}%; border-radius: 10px; transition: width 0.5s ease; box-shadow: 0 0 8px rgba(195, 160, 89, 0.4);"></div>
                </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                    <span style="font-size: 1rem; font-weight: 600; color: #2E4A42;">🫀 Embodied Awareness</span>
                    <span style="font-size: 0.9rem; color: #888;">${somaticPercent}%</span>
                </div>
                <div style="font-size: 0.85rem; color: #666; margin-bottom: 0.5rem; font-style: italic;">
                    Your capacity to stay connected to your body's intelligence
                </div>
                <div style="background: rgba(195, 160, 89, 0.15); height: 8px; border-radius: 10px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #C3A059 0%, #D4B36A 100%); height: 100%; width: ${somaticPercent}%; border-radius: 10px; transition: width 0.5s ease; box-shadow: 0 0 8px rgba(195, 160, 89, 0.4);"></div>
                </div>
            </div>

            <div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                    <span style="font-size: 1rem; font-weight: 600; color: #2E4A42;">✨ Authentic Confidence</span>
                    <span style="font-size: 0.9rem; color: #888;">${confidencePercent}%</span>
                </div>
                <div style="font-size: 0.85rem; color: #666; margin-bottom: 0.5rem; font-style: italic;">
                    The ease and self-trust you bring into expression
                </div>
                <div style="background: rgba(195, 160, 89, 0.15); height: 8px; border-radius: 10px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #C3A059 0%, #D4B36A 100%); height: 100%; width: ${confidencePercent}%; border-radius: 10px; transition: width 0.5s ease; box-shadow: 0 0 8px rgba(195, 160, 89, 0.4);"></div>
                </div>
            </div>
        </div>

        <div style="background: rgba(195, 160, 89, 0.06); padding: 2.5rem; border-radius: 16px; border-left: 3px solid ${bandData.color}; margin-bottom: 3rem; text-align: left;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #2E4A42; margin-bottom: 1rem;">
                ${userName ? userName + ', here\'s' : 'Here\'s'} What I See
            </h2>
            <p style="font-size: 1.05rem; line-height: 1.8; color: #2E4A42;">
                ${bandData.bigReveal}
            </p>
        </div>

        <div style="background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); margin-bottom: 2rem; text-align: left;">
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #2E4A42; margin-bottom: 1.25rem;">
                What's Already Working ✓
            </h3>
            <p style="font-size: 1.05rem; line-height: 1.8; color: #555;">
                ${bandData.whatIsWorking}
            </p>
        </div>

        <div style="background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); margin-bottom: 2rem; text-align: left;">
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #2E4A42; margin-bottom: 1.5rem;">
                Three Key Insights
            </h3>
            ${insights.map((insight, i) => `
                <div style="margin-bottom: ${i < 2 ? '1.75rem' : '0'};">
                    <h4 style="font-size: 1.1rem; color: ${bandData.color}; margin-bottom: 0.5rem; font-weight: 600;">
                        ${i + 1}. ${insight.title}
                    </h4>
                    <p style="font-size: 1rem; line-height: 1.7; color: #555;">
                        ${insight.text}
                    </p>
                </div>
            `).join('')}
        </div>

        <div style="background: rgba(195, 160, 89, 0.06); padding: 2.5rem; border-radius: 16px; margin-bottom: 3rem; text-align: left;">
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #2E4A42; margin-bottom: 1.25rem;">
                How Coaching Can Support You
            </h3>
            <p style="font-size: 1.05rem; line-height: 1.8; color: #2E4A42;">
                ${bandData.coachingFit}
            </p>
        </div>

        <div style="margin: 3rem 0;">
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #2E4A42; margin-bottom: 2rem;">
                Your Next Steps
            </h3>
            <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
                ${bandData.nextSteps.map(step => `
                    <a href="${step.link}" ${step.external ? 'target="_blank"' : ''}
                       style="display: inline-block; padding: ${step.primary ? '1.25rem 3rem' : '1rem 2.5rem'};
                              background: ${step.primary ? '#C3A059' : 'transparent'};
                              color: ${step.primary ? 'white' : '#2E4A42'};
                              border: ${step.primary ? 'none' : '2px solid rgba(195,160,89,0.4)'};
                              border-radius: 50px; font-size: 1.05rem; font-weight: 500;
                              text-decoration: none; transition: all 0.3s ease;">
                        ${step.text}
                    </a>
                `).join('')}
            </div>
        </div>

        <div style="margin-top: 3rem; padding-top: 2.5rem; border-top: 1px solid rgba(195,160,89,0.2);">
            <p style="font-size: 0.95rem; color: #888; font-style: italic; line-height: 1.6;">
                You're doing important work just by pausing to look at where you are. <br>
                Whatever you choose next, I'm cheering you on.
            </p>
            <p style="margin-top: 1.5rem; font-size: 0.95rem; color: #666;">
                — Kemi
            </p>
        </div>

        <div style="text-align: center; margin-top: 2.5rem;">
            <a href="assessment2.html" style="color: #888; text-decoration: underline; font-size: 0.9rem;">
                Retake Assessment
            </a>
        </div>
    `;

    document.getElementById('resultsContent').innerHTML = resultsHTML;
    document.getElementById('resultsScreen').classList.add('active');

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Determine Band
function determineBand(scores) {
    // Normalize scores (rough averages based on max possible)
    const somaticNorm = scores.somatic / 400 * 100; // Max ~400
    const alignmentNorm = scores.alignment / 450 * 100; // Max ~450
    const readinessNorm = scores.readiness / 300 * 100; // Max ~300
    const confidenceNorm = scores.confidence / 200 * 100; // Max ~200

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

// Generate Personalized Insights
function generateInsights(scores, responses, textResponses) {
    const insights = [];

    // Get specific answer patterns
    const q1 = responses[0]; // Morning feeling (new Q1)
    const q2 = responses[1]; // Rest patterns
    const q3 = responses[2]; // Body awareness
    const q4 = responses[3]; // Work-life boundaries
    const q5 = responses[4]; // Burnout response
    const q7 = responses[6]; // Work feeling
    const q8 = responses[7]; // Achievement feeling
    const q9 = responses[8]; // Career color
    const q10 = responses[9]; // Confidence in rooms
    const q11 = responses[10]; // Current state
    const q12 = responses[11]; // Dream space
    const q15 = responses[14]; // 90-day desire
    const q16 = responses[15]; // Obstacles (array)

    // Insight 1: Somatic Pattern
    if (q1 !== undefined && q1 === 2) { // Morning feels like "a climb"
        insights.push({
            title: 'The Morning Climb',
            text: 'You described your day as feeling like "a climb." That\'s telling. It suggests your baseline is already effortful—before the day\'s demands even begin. This pattern of starting from depletion is quietly eroding your energy, clarity, and presence. The invitation here is to explore what might help you wake feeling more grounded and resourced.'
        });
    } else if (q2 !== undefined && q2 >= 3) { // Rarely/Never rest
        insights.push({
            title: 'Your Body is Speaking',
            text: 'You mentioned you rarely pause before your body forces you to. This pattern of pushing through is costing you more than you might realize—affecting your clarity, creativity, and capacity to be present. The invitation here is to notice earlier, rest sooner, and trust that pausing isn\'t weakness—it\'s wisdom.'
        });
    } else if (q3 !== undefined && q3 >= 2) { // Low body awareness
        insights.push({
            title: 'Reconnecting with Your Body',
            text: 'You shared that you\'re not very aware of your body when stressed. This disconnect is common for high-achievers—but it also means you\'re missing important signals. Building somatic awareness would help you catch stress early, regulate your nervous system, and make decisions from groundedness instead of reactivity.'
        });
    } else {
        insights.push({
            title: 'Your Somatic Awareness is a Gift',
            text: 'You\'re already tuned into your body—noticing breath, tension, and what you need. This is a powerful skill that many spend years cultivating. Keep deepening this practice. It\'s your anchor.'
        });
    }

    // Insight 2: Alignment & Purpose
    if (q9 !== undefined && q9 === 3) { // Career color: dusty violet
        insights.push({
            title: 'The Dusty Violet Pattern',
            text: 'You described your career as "dusty violet—rich in purpose, but muted in energy." That\'s such a specific awareness. You know your work matters, but something essential is missing—maybe support, maybe space, maybe permission to let it feel easier. This isn\'t about changing everything. It\'s about uncovering what would allow your purpose to breathe and glow again.'
        });
    } else if (q7 !== undefined && q7 === 2) { // Work feels like cycle
        insights.push({
            title: 'The Cycle You\'re Ready to Break',
            text: 'You described your work as "a cycle you can\'t break." That language tells me you\'re aware something needs to shift—but you might not yet see the way out. Coaching would help you identify what\'s keeping the cycle in place and design a path that actually aligns with who you are now.'
        });
    } else if (q8 !== undefined && q8 >= 1) { // Achievement feels fleeting/empty
        insights.push({
            title: 'When Success Doesn\'t Land',
            text: 'You mentioned achievements feel fleeting or empty. This isn\'t about accomplishing more—it\'s about realigning what success means to you. When your achievements don\'t nourish you, it\'s often because they\'re shaped by external expectations rather than internal clarity.'
        });
    } else if (q12 !== undefined && q12 >= 2) { // Rarely/never dreams
        insights.push({
            title: 'Making Space to Dream',
            text: 'You shared that you rarely give yourself space to dream beyond your current role. That\'s understandable when you\'re in survival mode—but it also keeps you stuck. One of the first things we\'d do together is create space for your imagination to breathe again. What wants to emerge when you stop performing?'
        });
    } else {
        insights.push({
            title: 'Your Work Has Meaning',
            text: 'You described your work as meaningful and energizing—that\'s not a given, and it matters. You\'ve built something that feeds you. The question now is: how do you deepen this alignment and expand from it?'
        });
    }

    // Insight 3: Confidence & Readiness
    if (q10 !== undefined && q10 >= 3) { // High imposter patterns
        insights.push({
            title: 'The Imposter Pattern',
            text: 'You described freezing, racing thoughts, or hyper-awareness in rooms with confident people. This is imposter syndrome—and it\'s incredibly common among high-achievers. But here\'s the truth: your presence is enough. Coaching would help you internalize that truth and show up with groundedness instead of performance.'
        });
    } else if (q11 !== undefined && q11 === 2) { // Surviving/exhausted
        insights.push({
            title: 'You\'re in Survival Mode',
            text: 'You named it clearly: you\'re surviving and exhausted. That honesty is brave. And it\'s also a signal that something needs to change—not eventually, but soon. You deserve support that meets you where you are and helps you rebuild from a place of care, not urgency.'
        });
    } else if (q16 && Array.isArray(q16) && q16.length >= 3) { // Multiple obstacles
        insights.push({
            title: 'You\'re Carrying a Lot',
            text: 'You identified multiple obstacles—time, money, trust, systems, faith. That\'s a heavy load. And it makes sense that you\'d feel stuck. Coaching won\'t erase these barriers, but it will help you navigate them with more clarity, agency, and self-compassion.'
        });
    } else {
        insights.push({
            title: 'You\'re Ready for More',
            text: 'You showed up here with curiosity and openness. You\'re not just going through the motions—you\'re actively seeking what\'s next. That readiness is powerful. The question is: what would it look like to fully step into it?'
        });
    }

    return insights;
}
