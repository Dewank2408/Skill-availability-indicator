// Problems Page JavaScript for Campus Connect

// Mock problems data
const generateProblemsData = () => {
    return [
        {
            id: 'p1',
            title: 'React useState Hook Not Updating Component',
            description: 'I\'m trying to update state using useState but the component doesn\'t re-render. I\'ve checked my code multiple times but can\'t find the issue.',
            category: 'Technical',
            difficulty: 'medium',
            status: 'open',
            tags: ['React', 'JavaScript', 'Hooks'],
            author: 'Alex Kumar',
            authorId: 'u1',
            responses: 3,
            views: 45,
            solvers: ['Sarah Martinez', 'John Smith'],
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
        },
        {
            id: 'p2',
            title: 'How to Optimize Database Queries in MongoDB',
            description: 'My MongoDB queries are running very slow with large datasets. Looking for optimization techniques and best practices.',
            category: 'Technical',
            difficulty: 'hard',
            status: 'solving',
            tags: ['MongoDB', 'Database', 'Optimization'],
            author: 'Emma Wilson',
            authorId: 'u2',
            responses: 7,
            views: 89,
            solvers: ['David Brown', 'Jessica Lee', 'Michael Chen'],
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
        },
        {
            id: 'p3',
            title: 'Understanding Machine Learning Linear Regression',
            description: 'Need help understanding the math behind linear regression for my ML project. Specifically confused about gradient descent.',
            category: 'Academic',
            difficulty: 'medium',
            status: 'open',
            tags: ['Machine Learning', 'Math', 'Python'],
            author: 'James Taylor',
            authorId: 'u3',
            responses: 5,
            views: 62,
            solvers: ['Sophia Anderson', 'Daniel Rodriguez'],
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
        },
        {
            id: 'p4',
            title: 'Git Merge Conflicts in Team Project',
            description: 'Working on a team project and constantly facing merge conflicts. What\'s the best workflow to avoid this?',
            category: 'Project',
            difficulty: 'easy',
            status: 'solved',
            tags: ['Git', 'Version Control', 'Collaboration'],
            author: 'Olivia Garcia',
            authorId: 'u4',
            responses: 12,
            views: 134,
            solvers: ['Christopher Harris', 'Isabella Martinez', 'Matthew White', 'Mia Thompson'],
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
        },
        {
            id: 'p5',
            title: 'Career Path: Data Science vs Software Engineering',
            description: 'Torn between pursuing data science or software engineering. Would love to hear from people in both fields.',
            category: 'Career',
            difficulty: 'medium',
            status: 'open',
            tags: ['Career', 'Data Science', 'Software Engineering'],
            author: 'Sarah Martinez',
            authorId: 'u5',
            responses: 15,
            views: 201,
            solvers: ['Alex Kumar', 'Emma Wilson', 'James Taylor'],
            createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
        }
    ];
};

let problemsData = generateProblemsData();
let currentFilter = {
    tab: 'all',
    difficulty: '',
    category: '',
    status: ''
};

