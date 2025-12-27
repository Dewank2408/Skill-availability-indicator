// Skill Map JavaScript for Campus Connect

// Mock skill data generator
const generateSkillData = () => {
    const skills = [
        { name: 'Python', category: 'Programming', count: 145, growth: 15, icon: '🐍' },
        { name: 'JavaScript', category: 'Programming', count: 132, growth: 12, icon: '💛' },
        { name: 'Java', category: 'Programming', count: 98, growth: 5, icon: '☕' },
        { name: 'Web Development', category: 'Web Development', count: 156, growth: 18, icon: '🌐' },
        { name: 'React', category: 'Web Development', count: 87, growth: 22, icon: '⚛️' },
        { name: 'Flutter', category: 'Mobile Development', count: 65, growth: 25, icon: '📱' },
        { name: 'UI/UX Design', category: 'Design', count: 78, growth: 10, icon: '🎨' },
        { name: 'Figma', category: 'Design', count: 92, growth: 14, icon: '✏️' },
        { name: 'Machine Learning', category: 'Data Science', count: 72, growth: 20, icon: '🤖' },
        { name: 'Data Analysis', category: 'Data Science', count: 85, growth: 16, icon: '📊' },
        { name: 'Node.js', category: 'Web Development', count: 68, growth: 12, icon: '🟢' },
        { name: 'MongoDB', category: 'Programming', count: 54, growth: 11, icon: '🍃' },
        { name: 'AI', category: 'Data Science', count: 95, growth: 28, icon: '🧠' },
        { name: 'Android', category: 'Mobile Development', count: 61, growth: 8, icon: '🤖' },
        { name: 'iOS', category: 'Mobile Development', count: 42, growth: 7, icon: '🍎' },
        { name: 'C++', category: 'Programming', count: 76, growth: 3, icon: '⚡' },
        { name: 'Cloud Computing', category: 'Other', count: 58, growth: 19, icon: '☁️' },
        { name: 'DevOps', category: 'Other', count: 45, growth: 17, icon: '🔧' },
        { name: 'Cybersecurity', category: 'Other', count: 52, growth: 13, icon: '🔒' },
        { name: 'Blockchain', category: 'Other', count: 38, growth: 21, icon: '⛓️' }
    ];

    return skills;
};

// Mock department data
const generateDepartmentData = () => {
    return {
        'Computer Science': { students: 450, topSkills: ['Python', 'Java', 'Web Development'] },
        'Engineering': { students: 380, topSkills: ['C++', 'Python', 'CAD'] },
        'Business': { students: 320, topSkills: ['Data Analysis', 'Excel', 'Marketing'] },
        'Arts': { students: 280, topSkills: ['Design', 'Figma', 'Photography'] },
        'Science': { students: 310, topSkills: ['Python', 'Data Analysis', 'Research'] },
        'Mathematics': { students: 210, topSkills: ['Python', 'Statistics', 'Machine Learning'] }
    };
};

// Generate mock students with skills
const generateMockStudents = () => {
    const names = [
        'Alex Kumar', 'Sarah Martinez', 'John Smith', 'Emma Wilson', 'Michael Chen',
        'Jessica Lee', 'David Brown', 'Olivia Garcia', 'James Taylor', 'Sophia Anderson',
        'Daniel Rodriguez', 'Isabella Martinez', 'Matthew White', 'Mia Thompson', 'Christopher Harris'
    ];

    const departments = Object.keys(generateDepartmentData());
    const years = ['1', '2', '3', '4'];
    const skills = generateSkillData();

    const students = names.map((name, index) => ({
        id: `student_${index}`,
        name: name,
        department: departments[Math.floor(Math.random() * departments.length)],
        year: years[Math.floor(Math.random() * years.length)],
        skills: skills
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.floor(Math.random() * 8) + 3)
            .map(s => s.name)
    }));

    return students;
};

