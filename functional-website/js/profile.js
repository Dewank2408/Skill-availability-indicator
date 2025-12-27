// Profile Page JavaScript for Campus Connect

// Load user profile data
const loadProfileData = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Set avatar
    const profileAvatar = document.getElementById('profileAvatar');
    if (profileAvatar && currentUser.fullName) {
        profileAvatar.textContent = currentUser.fullName.charAt(0).toUpperCase();
    }

    // Set basic info
    document.getElementById('profileName').textContent = currentUser.fullName || 'User';
    document.getElementById('profileDepartment').textContent = currentUser.department || 'Department';
    document.getElementById('profileYear').textContent = `${currentUser.year}${getOrdinalSuffix(currentUser.year)} Year` || 'Year';
    document.getElementById('profileEmail').textContent = currentUser.email || '';

    // Set stats
    document.getElementById('profileConnections').textContent = currentUser.connections?.length || 0;
    document.getElementById('profileProjects').textContent = currentUser.projects?.length || 0;
    document.getElementById('profileBadges').textContent = currentUser.badges?.length || 0;

    // Set bio and goals
    const bioElement = document.getElementById('profileBio');
    if (currentUser.bio) {
        bioElement.textContent = currentUser.bio;
    }

    const goalsElement = document.getElementById('profileGoals');
    if (currentUser.goals) {
        goalsElement.textContent = currentUser.goals;
    }

    // Set interests
    const interestsElement = document.getElementById('profileInterests');
    if (currentUser.interests && currentUser.interests.length > 0) {
        interestsElement.innerHTML = currentUser.interests.map(interest =>
            `<span class="interest-tag">${interest}</span>`
        ).join('');
    }

    // Load skills
    loadSkills();

    // Load projects
    loadProjects();

    // Load badges
    loadBadges();

    // Set activity score
    document.getElementById('activityScore').textContent = currentUser.activityScore || 0;

    // Load availability status
    loadAvailabilityStatus();
};

// Load availability status
const loadAvailabilityStatus = () => {
    const currentUser = getCurrentUser();
    const statusSelect = document.getElementById('availabilityStatus');
    const messageInput = document.getElementById('availabilityMessage');

    if (currentUser.availabilityStatus) {
        statusSelect.value = currentUser.availabilityStatus;
    }

    if (currentUser.availabilityMessage) {
        messageInput.value = currentUser.availabilityMessage;
    }
};

// Save availability status
const saveAvailabilityStatus = () => {
    const status = document.getElementById('availabilityStatus').value;
    const message = document.getElementById('availabilityMessage').value;

    const result = updateUserProfile({
        availabilityStatus: status,
        availabilityMessage: message
    });

    if (result.success) {
        // Show quick feedback
        const btn = document.getElementById('availabilityStatus');
        const originalBorder = btn.style.borderColor;
        btn.style.borderColor = '#10b981';
        setTimeout(() => {
            btn.style.borderColor = originalBorder;
        }, 500);
    }
};

// Get ordinal suffix for year
const getOrdinalSuffix = (year) => {
    if (year === 'Graduate') return '';
    const j = year % 10;
    const k = year % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
};

// Load skills
const loadSkills = () => {
    const currentUser = getCurrentUser();
    const skillsList = document.getElementById('profileSkillsList');

    if (!currentUser.skills || currentUser.skills.length === 0) {
        skillsList.innerHTML = '<p>No skills added yet. Add your first skill!</p>';
        return;
    }

    skillsList.innerHTML = currentUser.skills.map(skill => `
        <div class="skill-card ${skill.proficiency}">
            <div class="skill-card-header">
                <h4>${skill.name}</h4>
                <span class="proficiency">${skill.proficiency}</span>
            </div>
            <p class="endorsements">⭐ ${skill.endorsements || 0} endorsements</p>
        </div>
    `).join('');
};