// Load and display problems
const loadProblems = () => {
    const problemsList = document.getElementById('problemsList');
    const emptyState = document.getElementById('emptyState');

    let filteredProblems = [...problemsData];

    // Apply tab filter
    const currentUser = getCurrentUser();
    if (currentFilter.tab === 'myproblems') {
        filteredProblems = filteredProblems.filter(p => p.authorId === currentUser?.id);
    } else if (currentFilter.tab === 'solved') {
        filteredProblems = filteredProblems.filter(p =>
            p.solvers.includes(currentUser?.fullName || 'User')
        );
    }

    // Apply other filters
    if (currentFilter.difficulty) {
        filteredProblems = filteredProblems.filter(p => p.difficulty === currentFilter.difficulty);
    }
    if (currentFilter.category) {
        filteredProblems = filteredProblems.filter(p => p.category === currentFilter.category);
    }
    if (currentFilter.status) {
        filteredProblems = filteredProblems.filter(p => p.status === currentFilter.status);
    }

    if (filteredProblems.length === 0) {
        problemsList.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    problemsList.style.display = 'grid';
    emptyState.style.display = 'none';

    problemsList.innerHTML = filteredProblems.map(problem => `
        <div class="problem-card ${problem.difficulty}" onclick="showProblemDetails('${problem.id}')">
            <div class="problem-header">
                <div>
                    <h3 class="problem-title">${problem.title}</h3>
                    <div class="problem-meta">
                        <span class="status-badge ${problem.status}">${capitalize(problem.status)}</span>
                        <span class="difficulty-badge ${problem.difficulty}">${capitalize(problem.difficulty)}</span>
                        <span>${problem.category}</span>
                        <span>${formatTimeAgo(problem.createdAt)}</span>
                    </div>
                </div>
            </div>
            
            <p class="problem-description">${truncateText(problem.description, 150)}</p>
            
            <div class="problem-tags">
                ${problem.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            
            ${problem.solvers.length > 0 ? `
                <div class="peer-suggestions">
                    <h4>👥 Can help (solved similar problems):</h4>
                    <div class="suggested-peers">
                        ${problem.solvers.slice(0, 3).map(solver => `
                            <div class="peer-chip">
                                <div class="peer-chip-avatar">${solver.charAt(0)}</div>
                                <span>${solver}</span>
                            </div>
                        `).join('')}
                        ${problem.solvers.length > 3 ? `<span style="color: var(--text-light); font-size: 0.85rem;">+${problem.solvers.length - 3} more</span>` : ''}
                    </div>
                </div>
            ` : ''}
            
            <div class="problem-footer">
                <div class="problem-author">
                    <div class="author-avatar">${problem.author.charAt(0)}</div>
                    <span class="author-name">${problem.author}</span>
                </div>
                <div class="problem-stats">
                    <span class="stat">💬 ${problem.responses} responses</span>
                    <span class="stat">👁️ ${problem.views} views</span>
                </div>
            </div>
        </div>
    `).join('');
};

// Show problem details
const showProblemDetails = (problemId) => {
    const problem = problemsData.find(p => p.id === problemId);
    if (!problem) return;

    const modal = document.getElementById('problemDetailsModal');
    const title = document.getElementById('detailsTitle');
    const body = document.getElementById('problemDetailsBody');

    title.textContent = problem.title;

    body.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
                <span class="status-badge ${problem.status}">${capitalize(problem.status)}</span>
                <span class="difficulty-badge ${problem.difficulty}">${capitalize(problem.difficulty)}</span>
                <span style="color: var(--text-light);">${problem.category}</span>
            </div>
            
            <div class="problem-tags" style="margin-bottom: 1rem;">
                ${problem.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.75rem;">Description:</h4>
            <p style="line-height: 1.6; color: var(--text-light);">${problem.description}</p>
        </div>
        
        ${problem.solvers.length > 0 ? `
            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.75rem;">Students who can help:</h4>
                <div style="display: grid; gap: 0.5rem;">
                    ${problem.solvers.map(solver => `
                        <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: #f9fafb; border-radius: 8px;">
                            <div class="author-avatar">${solver.charAt(0)}</div>
                            <div style="flex: 1;">
                                <div style="font-weight: 600;">${solver}</div>
                                <div style="font-size: 0.85rem; color: var(--text-light);">Has solved similar problems</div>
                            </div>
                            <button class="btn btn-small btn-primary" onclick="alert('Connect with ${solver}')">Connect</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        <div style="padding-top: 1rem; border-top: 1px solid #e5e7eb;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div class="author-avatar">${problem.author.charAt(0)}</div>
                    <div>
                        <div style="font-weight: 600;">${problem.author}</div>
                        <div style="font-size: 0.85rem; color: var(--text-light);">Posted ${formatTimeAgo(problem.createdAt)}</div>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; font-size: 0.9rem; color: var(--text-light);">
                    <span>💬 ${problem.responses}</span>
                    <span>👁️ ${problem.views}</span>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem;">
            <button class="btn btn-primary" style="flex: 1;" onclick="alert('Reply feature coming soon!')">💬 Reply</button>
            <button class="btn btn-secondary" onclick="alert('Mark as solved feature coming soon!')">✓ I Solved This</button>
        </div>
    `;

    modal.classList.add('active');
};

// Close details modal
const closeDetailsModal = () => {
    document.getElementById('problemDetailsModal').classList.remove('active');
};

// Post new problem
const postProblemBtn = document.getElementById('postProblemBtn');
if (postProblemBtn) {
    postProblemBtn.addEventListener('click', () => {
        document.getElementById('postProblemModal').classList.add('active');
    });
}

// Close post modal
const closePostModal = () => {
    document.getElementById('postProblemModal').classList.remove('active');
    document.getElementById('postProblemForm').reset();
};

// Handle problem submission
const postProblemForm = document.getElementById('postProblemForm');
if (postProblemForm) {
    postProblemForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const currentUser = getCurrentUser();
        const tags = document.getElementById('problemTags').value
            .split(',')
            .map(t => t.trim())
            .filter(t => t);

        const newProblem = {
            id: 'p' + (problemsData.length + 1),
            title: document.getElementById('problemTitle').value,
            description: document.getElementById('problemDescription').value,
            category: document.getElementById('problemCategory').value,
            difficulty: document.getElementById('problemDifficulty').value,
            status: 'open',
            tags: tags,
            author: currentUser?.fullName || 'User',
            authorId: currentUser?.id || 'guest',
            responses: 0,
            views: 0,
            solvers: [],
            createdAt: new Date()
        };

        problemsData.unshift(newProblem);
        loadProblems();
        closePostModal();
        alert('Problem posted successfully!');
    });
}

// Tab switching
const setupTabs = () => {
    const tabBtns = document.querySelectorAll('.problems-tabs .tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter.tab = btn.dataset.tab;
            loadProblems();
        });
    });
};

// Filter listeners
const setupFilters = () => {
    document.getElementById('difficultyFilter').addEventListener('change', (e) => {
        currentFilter.difficulty = e.target.value;
        loadProblems();
    });

    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        currentFilter.category = e.target.value;
        loadProblems();
    });

    document.getElementById('statusFilter').addEventListener('change', (e) => {
        currentFilter.status = e.target.value;
        loadProblems();
    });
};

// Search functionality
const problemSearch = document.getElementById('problemSearch');
if (problemSearch) {
    problemSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.problem-card');

        cards.forEach(card => {
            const title = card.querySelector('.problem-title').textContent.toLowerCase();
            const description = card.querySelector('.problem-description').textContent.toLowerCase();

            if (title.includes(query) || description.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Utility functions
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return `${Math.floor(seconds / 604800)} weeks ago`;
};

//  Sidebar toggle
const sidebarToggle = document.getElementById('sidebarToggle');
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('collapsed');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProblems();
    setupTabs();
    setupFilters();

    // Close modals on outside click
    const modals = [document.getElementById('postProblemModal'), document.getElementById('problemDetailsModal')];
    modals.forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    });
});
