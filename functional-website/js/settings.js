// Settings Page JavaScript
const loadSettings = () => {
    const user = getCurrentUser();
    if (!user) return;

    document.getElementById('profileVisibility').value = user.privacy?.profileVisibility || 'campus';
    document.getElementById('showEmail').checked = user.privacy?.showEmail || false;
    document.getElementById('allowMessages').value = user.privacy?.allowMessages || 'all';
};

const updateSetting = (key, value) => {
    const user = getCurrentUser();
    if (!user) return;

    if (!user.privacy) user.privacy = {};
    user.privacy[key] = value;

    updateUserProfile({ privacy: user.privacy });
    alert('Setting updated successfully!');
};

const downloadData = () => {
    const user = getCurrentUser();
    const dataStr = JSON.stringify(user, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'campus-connect-data.json';
    link.click();
};

const deleteAccount = () => {
    if (confirm('Are you sure? This action cannot be undone.')) {
        if (confirm('This will permanently delete all your data. Continue?')) {
            localStorage.removeItem('campusConnect_currentUser');
            alert('Account deleted.');
            window.location.href = 'index.html';
        }
    }
};

document.addEventListener('DOMContentLoaded', loadSettings);
