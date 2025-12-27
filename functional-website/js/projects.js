// Projects Page JavaScript
const mockProjects = [
    {
        id: 'PROJ_1',
        title: 'AI Study Group',
        description: 'Weekly meetings to discuss machine learning concepts, work on projects together, and prepare for AI/ML career opportunities.',
        category: 'study',
        skills: ['Python', 'TensorFlow', 'Machine Learning'],
        teamSize: 8,
        currentMembers: 5,
        owner: 'You',
        members: ['You', 'Alex K.', 'Sarah M.', 'Jessica C.', 'Michael J.'],
        status: 'active',
        created: '2 weeks ago'
    },
    {
        id: 'PROJ_2',
        title: 'Campus Event App',
        description: 'Building a mobile app to help students discover and manage campus events. Looking for React Native developers and UI/UX designers.',
        category: 'development',
        skills: ['React Native', 'Node.js', 'UI/UX Design'],
        teamSize: 6,
        currentMembers: 3,
        owner: 'Emma Williams',
        members: ['Emma W.', 'David B.', 'Olivia G.'],
        status: 'recruiting',
        created: '1 week ago'
    },
    {
        id: 'PROJ_3',
        title: 'Research Paper Discussion',
        description: 'Monthly paper reading group focused on computer vision and deep learning research. Share insights and debate methodologies.',
        category: 'research',
        skills: ['Research', 'Python', 'Computer Vision'],
        teamSize: 10,
        currentMembers: 7,
        owner: 'Dr. Johnson',
        members: ['Dr. Johnson', 'Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank'],
        status: 'active',
        created: '1 month ago'
    },
    {
        id: 'PROJ_4',
        title: 'Hackathon 2025 Team',
        description: 'Forming a team for the upcoming Tech Hackathon. Focus on sustainability and climate tech solutions. Need developers and designers.',
        category: 'hackathon',
        skills: ['JavaScript', 'Python', 'Design', 'Problem Solving'],
        teamSize: 4,
        currentMembers: 2,
        owner: 'Sarah Martinez',
        members: ['Sarah M.', 'Alex K.'],
        status: 'recruiting',
        created: '3 days ago'
    },
    {
        id: 'PROJ_5',
        title: 'UI/UX Design Portfolio',
        description: 'Collaborative project to build an interactive design portfolio showcasing student work. Great for building portfolio pieces!',
        category: 'design',
        skills: ['Figma', 'UI Design', 'Prototyping'],
        teamSize: 5,
        currentMembers: 4,
        owner: 'Jessica Chen',
        members: ['Jessica C.', 'Emma W.', 'Olivia G.', 'Sarah M.'],
        status: 'active',
        created: '2 weeks ago'
    }
];

let allProjects = [];
let currentFilter = 'all';

const initializeProjectsPage = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const savedProjects = localStorage.getItem('campusConnect_projects');
    allProjects = savedProjects ? JSON.parse(savedProjects) : mockProjects;

    displayProjects();
};

const displayProjects = () => {
    const projectsGrid = document.getElementById('projectsGrid');
    const currentUser = getCurrentUser();

    let filteredProjects = allProjects;

    switch (currentFilter) {
        case 'my':
            filteredProjects = allProjects.filter(p => p.owner === 'You' || p.owner === currentUser?.fullName);
            break;
        case 'joined':
            filteredProjects = allProjects.filter(p =>
                p.members.includes('You') && p.owner !== 'You'
            );
            break;
        case 'invites':
            filteredProjects = []; // Would show invitations
            break;
    }

    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-light);">No projects found. Create your first project!</div>';
        return;
    }

    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card">
            <div class="project-header">
                <span class="project-badge ${project.category}">${project.category}</span>
            </div>
            
            <h3>${project.title}</h3>
            <p class="project-meta">Created by ${project.owner} • ${project.created}</p>
            <p class="project-description">${project.description}</p>
            
            <div class="project-skills">
                ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            
            <div class="project-team">
                <div class="team-avatars">
                    ${project.members.slice(0, 3).map(m => `
                        <div class="team-avatar">${m.charAt(0)}</div>
                    `).join('')}
                    ${project.currentMembers > 3 ? `<div class="team-avatar">+${project.currentMembers - 3}</div>` : ''}
                </div>
                <span class="team-count">${project.currentMembers}/${project.teamSize} members</span>
            </div>
            
            <div class="project-actions">
                ${project.owner === 'You' ?
            `<button class="btn btn-secondary" onclick="manageProject('${project.id}')">Manage</button>` :
            project.members.includes('You') ?
                `<button class="btn btn-secondary" onclick="viewProject('${project.id}')">View</button>` :
                `<button class="btn btn-primary" onclick="joinProject('${project.id}')">Join Project</button>`
        }
            </div>
        </div>
    `).join('');
};

const filterProjects = (type) => {
    currentFilter = type;
    document.querySelectorAll('.project-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    displayProjects();
};

const showCreateProjectModal = () => {
    document.getElementById('createProjectModal').classList.add('active');
};

const closeCreateProjectModal = () => {
    document.getElementById('createProjectModal').classList.remove('active');
    document.getElementById('createProjectForm').reset();
};

const createProjectForm = document.getElementById('createProjectForm');
if (createProjectForm) {
    createProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newProject = {
            id: 'PROJ_' + Date.now(),
            title: document.getElementById('projectTitle').value,
            description: document.getElementById('projectDescription').value,
            category: document.getElementById('projectCategory').value,
            skills: document.getElementById('projectSkills').value.split(',').map(s => s.trim()),
            teamSize: parseInt(document.getElementById('projectTeamSize').value),
            currentMembers: 1,
            owner: 'You',
            members: ['You'],
            status: 'recruiting',
            created: 'Just now'
        };

        allProjects.unshift(newProject);
        localStorage.setItem('campusConnect_projects', JSON.stringify(allProjects));

        closeCreateProjectModal();
        displayProjects();
        alert('Project created successfully!');
    });
}

const joinProject = (projectId) => {
    const project = allProjects.find(p => p.id === projectId);
    if (project && !project.members.includes('You')) {
        project.members.push('You');
        project.currentMembers++;
        localStorage.setItem('campusConnect_projects', JSON.stringify(allProjects));
        displayProjects();
        alert(`You've joined "${project.title}"!`);
    }
};

const viewProject = (projectId) => {
    alert('View project details (feature coming soon)');
};

const manageProject = (projectId) => {
    alert('Manage project settings (feature coming soon)');
};

const projectSearch = document.getElementById('projectSearch');
if (projectSearch) {
    projectSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'block' : 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeProjectsPage);