let skillsData = generateSkillData();
let departmentData = generateDepartmentData();
let studentsData = generateMockStudents();
let topSkillsChart = null;
let departmentChart = null;

// Initialize charts
const initializeCharts = () => {
    initTopSkillsChart();
    initDepartmentChart();
};

// Top Skills Chart
const initTopSkillsChart = () => {
    const ctx = document.getElementById('topSkillsChart');
    if (!ctx) return;

    const topSkills = [...skillsData].sort((a, b) => b.count - a.count).slice(0, 10);

    if (topSkillsChart) {
        topSkillsChart.destroy();
    }

    topSkillsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topSkills.map(s => s.name),
            datasets: [{
                label: 'Number of Students',
                data: topSkills.map(s => s.count),
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(237, 100, 166, 0.8)',
                    'rgba(255, 154, 158, 0.8)',
                    'rgba(250, 208, 196, 0.8)',
                    'rgba(79, 172, 254, 0.8)',
                    'rgba(0, 242, 254, 0.8)',
                    'rgba(67, 233, 123, 0.8)',
                    'rgba(56, 249, 215, 0.8)',
                    'rgba(240, 147, 251, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(237, 100, 166, 1)',
                    'rgba(255, 154, 158, 1)',
                    'rgba(250, 208, 196, 1)',
                    'rgba(79, 172, 254, 1)',
                    'rgba(0, 242, 254, 1)',
                    'rgba(67, 233, 123, 1)',
                    'rgba(56, 249, 215, 1)',
                    'rgba(240, 147, 251, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: { size: 12 }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { size: 12 }
                    }
                }
            }
        }
    });
};

// Department Chart
const initDepartmentChart = () => {
    const ctx = document.getElementById('departmentChart');
    if (!ctx) return;

    const departments = Object.keys(departmentData);
    const studentCounts = departments.map(dept => departmentData[dept].students);

    if (departmentChart) {
        departmentChart.destroy();
    }

    departmentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: departments,
            datasets: [{
                data: studentCounts,
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(237, 100, 166, 0.8)',
                    'rgba(79, 172, 254, 0.8)',
                    'rgba(67, 233, 123, 0.8)',
                    'rgba(240, 147, 251, 0.8)',
                    'rgba(255, 193, 7, 0.8)'
                ],
                borderColor: '#fff',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: { size: 13 },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 }
                }
            }
        }
    });
};

// Load statistics
const loadStatistics = () => {
    document.getElementById('totalSkills').textContent = skillsData.length;
    document.getElementById('skilledStudents').textContent = studentsData.length;

    const topSkill = [...skillsData].sort((a, b) => b.count - a.count)[0];
    document.getElementById('trendingSkill').textContent = topSkill.name;

    const avgGrowth = (skillsData.reduce((sum, s) => sum + s.growth, 0) / skillsData.length).toFixed(1);
    document.getElementById('growthRate').textContent = `${avgGrowth}%`;
};

// Load trending skills
const loadTrendingSkills = () => {
    const trendingGrid = document.getElementById('trendingSkillsGrid');
    if (!trendingGrid) return;

    const trending = [...skillsData].sort((a, b) => b.growth - a.growth).slice(0, 6);

    trendingGrid.innerHTML = trending.map(skill => `
        <div class="trending-skill-card" onclick="showSkillStudents('${skill.name}')">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">${skill.icon}</div>
            <h3>${skill.name}</h3>
            <div class="skill-count">${skill.count} students</div>
            <div class="skill-growth">+${skill.growth}% growth</div>
        </div>
    `).join('');
};

