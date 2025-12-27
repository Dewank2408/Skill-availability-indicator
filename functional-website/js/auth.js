// Authentication and User Management System for Campus Connect

// Initialize user data storage
const initializeStorage = () => {
    if (!localStorage.getItem('campusConnect_users')) {
        localStorage.setItem('campusConnect_users', JSON.stringify([]));
    }
    if (!localStorage.getItem('campusConnect_currentUser')) {
        localStorage.setItem('campusConnect_currentUser', null);
    }
};

// Verify institutional email
const verifyInstitutionalEmail = (email) => {
    // List of allowed educational domains
    const eduDomains = ['.edu', '.ac.in', '.edu.in', 'college.edu', 'university.edu'];
    return eduDomains.some(domain => email.toLowerCase().includes(domain));
};

// Validate college ID format
const validateCollegeId = (id) => {
    // Basic validation: alphanumeric, 6-12 characters
    const regex = /^[A-Z0-9]{6,12}$/i;
    return regex.test(id);
};

// Generate unique user ID
const generateUserId = () => {
    return 'USER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Hash password (simple demo version - in production use proper hashing)
const hashPassword = (password) => {
    // This is a simple demo hash - in production, use bcrypt or similar
    return btoa(password + 'campusConnect_salt');
};

// Check if user is authenticated
const isAuthenticated = () => {
    const currentUser = localStorage.getItem('campusConnect_currentUser');
    return currentUser && currentUser !== 'null';
};

// Get current user
const getCurrentUser = () => {
    const userData = localStorage.getItem('campusConnect_currentUser');
    return userData && userData !== 'null' ? JSON.parse(userData) : null;
};

// Login user
const loginUser = (email, password, remember = false) => {
    const users = JSON.parse(localStorage.getItem('campusConnect_users') || '[]');
    const hashedPassword = hashPassword(password);
    
    const user = users.find(u => u.email === email && u.password === hashedPassword);
    
    if (user) {
        // Create session
        const sessionUser = { ...user };
        delete sessionUser.password; // Don't store password in session
        
        localStorage.setItem('campusConnect_currentUser', JSON.stringify(sessionUser));
        
        if (remember) {
            localStorage.setItem('campusConnect_rememberMe', 'true');
        }
        
        return { success: true, user: sessionUser };
    }
    
    return { success: false, message: 'Invalid email or password' };
};

// Register new user
const registerUser = (userData) => {
    const users = JSON.parse(localStorage.getItem('campusConnect_users') || '[]');
    
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
        return { success: false, message: 'Email already registered' };
    }
    
    // Check if college ID already exists
    if (users.some(u => u.collegeId === userData.collegeId)) {
        return { success: false, message: 'College ID already registered' };
    }
    
    // Verify institutional email
    if (!verifyInstitutionalEmail(userData.email)) {
        return { success: false, message: 'Please use your institutional email address' };
    }
    
    // Validate college ID
    if (!validateCollegeId(userData.collegeId)) {
        return { success: false, message: 'Invalid college ID format' };
    }
    
    // Create new user
    const newUser = {
        id: generateUserId(),
        email: userData.email,
        collegeId: userData.collegeId,
        password: hashPassword(userData.password),
        fullName: userData.fullName,
        department: userData.department,
        year: userData.year,
        bio: userData.bio || '',
        goals: userData.goals || '',
        skills: userData.skills || [],
        interests: userData.interests || [],
        verified: false, // Email verification pending
        createdAt: new Date().toISOString(),
        profileComplete: true,
        connections: [],
        connectionRequests: [],
        projects: [],
        communities: [],
        badges: [],
        achievements: [],
        activityScore: 0,
        privacy: {
            profileVisibility: 'campus', // campus, connections, private
            showEmail: false,
            allowMessages: 'all', // all, connections, none
            showSkills: true,
            showProjects: true
        }
    };
    
    users.push(newUser);
    localStorage.setItem('campusConnect_users', JSON.stringify(users));
    
    // Auto-login after registration
    const sessionUser = { ...newUser };
    delete sessionUser.password;
    localStorage.setItem('campusConnect_currentUser', JSON.stringify(sessionUser));
    
    return { success: true, user: sessionUser };
};

// Logout user
const logout = () => {
    localStorage.setItem('campusConnect_currentUser', null);
    localStorage.removeItem('campusConnect_rememberMe');
    window.location.href = 'index.html';
};

// Update user profile
const updateUserProfile = (updates) => {
    const currentUser = getCurrentUser();
    if (!currentUser) return { success: false, message: 'Not authenticated' };
    
    const users = JSON.parse(localStorage.getItem('campusConnect_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
        return { success: false, message: 'User not found' };
    }
    
    // Update user data
    users[userIndex] = { ...users[userIndex], ...updates };
    localStorage.setItem('campusConnect_users', JSON.stringify(users));
    
    // Update session
    const updatedUser = { ...users[userIndex] };
    delete updatedUser.password;
    localStorage.setItem('campusConnect_currentUser', JSON.stringify(updatedUser));
    
    return { success: true, user: updatedUser };
};

// Send email verification (simulated)
const sendVerificationEmail = (email) => {
    console.log(`Verification email sent to ${email}`);
    // In production, this would call a backend API
    return { success: true, message: 'Verification email sent' };
};

// Initialize storage on load
initializeStorage();

// Login Form Handler
if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    const authMessage = document.getElementById('authMessage');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember')?.checked || false;
        
        const result = loginUser(email, password, remember);
        
        if (result.success) {
            authMessage.textContent = 'Login successful! Redirecting...';
            authMessage.className = 'auth-message success';
            authMessage.style.display = 'block';
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            authMessage.textContent = result.message;
            authMessage.className = 'auth-message error';
            authMessage.style.display = 'block';
        }
    });
    
    // Forgot password handler
    const forgotPassword = document.getElementById('forgotPassword');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Password reset feature coming soon! Please contact your system administrator.');
        });
    }
}

// Check authentication on protected pages
if (window.location.pathname.includes('dashboard.html') || 
    window.location.pathname.includes('profile.html') ||
    window.location.pathname.includes('discover.html') ||
    window.location.pathname.includes('messages.html')) {
    
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    } else {
        // Display user name in dashboard
        const currentUser = getCurrentUser();
        const userNameDisplay = document.getElementById('userNameDisplay');
        if (userNameDisplay && currentUser) {
            userNameDisplay.textContent = currentUser.fullName.split(' ')[0];
        }
    }
}
