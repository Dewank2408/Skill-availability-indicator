// Multi-step Onboarding Form Handler for Campus Connect

let currentStep = 1;
const totalSteps = 4;
let formData = {
    skills: [],
    interests: []
};

// Navigate to next step
function nextStep(stepNumber) {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
        return;
    }

    // Save current step data
    saveStepData(currentStep);

    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('completed');

    // Show next step
    currentStep = stepNumber;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigate to previous step
function prevStep(stepNumber) {
    // Save current step data (no validation needed when going back)
    saveStepData(currentStep);

    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');

    // Show previous step
    currentStep = stepNumber;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('completed');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Validate current step
function validateStep(step) {
    const authMessage = document.getElementById('authMessage');

    switch (step) {
        case 1:
            const email = document.getElementById('collegeEmail').value;
            const collegeId = document.getElementById('collegeId').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (!email || !collegeId || !password || !confirmPassword) {
                showMessage('Please fill in all required fields', 'error');
                return false;
            }

            // Verify institutional email
            if (!verifyInstitutionalEmail(email)) {
                showMessage('Please use your institutional email address (.edu, .ac.in, etc.)', 'error');
                return false;
            }

            // Validate college ID
            if (!validateCollegeId(collegeId)) {
                showMessage('College ID must be 6-12 alphanumeric characters', 'error');
                return false;
            }

            if (password.length < 8) {
                showMessage('Password must be at least 8 characters long', 'error');
                return false;
            }

            if (password !== confirmPassword) {
                showMessage('Passwords do not match', 'error');
                return false;
            }
            break;

        case 2:
            const fullName = document.getElementById('fullName').value;
            const department = document.getElementById('department').value;
            const year = document.getElementById('year').value;

            if (!fullName || !department || !year) {
                showMessage('Please fill in all required fields', 'error');
                return false;
            }
            break;

        case 3:
            // Skills are optional, but show warning if none added
            if (formData.skills.length === 0) {
                const proceed = confirm('You haven\'t added any skills. Skills help others find you. Continue anyway?');
                if (!proceed) return false;
            }
            break;

        case 4:
            // Interests are optional
            break;
    }

    return true;
}

// Save step data to formData object
function saveStepData(step) {
    switch (step) {
        case 1:
            formData.email = document.getElementById('collegeEmail').value;
            formData.collegeId = document.getElementById('collegeId').value;
            formData.password = document.getElementById('signupPassword').value;
            break;

        case 2:
            formData.fullName = document.getElementById('fullName').value;
            formData.department = document.getElementById('department').value;
            formData.year = document.getElementById('year').value;
            formData.bio = document.getElementById('bio').value;
            formData.goals = document.getElementById('goals').value;
            break;

        case 3:
            // Skills already saved dynamically
            break;

        case 4:
            // Collect interests
            const selectedInterests = [];
            document.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
                selectedInterests.push(checkbox.value);
            });

            const customInterests = document.getElementById('customInterests').value;
            if (customInterests) {
                const customArray = customInterests.split(',').map(i => i.trim()).filter(i => i);
                selectedInterests.push(...customArray);
            }

            formData.interests = selectedInterests;
            break;
    }
}

// Add skill
function addSkill() {
    const skillInput = document.getElementById('skillInput');
    const proficiencyLevel = document.getElementById('proficiencyLevel');
    const skillName = skillInput.value.trim();

    if (!skillName) {
        showMessage('Please enter a skill name', 'error');
        return;
    }

    // Check if skill already exists
    if (formData.skills.some(s => s.name.toLowerCase() === skillName.toLowerCase())) {
        showMessage('Skill already added', 'error');
        return;
    }

    const skill = {
        name: skillName,
        proficiency: proficiencyLevel.value,
        endorsements: 0
    };

    formData.skills.push(skill);
    renderSkills();

    // Clear input
    skillInput.value = '';
    skillInput.focus();
}

// Add suggested skill
function addSuggestedSkill(skillName, proficiency) {
    // Check if skill already exists
    if (formData.skills.some(s => s.name.toLowerCase() === skillName.toLowerCase())) {
        showMessage('Skill already added', 'error');
        return;
    }

    const skill = {
        name: skillName,
        proficiency: proficiency,
        endorsements: 0
    };

    formData.skills.push(skill);
    renderSkills();
}

// Remove skill
function removeSkill(index) {
    formData.skills.splice(index, 1);
    renderSkills();
}

// Render skills list
function renderSkills() {
    const skillsList = document.getElementById('skillsList');

    if (formData.skills.length === 0) {
        skillsList.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 1rem;">No skills added yet. Add your skills above.</p>';
        return;
    }

    skillsList.innerHTML = formData.skills.map((skill, index) => `
        <div class="skill-item" data-proficiency="${skill.proficiency}">
            <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.proficiency}</span>
            </div>
            <button type="button" class="skill-remove" onclick="removeSkill(${index})">✕</button>
        </div>
    `).join('');
}

// Show message
function showMessage(message, type) {
    const authMessage = document.getElementById('authMessage');
    authMessage.textContent = message;
    authMessage.className = `auth-message ${type}`;
    authMessage.style.display = 'block';

    setTimeout(() => {
        authMessage.style.display = 'none';
    }, 5000);
}

// Handle form submission
if (document.getElementById('signupForm')) {
    const signupForm = document.getElementById('signupForm');
    const authMessage = document.getElementById('authMessage');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate final step
        if (!validateStep(4)) {
            return;
        }

        // Save final step data
        saveStepData(4);

        // Register user
        const result = registerUser(formData);

        if (result.success) {
            showMessage('Registration successful! Redirecting to dashboard...', 'success');

            // Send verification email (simulated)
            sendVerificationEmail(formData.email);

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            showMessage(result.message, 'error');

            // If error is email/ID related, go back to step 1
            if (result.message.includes('email') || result.message.includes('ID')) {
                prevStep(1);
            }
        }
    });

    // Allow Enter key to add skills
    const skillInput = document.getElementById('skillInput');
    if (skillInput) {
        skillInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
            }
        });
    }
}
