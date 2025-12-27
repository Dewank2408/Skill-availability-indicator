// Connections Page JavaScript
const mockConnectionRequests = [
    { id: 'REQ_1', from: 'Alex Kumar', avatar: 'A', department: 'Engineering', year: '3', bio: 'Passionate about AI and robotics', skills: ['Python', 'ROS', 'Machine Learning'], time: '2 hours ago', status: 'pending' },
    { id: 'REQ_2', from: 'Emma Williams', avatar: 'E', department: 'Computer Science', year: '2', bio: 'Web developer and open source contributor', skills: ['React', 'Node.js', 'GraphQL'], time: '1 day ago', status: 'pending' }
];

const mockConnections = [
    { id: 'CONN_1', name: 'Sarah Martinez', avatar: 'S', department: 'Computer Science', year: '3', bio: 'AI/ML enthusiast', skills: ['Python', 'TensorFlow'], connected: true },
    { id: 'CONN_2', name: 'Jessica Chen', avatar: 'J', department: 'Design', year: '2', bio: 'UI/UX designer', skills: ['Figma', 'Design'], connected: true },
    { id: 'CONN_3', name: 'Michael Johnson', avatar: 'M', department: 'Business', year: '4', bio: 'Entrepreneur', skills: ['Marketing', 'Strategy'], connected: true }
];

const mockSuggestions = [
    { id: 'SUG_1', name: 'David Brown', avatar: 'D', department: 'Engineering', year: '3', bio: 'Robotics engineer', skills: ['C++', 'Arduino'], matchScore: 85 },
    { id: 'SUG_2', name: 'Olivia Garcia', avatar: 'O', department: 'Computer Science', year: '2', bio: 'Full-stack developer', skills: ['JavaScript', 'Python'], matchScore: 78 }
];

let allConnections = [];
let connectionRequests = [];
let sentRequests = [];
let suggestions = [];
let currentFilter = 'all';

const initializeConnectionsPage = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) { window.location.href = 'login.html'; return; }

    // Load from localStorage or use mock data
    const savedConnections = localStorage.getItem('campusConnect_connections');
    allConnections = savedConnections ? JSON.parse(savedConnections) : mockConnections;

    const savedRequests = localStorage.getItem('campusConnect_connectionRequests');
    connectionRequests = savedRequests ? JSON.parse(savedRequests) : mockConnectionRequests;

    const savedSent = localStorage.getItem('campusConnect_sentRequests');
    sentRequests = savedSent ? JSON.parse(savedSent) : [];

    suggestions = mockSuggestions;

    updateStats();
    displayConnections();
};

const updateStats = () => {
    document.getElementById('totalConnections').textContent = allConnections.length;
    document.getElementById('pendingRequests').textContent = connectionRequests.length;
    document.getElementById('requestsBadge').textContent = connectionRequests.length;
};

const displayConnections = () => {
    const grid = document.getElementById('connectionsGrid');
    let dataToShow = [];

    switch (currentFilter) {
        case 'all':
            dataToShow = allConnections;
            break;
        case 'requests':
            dataToShow = connectionRequests;
            break;
        case 'sent':
            dataToShow = sentRequests;
            break;
        case 'suggestions':
            dataToShow = suggestions;
            break;
    }

    if (dataToShow.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-light);">No connections to show</div>';
        return;
    }

    grid.innerHTML = dataToShow.map(conn => {
        const name = conn.name || conn.from;
        const isRequest = currentFilter === 'requests';
        const isSent = currentFilter === 'sent';
        const isSuggestion = currentFilter === 'suggestions';

        return `
            <div class="connection-card">
                <div class="connection-header">
                    <div class="connection-avatar">${conn.avatar}</div>
                    <div class="connection-info">
                        <h3>${name}</h3>
                        <p class="connection-meta">${conn.department} • ${conn.year}${conn.year === 'Graduate' ? '' : getRealOrdinalSuffix(conn.year)} Year</p>
                        ${isSuggestion ? `<p class="connection-meta" style="color: var(--primary-color); font-weight: 600;">${conn.matchScore}% match</p>` : ''}
                    </div>
                </div>
                <p class="connection-bio">${conn.bio}</p>
                <div class="connection-skills">
                    ${conn.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                </div>
                <div class="connection-actions">
                    ${isRequest ? `
                        <button class="btn btn-primary" onclick="acceptRequest('${conn.id}')">Accept</button>
                        <button class="btn btn-secondary" onclick="rejectRequest('${conn.id}')">Decline</button>
                    ` : isSent ? `
                        <button class="btn btn-secondary" onclick="cancelRequest('${conn.id}')">Cancel Request</button>
                    ` : isSuggestion ? `
                        <button class="btn btn-primary" onclick="sendConnectionRequest('${conn.id}', '${name}')">Connect</button>
                        <button class="btn btn-secondary" onclick="viewProfile('${conn.id}')">View Profile</button>
                    ` : `
                        <button class="btn btn-secondary" onclick="viewProfile('${conn.id}')">View Profile</button>
                        <button class="btn btn-secondary" onclick="sendMessage('${name}')">Message</button>
                    `}
                </div>
                ${isRequest ? `<p class="request-time">Received ${conn.time}</p>` : ''}
            </div>
        `;
    }).join('');
};

const getRealOrdinalSuffix = (year) => {
    if (year === 'Graduate') return '';
    const j = parseInt(year) % 10;
    const k = parseInt(year) % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
};

const filterConnections = (type) => {
    currentFilter = type;
    document.querySelectorAll('.connection-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    displayConnections();
};

const acceptRequest = (id) => {
    const request = connectionRequests.find(r => r.id === id);
    if (request) {
        // Add to connections
        allConnections.push({
            id: 'CONN_' + Date.now(),
            name: request.from,
            avatar: request.avatar,
            department: request.department,
            year: request.year,
            bio: request.bio,
            skills: request.skills,
            connected: true
        });

        // Remove from requests
        connectionRequests = connectionRequests.filter(r => r.id !== id);

        // Save
        localStorage.setItem('campusConnect_connections', JSON.stringify(allConnections));
        localStorage.setItem('campusConnect_connectionRequests', JSON.stringify(connectionRequests));

        updateStats();
        displayConnections();
        alert(`You're now connected with ${request.from}!`);
    }
};

const rejectRequest = (id) => {
    connectionRequests = connectionRequests.filter(r => r.id !== id);
    localStorage.setItem('campusConnect_connectionRequests', JSON.stringify(connectionRequests));
    updateStats();
    displayConnections();
    alert('Request declined');
};

const sendConnectionRequest = (id, name) => {
    const suggestion = suggestions.find(s => s.id === id);
    if (suggestion) {
        sentRequests.push({
            id: 'SENT_' + Date.now(),
            name: suggestion.name,
            avatar: suggestion.avatar,
            department: suggestion.department,
            year: suggestion.year,
            bio: suggestion.bio,
            skills: suggestion.skills,
            time: 'Just now',
            status: 'sent'
        });

        localStorage.setItem('campusConnect_sentRequests', JSON.stringify(sentRequests));
        alert(`Connection request sent to ${name}!`);
    }
};

const cancelRequest = (id) => {
    sentRequests = sentRequests.filter(r => r.id !== id);
    localStorage.setItem('campusConnect_sentRequests', JSON.stringify(sentRequests));
    displayConnections();
    alert('Request cancelled');
};

const viewProfile = (id) => {
    window.location.href = 'profile.html';
};

const sendMessage = (name) => {
    window.location.href = 'messages.html';
};

document.addEventListener('DOMContentLoaded', initializeConnectionsPage);