// Load skills list
const loadSkillsList = () => {
    const skillsList = document.getElementById('skillsList');
    if (!skillsList) return;

    const sortedSkills = [...skillsData].sort((a, b) => b.count - a.count);

    skillsList.innerHTML = sortedSkills.map(skill => `
        <div class="skill-item" onclick="showSkillStudents('${skill.name}')">
            <div class="skill-item-info">
                <div class="skill-icon">${skill.icon}</div>
                <div class="skill-details">
                    <h3>${skill.name}</h3>
                    <p>${skill.category}</p>
                </div>
            </div>
            <div class="skill-item-stats">
                <div class="skill-stat">
                    <div class="value">${skill.count}</div>
                    <div class="label">Students</div>
                </div>
                <div class="skill-stat">
                    <div class="value" style="color: #43e97b;">+${skill.growth}%</div>
                    <div class="label">Growth</div>
                </div>
            </div>
            <div class="skill-item-action">
                <button class="btn btn-small btn-primary">View</button>
            </div>
        </div>
    `).join('');
};

// Show students with specific skill
const showSkillStudents = (skillName) => {
    const modal = document.getElementById('studentsModal');
    const modalTitle = document.getElementById('modalSkillName');
    const modalList = document.getElementById('modalStudentsList');

    modalTitle.textContent = `Students with ${skillName}`;

    const studentsWithSkill = studentsData.filter(student =>
        student.skills.includes(skillName)
    );

    modalList.innerHTML = studentsWithSkill.map(student => `
        <div class="student-card">
            <div class="student-avatar">${student.name.charAt(0)}</div>
            <div class="student-info">
                <h4>${student.name}</h4>
                <p>${student.department} • ${student.year}${student.year === '1' ? 'st' : student.year === '2' ? 'nd' : student.year === '3' ? 'rd' : 'th'} Year</p>
            </div>
            <button class="btn btn-small btn-primary" onclick="window.location.href='profile.html'">View Profile</button>
        </div>
    `).join('');

    modal.classList.add('active');
};

// Close modal
const closeModal = () => {
    document.getElementById('studentsModal').classList.remove('active');
};

// Apply filters
const applyFilters = () => {
    const department = document.getElementById('filterDepartment').value;
    const year = document.getElementById('filterYear').value;
    const category = document.getElementById('filterCategory').value;

    let filteredStudents = [...studentsData];

    if (department) {
        filteredStudents = filteredStudents.filter(s => s.department === department);
    }

    if (year) {
        filteredStudents = filteredStudents.filter(s => s.year === year);
    }

    // Recalculate skill counts based on filtered students
    let filteredSkills = skillsData.map(skill => {
        const count = filteredStudents.filter(student =>
            student.skills.includes(skill.name)
        ).length;

        return { ...skill, count };
    }).filter(skill => {
        if (category) {
            return skill.category === category && skill.count > 0;
        }
        return skill.count > 0;
    });

    skillsData = filteredSkills.length > 0 ? filteredSkills : generateSkillData();

    // Reload all components
    loadStatistics();
    loadTrendingSkills();
    loadSkillsList();
    initTopSkillsChart();
};

// Export chart
const exportChart = () => {
    if (topSkillsChart) {
        const url = topSkillsChart.toBase64Image();
        const link = document.createElement('a');
        link.download = 'campus-skill-map.png';
        link.href = url;
        link.click();
        alert('Chart exported successfully!');
    }
};

// Search skills
const searchSkills = (query) => {
    query = query.toLowerCase();
    const skillsList = document.getElementById('skillsList');
    const items = skillsList.querySelectorAll('.skill-item');

    items.forEach(item => {
        const skillName = item.querySelector('h3').textContent.toLowerCase();
        if (skillName.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
};

// Sidebar toggle
const sidebarToggle = document.getElementById('sidebarToggle');
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('collapsed');
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadStatistics();
    initializeCharts();
    loadTrendingSkills();
    loadSkillsList();

    // Apply filters button
    const applyBtn = document.getElementById('applyFilters');
    if (applyBtn) {
        applyBtn.addEventListener('click', applyFilters);
    }

    // Export button
    const exportBtn = document.getElementById('exportChart');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportChart);
    }

    // Search
    const searchInput = document.getElementById('skillSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => searchSkills(e.target.value));
    }

    // Close modal on outside click
    const modal = document.getElementById('studentsModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
