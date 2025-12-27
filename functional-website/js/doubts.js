// Doubts Page JavaScript for Campus Connect

// Generate anonymous ID
const generateAnonymousId = () => {
    return 'anon_' + Math.random().toString(36).substr(2, 9);
};

// Mock doubts data
const generateDoubts Data = () => {
    return [
        {
            id: 'd1',
            anonymousId: generateAnonymousId(),
            title: 'Confused about Pointers in C++',
            description: 'I understand the concept of pointers but struggle with pointer arithmetic and double pointers. Can someone explain with examples?',
            department: 'Computer Science',
            year: '2',
            subject: 'Data Structures',
            responses: 8,
            upvotes: 15,
            views: 89,
            helpers: ['Senior CS Student', '3rd Year Helper', 'TA Assistant'],
            createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
        },
        {
            id: 'd2',
            anonymousId: generateAnonymousId(),
            title: 'Integration by Parts - When to Use?',
            description: 'How do I know when to use integration by parts vs other integration methods? Looking for some intuition and practice problems.',
            department: 'Mathematics',
            year: '1',
            subject: 'Calculus',
            responses: 12,
            upvotes: 23,
            views: 145,
            helpers: ['Math Tutor', 'Calculus Expert', '4th Year Math'],
            createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000) // 7 hours ago
        },
        {
            id: 'd3',
            anonymousId: generateAnonymousId(),
            title: 'Organic Chemistry Reaction Mechanisms',
            description: 'Struggling with predicting products in organic reactions. Need help understanding SN1 vs SN2 mechanisms.',
            department: 'Science',
            year: '2',
            subject: 'Chemistry',
            responses: 5,
            upvotes: 9,
            views: 56,
            helpers: ['Chemistry TA', 'Lab Assistant'],
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
        },
        {
            id: 'd4',
            anonymousId: generateAnonymousId(),
            title: 'Understanding Recursion in Programming',
            description: 'I get the basic idea of recursion but can\\'t solve problems on my own.Any tips for thinking recursively?',
            department: 'Computer Science',
            year: '1',
            subject: 'Programming',
            responses: 15,
            upvotes: 31,
            views: 234,
            helpers: ['CS Senior', 'Coding Mentor', 'Algorithm Expert', 'Teaching Assistant'],
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        },
        {
            id: 'd5',
            anonymousId: generateAnonymousId(),
            title: 'Thermodynamics Laws Confusion',
            description: 'Can someone explain the practical difference between the first and second law of thermodynamics with real examples?',
            department: 'Engineering',
            year: '2',
            subject: 'Physics',
            responses: 0,
            upvotes: 2,
            views: 18,
            helpers: [],
            createdAt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
        }
    ];
};

let doubtsData = generateDoubtsData();
let currentFilters = {
    department: '',
    subject: '',
    year: '',
    sort: 'recent'
};

// Load and display doubts
const loadDoubts = () => {
    const doubtsList = document.getElementById('doubtsList');
    const emptyState = document.getElementById('emptyState');

    let filteredDoubts = [...doubtsData];

    // Apply filters
    if (currentFilters.department) {
        filteredDoubts = filteredDoubts.filter(d => d.department === currentFilters.department);
    }
    if (currentFilters.subject) {
        filteredDoubts = filteredDoubts.filter(d => d.subject === currentFilters.subject);
    }
    if (currentFilters.year) {
        filteredDoubts = filteredDoubts.filter(d => d.year === currentFilters.year);
    }

    // Apply sorting
    if (currentFilters.sort === 'recent') {
        filteredDoubts.sort((a, b) => b.createdAt - a.createdAt);
    } else if (currentFilters.sort === 'popular') {
        filteredDoubts.sort((a, b) => b.upvotes - a.upvotes);
    } else if (currentFilters.sort === 'unanswered') {
        filteredDoubts = filteredDoubts.filter(d => d.responses === 0);
    }

    if (filteredDoubts.length === 0) {
        doubtsList.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    doubtsList.style.display = 'grid';
    emptyState.style.display = 'none';

    doubtsList.innerHTML = filteredDoubts.map(doubt => `
        <div class="doubt-card" onclick="showDoubtDetails('${doubt.id}')">
            <div class="doubt-header">
                <h3 class="doubt-title">${doubt.title}</h3>
                <div class="doubt-meta">
                    <span class="meta-badge department">${doubt.department}</span>
                    <span class="meta-badge year">${doubt.year}${getOrdinalSuffix(doubt.year)} Year</span>
                    <span class="meta-badge subject">${doubt.subject}</span>
                    <span>${formatTimeAgo(doubt.createdAt)}</span>
                </div>
            </div>
            
            <p class="doubt-description">${truncateText(doubt.description, 150)}</p>
            
            ${doubt.helpers.length > 0 ? `
                <div class="helpers-section">
                    <h4>🎓 Seniors/Peers Who Can Help:</h4>
                    <div class="helper-chips">
                        ${doubt.helpers.slice(0, 3).map((helper, index) => `
                            <div class="helper-chip">
                                <span class="helper-rank">#${index + 1}</span>
                                <span>${helper}</span>
                            </div>
                        `).join('')}
                        ${doubt.helpers.length > 3 ? `<span style="color: var(--text-light); font-size: 0.85rem;">+${doubt.helpers.length - 3} more</span>` : ''}
                    </div>
                </div>
            ` : ''}
            
            <div class="doubt-footer">
                <div class="doubt-author">
                    <span class="anonymous-badge">🔒 Anonymous</span>
                    <span>·</span>
                    <span>${doubt.department} Student</span>
                </div>
                <div class="doubt-stats">
                    <span class="stat">💬 ${doubt.responses}</span>
                    <span class="stat">👍 ${doubt.upvotes}</span>
                    <span class="stat">👁️ ${doubt.views}</span>
                </div>
            </div>
        </div>
    `).join('');
};

// Implement remaining functions (shortened for brevity - full implementation continues...)
const showDoubtDetails = (doubtId) => { /* Implementation */ };
const closeDetailsModal = () => { document.getElementById('doubtDetailsModal').classList.remove('active'); };
const closeDoubtModal = () => { document.getElementById('postDoubtModal').classList.remove('active'); };
const closeEmergencyModal = () => { document.getElementById('emergencyModal').classList.remove('active'); };
const getOrdinalSuffix = (year) => {
    const j = year % 10;
    const k = year % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
};
const truncateText = (text, maxLength) => text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadDoubts();
});
