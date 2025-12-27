// Communities JavaScript
const mockCommunities = [
    { id: 'COM_1', name: 'Web Dev Enthusiasts', icon: '💻', description: 'Share resources, discuss trends, and collaborate on web projects', category: 'tech', members: 145, posts: 89, joined: true },
    { id: 'COM_2', name: 'AI/ML Research Club', icon: '🤖', description: 'Explore cutting-edge AI research and build ML models together', category: 'academic', members: 98, posts: 67, joined: false },
    { id: 'COM_3', name: 'Design Collective', icon: '🎨', description: 'UI/UX designers sharing portfolios, feedback, and design challenges', category: 'creative', members: 76, posts: 112, joined: true },
    { id: 'COM_4', name: 'Startup Founders', icon: '🚀', description: 'Connect with fellow entrepreneurs and share startup journeys', category: 'social', members: 54, posts: 43, joined: false },
    { id: 'COM_5', name: 'Music Production', icon: '🎵', description: 'Collaborate on music projects and share production techniques', category: 'creative', members: 62, posts: 55, joined: false },
    { id: 'COM_6', name: 'Photography Club', icon: '📸', description: 'Share photos, techniques, and organize photowalk events', category: 'creative', members: 88, posts: 134, joined: true }
];

let allCommunities = [];
let currentFilter = 'all';

const initializeCommunitiesPage = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) { window.location.href = 'login.html'; return; }
    const saved = localStorage.getItem('campusConnect_communities');
    allCommunities = saved ? JSON.parse(saved) : mockCommunities;
    displayCommunities();
};

const displayCommunities = () => {
    const grid = document.getElementById('communitiesGrid');
    let filtered = allCommunities;
    if (currentFilter === 'joined') filtered = allCommunities.filter(c => c.joined);
    if (currentFilter === 'recommended') filtered = allCommunities.filter(c => !c.joined).slice(0, 6);

    if (filtered.length === 0) { grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-light);">No communities found</div>'; return; }

    grid.innerHTML = filtered.map(c => `
        <div class="community-card">
            <div class="community-icon">${c.icon}</div>
            <h3>${c.name}</h3>
            <p class="community-meta">${c.category}</p>
            <p style="color: var(--text-color); margin-bottom: 1rem;">${c.description}</p>
            <div class="community-stats"><span>${c.members} members</span><span>${c.posts} posts</span></div>
            <div class="community-actions">
                ${c.joined ?
            `<button class="btn btn-secondary" onclick="viewCommunity('${c.id}')">View</button>` :
            `<button class="btn btn-primary" onclick="joinCommunity('${c.id}')">Join</button>`}
            </div>
        </div>
    `).join('');
};

const filterCommunities = (type) => { currentFilter = type; document.querySelectorAll('.community-tabs .tab-btn').forEach(b => b.classList.remove('active')); event.target.classList.add('active'); displayCommunities(); };
const showCreateCommunityModal = () => document.getElementById('createCommunityModal').classList.add('active');
const closeCreateCommunityModal = () => { document.getElementById('createCommunityModal').classList.remove('active'); document.getElementById('createCommunityForm').reset(); };

const joinCommunity = (id) => {
    const com = allCommunities.find(c => c.id === id);
    if (com) { com.joined = true; com.members++; localStorage.setItem('campusConnect_communities', JSON.stringify(allCommunities)); displayCommunities(); alert(`Joined "${com.name}"!`); }
};

const viewCommunity = (id) => alert('View community (feature coming soon)');

document.getElementById('createCommunityForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newCom = { id: 'COM_' + Date.now(), name: document.getElementById('communityName').value, description: document.getElementById('communityDescription').value, category: document.getElementById('communityCategory').value, icon: '✨', members: 1, posts: 0, joined: true };
    allCommunities.unshift(newCom);
    localStorage.setItem('campusConnect_communities', JSON.stringify(allCommunities));
    closeCreateCommunityModal(); displayCommunities(); alert('Community created!');
});

document.addEventListener('DOMContentLoaded', initializeCommunitiesPage);
