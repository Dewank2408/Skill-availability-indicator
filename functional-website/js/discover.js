// Discover Page JavaScript for Campus Connect

// Mock students database (in production, this would come from backend)
const generateMockStudents = () => {
    const departments = ['Computer Science', 'Engineering', 'Business', 'Arts', 'Science', 'Mathematics'];
    const years = ['1', '2', '3', '4', 'Graduate'];
    const skills = ['Python', 'JavaScript', 'Java', 'React', 'Node.js', 'Machine Learning', 'Data Science', 'Design', 'Communication', 'Leadership'];
    const interests = ['Web Development', 'AI/ML', 'Mobile Dev', 'Design', 'Data Science', 'Cybersecurity', 'Research', 'Startups', 'Music', 'Sports'];
    const names = [
        'Sarah Martinez', 'Alex Kumar', 'Jessica Chen', 'Michael Johnson', 'Emma Williams',
        'David Brown', 'Olivia Garcia', 'James Lee', 'Sophia Rodriguez', 'Daniel Kim',
        'Isabella Taylor', 'Matthew Anderson', 'Mia Thomas', 'Christopher White', 'Charlotte Harris'
    ];

    const mockStudents = names.map((name, index) => ({
        id: `STUDENT_${index + 1}`,
        fullName: name,
        department: departments[Math.floor(Math.random() * departments.length)],
        year: years[Math.floor(Math.random() * years.length)],
        bio: 'Passionate student interested in technology and innovation. Looking to collaborate on exciting projects.',
        skills: skills.sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 3)),
        interests: interests.sort(() => 0.5 - Math.random()).slice(0, 2 + Math.floor(Math.random() * 3)),
        connections: Math.floor(Math.random() * 50),
        projects: Math.floor(Math.random() * 10),
        badges: Math.floor(Math.random() * 8)
    }));

    return mockStudents;
};

// AI-Powered Recommendation Algorithm
const calculateMatchScore = (currentUser, student) => {
    let score = 0;

    // Check for common skills
    const commonSkills = currentUser.skills?.filter(skill =>
        student.skills.some(s => typeof s === 'string' ? s === skill.name : s === skill)
    ) || [];
    score += commonSkills.length * 20;

    // Check for common interests
    const commonInterests = currentUser.interests?.filter(interest =>
        student.interests.includes(interest)
    ) || [];
    score += commonInterests.length * 15;

    // Same department bonus
    if (currentUser.department === student.department) {
        score += 10;
    }

    // Same year bonus
    if (currentUser.year === student.year) {
        score += 5;
    }

    // Normalize score to 0-100
    return Math.min(100, score);
};

// Get AI recommendations
const getRecommendations = (currentUser, allStudents) => {
    return allStudents
        .map(student => ({
            ...student,
            matchScore: calculateMatchScore(currentUser, student)
        }))
        .filter(student => student.matchScore > 30) // Only recommend if match score > 30%
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 6); // Top 6 recommendations
};

// Render peer card
const renderPeerCard = (student, isRecommended = false) => {
    const avatar = student.fullName.charAt(0).toUpperCase();
    const yearSuffix = student.year === 'Graduate' ? '' : getOrdinalSuffix(student.year);
    const yearDisplay = student.year === 'Graduate' ? 'Graduate' : `${student.year}${yearSuffix} Year`;

    return `
        <div class="peer-card ${isRecommended ? 'recommended' : ''}">
            ${isRecommended ? '<span class="recommended-badge">⭐ Recommended</span>' : ''}
            ${student.matchScore ? `<span class="match-score">${student.matchScore}% match</span>` : ''}
            
            <div class="peer-header">
                <div class="peer-avatar">${avatar}</div>
                <div class="peer-info">
                    <h3>${student.fullName}</h3>
                    <p class="peer-meta">${student.department} • ${yearDisplay}</p>
                </div>
            </div>
            
            <p class="peer-bio">${student.bio}</p>
            
            <div class="peer-skills">
                ${student.skills.slice(0, 3).map(skill => {
        const skillName = typeof skill === 'string' ? skill : skill.name;
        return `<span class="peer-skill-tag">${skillName}</span>`;
    }).join('')}
                ${student.skills.length > 3 ? `<span class="peer-skill-tag">+${student.skills.length - 3} more</span>` : ''}
            </div>
            
            <div class="peer-interests">
                ${student.interests.slice(0, 3).map(interest =>
        `<span class="peer-interest-tag">${interest}</span>`
    ).join('')}
            </div>
            
            <div class="peer-stats">
                <div class="peer-stat">
                    <strong>${student.connections}</strong>
                    <span>Connections</span>
                </div>
                <div class="peer-stat">
                    <strong>${student.projects}</strong>
                    <span>Projects</span>
                </div>
                <div class="peer-stat">
                    <strong>${student.badges}</strong>
                    <span>Badges</span>
                </div>
            </div>
            
            <div class="peer-actions">
                <button class="btn btn-small btn-connect" onclick="sendConnectionRequest('${student.fullName}')">
                    Connect
                </button>
                <button class="btn btn-small btn-view" onclick="viewProfile('${student.id}')">
                    View Profile
                </button>
            </div>
        </div>
    `;
};

