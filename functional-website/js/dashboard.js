// Dashboard JavaScript for Campus Connect

// Mock data generator
const generateMockData = () => {
    const users = JSON.parse(localStorage.getItem('campusConnect_users') || '[]');
    const currentUser = getCurrentUser();

    if (!currentUser) return;

    // Initialize dashboard data if not exists
    if (!localStorage.getItem('campusConnect_dashboardData')) {
        const mockData = {
            activityFeed: [],
            recommendedProjects: [],
            connectionRequests: [],
            suggestedConnections: [],
            upcomingEvents: [],
            notifications: []
        };
        localStorage.setItem('campusConnect_dashboardData', JSON.stringify(mockData));
    }
};

// Load dashboard statistics
const loadDashboardStats = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    // Update stats
    document.getElementById('connectionsCount').textContent = currentUser.connections?.length || 0;
    document.getElementById('projectsCount').textContent = currentUser.projects?.length || 0;
    document.getElementById('communitiesCount').textContent = currentUser.communities?.length || 0;
    document.getElementById('badgesCount').textContent = currentUser.badges?.length || 0;
};

// Load activity feed
const loadActivityFeed = () => {
    const activityFeed = document.getElementById('activityFeed');
    if (!activityFeed) return;

    const activities = [
        { type: 'connection', user: 'Sarah Martinez', action: 'accepted your connection request', time: '2 hours ago', icon: '🤝' },
        { type: 'project', user: 'Alex Kumar', action: 'invited you to join "AI Study Group"', time: '5 hours ago', icon: '📁' },
        { type: 'endorsement', user: 'Jessica Chen', action: 'endorsed you for Python', time: '1 day ago', icon: '⭐' },
        { type: 'community', user: 'Web Dev Community', action: 'posted a new resource', time: '1 day ago', icon: '👥' },
        { type: 'event', user: 'Hackathon 2025', action: 'is starting tomorrow', time: '2 days ago', icon: '📅' }
    ];

    activityFeed.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <p><strong>${activity.user}</strong> ${activity.action}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
};

// Load recommended projects
const loadRecommendedProjects = () => {
    const projectList = document.getElementById('recommendedProjects');
    if (!projectList) return;

    const projects = [
        { title: 'Machine Learning Study Group', skills: ['Python', 'TensorFlow'], members: 5, icon: '🤖' },
        { title: 'Web Development Workshop', skills: ['JavaScript', 'React'], members: 8, icon: '💻' },
        { title: 'Research Paper Discussion', skills: ['Research', 'Writing'], members: 4, icon: '📚' }
    ];

    projectList.innerHTML = projects.map(project => `
        <div class="project-item">
            <div class="project-icon">${project.icon}</div>
            <div class="project-info">
                <h4>${project.title}</h4>
                <div class="project-skills">
                    ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <p class="project-members">${project.members} members</p>
            </div>
            <button class="btn btn-small" onclick="alert('Join project feature coming soon!')">Join</button>
        </div>
    `).join('');
};

// Load connection requests
const loadConnectionRequests = () => {
    const requestsContainer = document.getElementById('connectionRequests');
    if (!requestsContainer) return;

    const requests = [
        { name: 'Michael Johnson', department: 'Computer Science', year: '3rd Year', skills: ['Java', 'Android'] },
        { name: 'Emma Williams', department: 'Engineering', year: '2nd Year', skills: ['Python', 'Data Science'] }
    ];

    if (requests.length === 0) {
        requestsContainer.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 1rem;">No pending requests</p>';
        return;
    }

    requestsContainer.innerHTML = requests.map(request => `
        <div class="connection-request-item">
            <div class="connection-avatar">
                <div class="avatar-placeholder">${request.name.charAt(0)}</div>
            </div>
            <div class="connection-info">
                <h4>${request.name}</h4>
                <p>${request.department} • ${request.year}</p>
                <div class="connection-skills">
                    ${request.skills.slice(0, 2).map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="connection-actions">
                <button class="btn-icon btn-accept" onclick="acceptConnection('${request.name}')" title="Accept">✓</button>
                <button class="btn-icon btn-reject" onclick="rejectConnection('${request.name}')" title="Reject">✕</button>
            </div>
        </div>
    `).join('');
};