// Load projects
const loadProjects = () => {
    const currentUser = getCurrentUser();
    const projectsList = document.getElementById('profileProjectsList');

    // Mock projects for demo
    const projects = [
        {
            title: 'AI Study Group',
            description: 'Weekly meetings to discuss machine learning concepts and build projects together.',
            tags: ['Python', 'TensorFlow', 'Machine Learning']
        },
        {
            title: 'Web Dev Workshop Series',
            description: 'Teaching fellow students modern web development with React and Node.js.',
            tags: ['JavaScript', 'React', 'Node.js']
        }
    ];

    if (projects.length === 0) {
        projectsList.innerHTML = '<p>No projects yet. Start collaborating!</p>';
        return;
    }

    projectsList.innerHTML = projects.map(project => `
        <div class="project-card">
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
};

// Load badges
const loadBadges = () => {
    const badgesList = document.getElementById('profileBadgesList');

    // Mock badges for demo
    const badges = [
        { icon: '🌟', name: 'Early Adopter', description: 'Joined in the first month' },
        { icon: '🤝', name: 'Connector', description: '10+ connections made' },
        { icon: '💬', name: 'Communicator', description: '50+ messages sent' },
        { icon: '🎯', name: 'Goal Setter', description: 'Completed profile goals' }
    ];

    if (badges.length === 0) {
        badgesList.innerHTML = '<p>Participate and collaborate to earn badges!</p>';
        return;
    }

    badgesList.innerHTML = badges.map(badge => `
        <div class="badge-item">
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-description">${badge.description}</div>
        </div>
    `).join('');
};

// Tab switching
const setupTabs = () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            btn.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
};

// Edit profile modal
const editProfileBtn = document.getElementById('editProfileBtn');
const editProfileModal = document.getElementById('editProfileModal');
const editProfileForm = document.getElementById('editProfileForm');

if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
        const currentUser = getCurrentUser();

        // Pre-fill form with current data
        document.getElementById('editBio').value = currentUser.bio || '';
        document.getElementById('editGoals').value = currentUser.goals || '';
        document.getElementById('editDepartment').value = currentUser.department || '';
        document.getElementById('editYear').value = currentUser.year || '';

        // Show modal
        editProfileModal.classList.add('active');
    });
}

const closeEditModal = () => {
    editProfileModal.classList.remove('active');
};

// Close modal when clicking outside
if (editProfileModal) {
    editProfileModal.addEventListener('click', (e) => {
        if (e.target === editProfileModal) {
            closeEditModal();
        }
    });
}

// Handle edit profile form submission
if (editProfileForm) {
    editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const updates = {
            bio: document.getElementById('editBio').value,
            goals: document.getElementById('editGoals').value,
            department: document.getElementById('editDepartment').value,
            year: document.getElementById('editYear').value
        };

        const result = updateUserProfile(updates);

        if (result.success) {
            alert('Profile updated successfully!');
            closeEditModal();
            loadProfileData(); // Reload profile data
        } else {
            alert('Failed to update profile: ' + result.message);
        }
    });
}

// Add skill button
const addSkillBtn = document.getElementById('addSkillBtn');
if (addSkillBtn) {
    addSkillBtn.addEventListener('click', () => {
        const skillName = prompt('Enter skill name:');
        if (!skillName) return;

        const proficiency = prompt('Enter proficiency level (beginner/intermediate/advanced):');
        if (!proficiency || !['beginner', 'intermediate', 'advanced'].includes(proficiency.toLowerCase())) {
            alert('Invalid proficiency level');
            return;
        }

        const currentUser = getCurrentUser();
        const skills = currentUser.skills || [];

        skills.push({
            name: skillName,
            proficiency: proficiency.toLowerCase(),
            endorsements: 0
        });

        const result = updateUserProfile({ skills });

        if (result.success) {
            alert('Skill added successfully!');
            loadSkills();
        }
    });
}

// Initialize profile page
document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
    setupTabs();

    // Availability status listeners
    const statusSelect = document.getElementById('availabilityStatus');
    const messageInput = document.getElementById('availabilityMessage');

    if (statusSelect) {
        statusSelect.addEventListener('change', saveAvailabilityStatus);
    }

    if (messageInput) {
        // Save on blur or after 1 second of no typing
        let timeout;
        messageInput.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(saveAvailabilityStatus, 1000);
        });
        messageInput.addEventListener('blur', saveAvailabilityStatus);
    }
});
