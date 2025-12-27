// Mentorship Page JavaScript
const mockMentors = [
    { id: 'MENTOR_1', name: 'Dr. Sarah Chen', avatar: 'S', year: 'Graduate', department: 'Computer Science', bio: 'PhD student specializing in AI/ML. Happy to help with research, career guidance, and technical skills.', expertise: ['Machine Learning', 'Research', 'Career Advice'], mentees: 8, rating: 4.9, sessions: 45 },
    { id: 'MENTOR_2', name: 'Alex Rodriguez', avatar: 'A', year: '4', department: 'Engineering', bio: 'Senior student with internship experience at top tech companies. Can help with interview prep and project guidance.', expertise: ['Web Development', 'Interviews', 'Project Management'], mentees: 5, rating: 4.8, sessions: 32 },
    { id: 'MENTOR_3', name: 'Emily Zhang', avatar: 'E', year: '3', department: 'Design', bio: 'UI/UX designer passionate about helping others learn design thinking and build portfolios.', expertise: ['UI/UX Design', 'Portfolio Building', 'Figma'], mentees: 6, rating: 5.0, sessions: 28 },
    { id: 'MENTOR_4', name: 'James Wilson', avatar: 'J', year: 'Graduate', department: 'Business', bio: 'MBA student and startup founder. Mentoring on entrepreneurship, business strategy, and pitching.', expertise: ['Entrepreneurship', 'Business Strategy', 'Pitching'], mentees: 4, rating: 4.7, sessions: 20 }
];

let allMentors = [];
let myMentors = [];
let myMentees = [];
let currentFilter = 'available';

const initializeMentorshipPage = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) { window.location.href = 'login.html'; return; }

    const saved = localStorage.getItem('campusConnect_mentors');
    allMentors = saved ? JSON.parse(saved) : mockMentors;

    const savedMyMentors = localStorage.getItem('campusConnect_myMentors');
    myMentors = savedMyMentors ? JSON.parse(savedMyMentors) : [];

    const savedMentees = localStorage.getItem('campusConnect_myMentees');
    myMentees = savedMentees ? JSON.parse(savedMentees) : [];

    displayMentors();
};

const displayMentors = () => {
    const grid = document.getElementById('mentorsGrid');
    let dataToShow = [];

    switch (currentFilter) {
        case 'available':
            dataToShow = allMentors;
            break;
        case 'my':
            dataToShow = myMentors.length > 0 ? myMentors : [];
            break;
        case 'mentees':
            dataToShow = myMentees.length > 0 ? myMentees : [];
            break;
    }

    if (dataToShow.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-light);">No mentors to show</div>';
        return;
    }

    grid.innerHTML = dataToShow.map(mentor => `
        <div class="mentor-card">
            <span class="mentor-badge">⭐ Verified Mentor</span>
            <div class="mentor-header">
                <div class="mentor-avatar">${mentor.avatar}</div>
                <div class="mentor-info">
                    <h3>${mentor.name}</h3>
                    <p class="mentor-meta">${mentor.department} • ${mentor.year === 'Graduate' ? 'Graduate Student' : `Year ${mentor.year}`}</p>
                    <p class="mentor-rating">⭐ ${mentor.rating} (${mentor.sessions} sessions)</p>
                </div>
            </div>
            <p class="mentor-bio">${mentor.bio}</p>
            <div class="mentor-expertise">
                <h4>Areas of Expertise</h4>
                <div class="expertise-tags">
                    ${mentor.expertise.map(e => `<span class="expertise-tag">${e}</span>`).join('')}
                </div>
            </div>
            <div class="mentor-stats">
                <span>👥 ${mentor.mentees} mentees</span>
                <span>📚 ${mentor.sessions} sessions</span>
            </div>
            <div class="mentor-actions">
                ${currentFilter === 'available' ? `
                    <button class="btn btn-primary" onclick="requestMentorship('${mentor.id}', '${mentor.name}')">Request Mentorship</button>
                    <button class="btn btn-secondary" onclick="viewMentorProfile('${mentor.id}')">View Profile</button>
                ` : currentFilter === 'my' ? `
                    <button class="btn btn-secondary" onclick="scheduleMeeting('${mentor.name}')">Schedule Meeting</button>
                    <button class="btn btn-secondary" onclick="sendMessage('${mentor.name}')">Message</button>
                ` : `
                    <button class="btn btn-secondary" onclick="viewProgress('${mentor.name}')">View Progress</button>
                    <button class="btn btn-secondary" onclick="sendMessage('${mentor.name}')">Message</button>
                `}
            </div>
        </div>
    `).join('');
};

const filterMentors = (type) => {
    currentFilter = type;
    document.querySelectorAll('.mentor-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    displayMentors();
};

const requestMentorship = (id, name) => {
    const mentor = allMentors.find(m => m.id === id);
    if (mentor && !myMentors.find(m => m.id === id)) {
        myMentors.push(mentor);
        localStorage.setItem('campusConnect_myMentors', JSON.stringify(myMentors));
        alert(`Mentorship request sent to ${name}! They'll review your request soon.`);
    }
};

const becomeMentor = () => {
    alert('Become a mentor form coming soon! Share your expertise and help fellow students.');
};

const viewMentorProfile = (id) => {
    window.location.href = 'profile.html';
};

const scheduleMeeting = (name) => {
    alert(`Schedule a meeting with ${name} (calendar integration coming soon)`);
};

const sendMessage = (name) => {
    window.location.href = 'messages.html';
};

const viewProgress = (name) => {
    alert(`View progress tracking for ${name} (analytics coming soon)`);
};

document.addEventListener('DOMContentLoaded', initializeMentorshipPage);