// Load suggested connections
const loadSuggestedConnections = () => {
    const suggestionsContainer = document.getElementById('suggestedConnections');
    if (!suggestionsContainer) return;

    const suggestions = [
        { name: 'David Brown', department: 'Computer Science', year: '3rd Year', commonSkills: 3, matchScore: 95 },
        { name: 'Olivia Garcia', department: 'Business', year: '4th Year', commonSkills: 2, matchScore: 87 },
        { name: 'James Lee', department: 'Engineering', year: '2nd Year', commonSkills: 4, matchScore: 92 }
    ];

    suggestionsContainer.innerHTML = suggestions.map(person => `
        <div class="suggested-person">
            <div class="person-avatar">${person.name.charAt(0)}</div>
            <div class="person-info">
                <h4>${person.name}</h4>
                <p>${person.department}</p>
                <span class="match-score">${person.matchScore}% match</span>
            </div>
            <button class="btn btn-small" onclick="sendConnectionRequest('${person.name}')">Connect</button>
        </div>
    `).join('');
};

// Load upcoming events
const loadUpcomingEvents = () => {
    const eventsContainer = document.getElementById('upcomingEvents');
    if (!eventsContainer) return;

    const events = [
        { title: 'Tech Hackathon 2025', date: 'Jan 15, 2025', type: 'Hackathon', attendees: 45 },
        { title: 'AI/ML Workshop', date: 'Jan 20, 2025', type: 'Workshop', attendees: 28 },
        { title: 'Career Fair', date: 'Jan 25, 2025', type: 'Event', attendees: 120 }
    ];

    eventsContainer.innerHTML = events.map(event => `
        <div class="event-item">
            <div class="event-date">
                <span class="event-day">${event.date.split(' ')[1].replace(',', '')}</span>
                <span class="event-month">${event.date.split(' ')[0]}</span>
            </div>
            <div class="event-details">
                <h4>${event.title}</h4>
                <p>${event.type} • ${event.attendees} attending</p>
            </div>
        </div>
    `).join('');
};

// Load notifications
const loadNotifications = () => {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;

    const notifications = [
        { text: 'Sarah Martinez accepted your connection request', time: '2 hours ago', read: false },
        { text: 'You were invited to "AI Study Group"', time: '5 hours ago', read: false },
        { text: 'New event: Tech Hackathon 2025', time: '1 day ago', read: false },
        { text: 'Jessica Chen endorsed you for Python', time: '1 day ago', read: true },
        { text: 'Upcoming: AI/ML Workshop tomorrow', time: '2 days ago', read: true }
    ];

    notificationsList.innerHTML = notifications.map(notif => `
        <div class="notification-item ${notif.read ? 'read' : 'unread'}">
            <p>${notif.text}</p>
            <span class="notification-time">${notif.time}</span>
        </div>
    `).join('');
};

// Accept connection request
const acceptConnection = (name) => {
    alert(`Connection request from ${name} accepted!`);
    loadConnectionRequests();
    updateRequestsCount();
};

// Reject connection request
const rejectConnection = (name) => {
    alert(`Connection request from ${name} rejected.`);
    loadConnectionRequests();
    updateRequestsCount();
};

// Send connection request
const sendConnectionRequest = (name) => {
    alert(`Connection request sent to ${name}!`);
};

// Update connection requests count
const updateRequestsCount = () => {
    // This would be updated based on actual data
    document.getElementById('requestsCount').textContent = '1';
};

// Mark all notifications as read
const markAllRead = () => {
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.classList.remove('unread');
        item.classList.add('read');
    });
    alert('All notifications marked as read!');
};

// Refresh activity feed
const refreshFeed = () => {
    loadActivityFeed();
    alert('Activity feed refreshed!');
};

// Toggle sidebar
const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
};

// Notifications dropdown toggle
const notificationsBtn = document.getElementById('notificationsBtn');
const notificationsDropdown = document.getElementById('notificationsDropdown');

if (notificationsBtn && notificationsDropdown) {
    notificationsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationsDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!notificationsDropdown.contains(e.target) && !notificationsBtn.contains(e.target)) {
            notificationsDropdown.classList.remove('active');
        }
    });
}

// Sidebar toggle
const sidebarToggle = document.getElementById('sidebarToggle');
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
}

// Global search
const globalSearch = document.getElementById('globalSearch');
if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            console.log('Searching for:', query);
            // Implement search functionality
        }
    });
}

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', () => {
    generateMockData();
    loadDashboardStats();
    loadActivityFeed();
    loadRecommendedProjects();
    loadConnectionRequests();
    loadSuggestedConnections();
    loadUpcomingEvents();
    loadNotifications();
});