// Helper function for ordinal suffix
const getOrdinalSuffix = (year) => {
    const j = year % 10;
    const k = year % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
};

// Filter students
const filterStudents = (students, filters) => {
    return students.filter(student => {
        // Department filter
        if (filters.department && student.department !== filters.department) {
            return false;
        }

        // Year filter
        if (filters.year && student.year !== filters.year) {
            return false;
        }

        // Skill filter
        if (filters.skill) {
            const hasSkill = student.skills.some(skill => {
                const skillName = typeof skill === 'string' ? skill : skill.name;
                return skillName.toLowerCase().includes(filters.skill.toLowerCase());
            });
            if (!hasSkill) return false;
        }

        // Interest filter
        if (filters.interest) {
            const hasInterest = student.interests.some(interest =>
                interest.toLowerCase().includes(filters.interest.toLowerCase())
            );
            if (!hasInterest) return false;
        }

        return true;
    });
};

// Load all students
let allStudents = [];
let currentFilters = {};

const loadDiscoverPage = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Generate mock students
    allStudents = generateMockStudents();

    // Load AI recommendations
    const recommendations = getRecommendations(currentUser, allStudents);
    const recommendedPeersContainer = document.getElementById('recommendedPeers');

    if (recommendations.length > 0) {
        recommendedPeersContainer.innerHTML = recommendations.map(student =>
            renderPeerCard(student, true)
        ).join('');
    } else {
        recommendedPeersContainer.innerHTML = '<p>No recommendations yet. Complete your profile to get better matches!</p>';
    }

    // Load all students
    displayStudents(allStudents);
};

// Display students
const displayStudents = (students) => {
    const allPeersContainer = document.getElementById('allPeers');
    const resultsCount = document.getElementById('resultsCount');
    const emptyState = document.getElementById('emptyState');

    if (students.length === 0) {
        allPeersContainer.style.display = 'none';
        emptyState.style.display = 'block';
        resultsCount.textContent = '0 results';
        return;
    }

    allPeersContainer.style.display = 'grid';
    emptyState.style.display = 'none';
    resultsCount.textContent = `${students.length} result${students.length !== 1 ? 's' : ''}`;

    allPeersContainer.innerHTML = students.map(student =>
        renderPeerCard(student, false)
    ).join('');
};

// Filter toggle
const filterToggle = document.getElementById('filterToggle');
const filtersContainer = document.getElementById('filtersContainer');

if (filterToggle) {
    filterToggle.addEventListener('click', () => {
        filtersContainer.classList.toggle('hidden');
    });
}

// Apply filters
const applyFilters = document.getElementById('applyFilters');
if (applyFilters) {
    applyFilters.addEventListener('click', () => {
        currentFilters = {
            department: document.getElementById('filterDepartment').value,
            year: document.getElementById('filterYear').value,
            skill: document.getElementById('filterSkill').value,
            interest: document.getElementById('filterInterest').value
        };

        const filteredStudents = filterStudents(allStudents, currentFilters);
        displayStudents(filteredStudents);
    });
}

// Clear filters
const clearFilters = document.getElementById('clearFilters');
if (clearFilters) {
    clearFilters.addEventListener('click', () => {
        document.getElementById('filterDepartment').value = '';
        document.getElementById('filterYear').value = '';
        document.getElementById('filterSkill').value = '';
        document.getElementById('filterInterest').value = '';
        currentFilters = {};
        displayStudents(allStudents);
    });
}

// Search functionality
const discoverSearch = document.getElementById('discoverSearch');
if (discoverSearch) {
    discoverSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        if (query.length === 0) {
            displayStudents(filterStudents(allStudents, currentFilters));
            return;
        }

        const searchResults = allStudents.filter(student => {
            const nameMatch = student.fullName.toLowerCase().includes(query);
            const skillMatch = student.skills.some(skill => {
                const skillName = typeof skill === 'string' ? skill : skill.name;
                return skillName.toLowerCase().includes(query);
            });
            const interestMatch = student.interests.some(interest =>
                interest.toLowerCase().includes(query)
            );

            return nameMatch || skillMatch || interestMatch;
        });

        displayStudents(filterStudents(searchResults, currentFilters));
    });
}

// Send connection request
const sendConnectionRequest = (name) => {
    alert(`Connection request sent to ${name}!`);
    // In production, this would call an API
};

// View profile
const viewProfile = (studentId) => {
    alert(`Viewing profile for student ${studentId}`);
    // In production, this would navigate to the student's profile page
};

// Initialize discover page
document.addEventListener('DOMContentLoaded', () => {
    loadDiscoverPage();
});
