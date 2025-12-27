// Events JavaScript
const mockEvents = [
    { id: 'EVT_1', title: 'Tech Hackathon 2025', description: 'Build innovative solutions in 24 hours', type: 'hackathon', date: '2025-01-15', time: '9:00 AM', location: 'Tech Hub', attendees: 120, attending: false },
    { id: 'EVT_2', title: 'AI/ML Workshop', description: 'Hands-on machine learning workshop', type: 'workshop', date: '2025-01-20', time: '2:00 PM', location: 'Lab 3', attendees: 45, attending: true },
    { id: 'EVT_3', title: 'Career Fair 2025', description: 'Meet top tech companies', type: 'career', date: '2025-01-25', time: '10:00 AM', location: 'Main Hall', attendees: 200, attending: false },
    { id: 'EVT_4', title: 'Web Dev Seminar', description: 'Modern web development trends', type: 'seminar', date: '2025-01-18', time: '4:00 PM', location: 'Auditorium', attendees: 80, attending: true },
    { id: 'EVT_5', title: 'Student Mixer', description: 'Network with fellow students', type: 'social', date: '2025-01-12', time: '6:00 PM', location: 'Cafeteria', attendees: 150, attending: false }
];

let allEvents = [];
let currentFilter = 'upcoming';

const initializeEventsPage = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) { window.location.href = 'login.html'; return; }
    const saved = localStorage.getItem('campusConnect_events');
    allEvents = saved ? JSON.parse(saved) : mockEvents;
    displayEvents();
};

const displayEvents = () => {
    const grid = document.getElementById('eventsGrid');
    let filtered = allEvents;
    if (currentFilter === 'attending') filtered = allEvents.filter(e => e.attending);
    if (currentFilter === 'past') filtered = [];

    if (filtered.length === 0) { grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-light);">No events found</div>'; return; }

    grid.innerHTML = filtered.map(e => {
        const eventDate = new Date(e.date);
        const day = eventDate.getDate();
        const month = eventDate.toLocaleString('default', { month: 'short' });
        return `
        <div class="event-card">
            <div class="event-header">
                <div class="event-date">${day}</div>
                <div class="event-month">${month}</div>
            </div>
            <div class="event-body">
                <span class="event-type">${e.type}</span>
                <h3>${e.title}</h3>
                <p style="color: var(--text-color); margin-bottom: 1rem;">${e.description}</p>
                <p class="event-meta">⏰ ${e.time} • 📍 ${e.location}</p>
                <div class="event-stats"><span>👥 ${e.attendees} attending</span></div>
                <div class="event-actions">
                    ${e.attending ?
                `<button class="btn btn-secondary" onclick="cancelRSVP('${e.id}')">Cancel RSVP</button>` :
                `<button class="btn btn-primary" onclick="rsvpEvent('${e.id}')">RSVP</button>`}
                    <button class="btn btn-secondary" onclick="shareEvent('${e.id}')">Share</button>
                </div>
            </div>
        </div>
    `}).join('');
};

const filterEvents = (type) => { currentFilter = type; document.querySelectorAll('.event-tabs .tab-btn').forEach(b => b.classList.remove('active')); event.target.classList.add('active'); displayEvents(); };
const showCreateEventModal = () => document.getElementById('createEventModal').classList.add('active');
const closeCreateEventModal = () => { document.getElementById('createEventModal').classList.remove('active'); document.getElementById('createEventForm').reset(); };

const rsvpEvent = (id) => {
    const evt = allEvents.find(e => e.id === id);
    if (evt) { evt.attending = true; evt.attendees++; localStorage.setItem('campusConnect_events', JSON.stringify(allEvents)); displayEvents(); alert(`RSVP confirmed for "${evt.title}"!`); }
};

const cancelRSVP = (id) => {
    const evt = allEvents.find(e => e.id === id);
    if (evt) { evt.attending = false; evt.attendees--; localStorage.setItem('campusConnect_events', JSON.stringify(allEvents)); displayEvents(); alert(`RSVP cancelled for "${evt.title}"`); }
};

const shareEvent = (id) => alert('Share event (feature coming soon)');

document.getElementById('createEventForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newEvt = { id: 'EVT_' + Date.now(), title: document.getElementById('eventTitle').value, description: document.getElementById('eventDescription').value, type: document.getElementById('eventType').value, date: document.getElementById('eventDate').value, time: document.getElementById('eventTime').value, location: document.getElementById('eventLocation').value, attendees: 1, attending: true };
    allEvents.unshift(newEvt);
    localStorage.setItem('campusConnect_events', JSON.stringify(allEvents));
    closeCreateEventModal(); displayEvents(); alert('Event created!');
});

document.addEventListener('DOMContentLoaded', initializeEventsPage);
