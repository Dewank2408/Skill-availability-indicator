// Messages Page JavaScript for Campus Connect

// Mock conversations data
const mockConversations = [
    {
        id: 'CONV_1',
        type: 'direct',
        name: 'Sarah Martinez',
        avatar: 'S',
        lastMessage: 'Thanks for the study notes! Really helpful.',
        time: '2h ago',
        unread: 2,
        online: true,
        messages: [
            { id: 1, sender: 'Sarah Martinez', text: 'Hey! Did you finish the assignment?', time: '10:30 AM', sent: false },
            { id: 2, sender: 'You', text: 'Almost done! Just need to review my answers.', time: '10:32 AM', sent: true },
            { id: 3, sender: 'Sarah Martinez', text: 'Great! Want to compare notes later?', time: '10:35 AM', sent: false },
            { id: 4, sender: 'You', text: 'Sure! I can share my study notes with you.', time: '11:00 AM', sent: true },
            { id: 5, sender: 'Sarah Martinez', text: 'Thanks for the study notes! Really helpful.', time: '2h ago', sent: false }
        ]
    },
    {
        id: 'CONV_2',
        type: 'group',
        name: 'AI Study Group',
        avatar: 'AI',
        lastMessage: 'Alex: Meeting tomorrow at 4 PM?',
        time: '1d ago',
        unread: 0,
        online: false,
        members: ['Alex Kumar', 'Jessica Chen', 'You'],
        messages: [
            { id: 1, sender: 'Alex Kumar', text: 'Has everyone finished reading the research paper?', time: 'Yesterday 2:00 PM', sent: false },
            { id: 2, sender: 'Jessica Chen', text: 'I finished it! Really interesting approach to neural networks.', time: 'Yesterday 2:15 PM', sent: false },
            { id: 3, sender: 'You', text: 'Same here! I took some notes we can discuss.', time: 'Yesterday 3:00 PM', sent: true },
            { id: 4, sender: 'Alex Kumar', text: 'Perfect! Meeting tomorrow at 4 PM?', time: '1d ago', sent: false }
        ]
    },
    {
        id: 'CONV_3',
        type: 'direct',
        name: 'Michael Johnson',
        avatar: 'M',
        lastMessage: 'You: See you at the hackathon!',
        time: '3d ago',
        unread: 0,
        online: false,
        messages: [
            { id: 1, sender: 'Michael Johnson', text: 'Are you coming to the hackathon this weekend?', time: '3 days ago 9:00 AM', sent: false },
            { id: 2, sender: 'You', text: 'Yes! I\'m really excited. What project are you working on?', time: '3 days ago 10:30 AM', sent: true },
            { id: 3, sender: 'Michael Johnson', text: 'Building a student collaboration app. Want to join my team?', time: '3 days ago 11:00 AM', sent: false },
            { id: 4, sender: 'You', text: 'That sounds perfect! I\'d love to. See you at the hackathon!', time: '3d ago', sent: true }
        ]
    },
    {
        id: 'CONV_4',
        type: 'group',
        name: 'Web Dev Workshop',
        avatar: 'WD',
        lastMessage: 'Emma: Check out this React tutorial',
        time: '1w ago',
        unread: 5,
        online: false,
        members: ['Emma Williams', 'David Brown', 'Olivia Garcia', 'You'],
        messages: [
            { id: 1, sender: 'Emma Williams', text: 'Check out this React tutorial: react-tutorial.com', time: '1w ago', sent: false }
        ]
    }
];

// Mock connections for new message
const mockConnections = [
    { id: 'USER_1', name: 'Sarah Martinez', department: 'Computer Science' },
    { id: 'USER_2', name: 'Alex Kumar', department: 'Engineering' },
    { id: 'USER_3', name: 'Jessica Chen', department: 'Computer Science' },
    { id: 'USER_4', name: 'Michael Johnson', department: 'Business' },
    { id: 'USER_5', name: 'Emma Williams', department: 'Engineering' }
];

let currentConversation = null;
let conversations = [];
let currentFilter = 'all';

// Initialize messages page
const initializeMessagesPage = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Load conversations from localStorage or use mock data
    const savedConversations = localStorage.getItem('campusConnect_conversations');
    conversations = savedConversations ? JSON.parse(savedConversations) : mockConversations;

    // Display conversations
    displayConversations();
};

// Display conversations list
const displayConversations = () => {
    const conversationsList = document.getElementById('conversationsList');
    if (!conversationsList) return;

    // Filter conversations based on current filter
    const filteredConversations = conversations.filter(conv => {
        if (currentFilter === 'all') return true;
        return conv.type === currentFilter;
    });

    if (filteredConversations.length === 0) {
        conversationsList.innerHTML = '<p style="padding: 2rem; text-align: center; color: var(--text-light);">No conversations yet</p>';
        return;
    }

    conversationsList.innerHTML = filteredConversations.map(conv => `
        <div class="conversation-item ${conv.id === currentConversation?.id ? 'active' : ''} ${conv.unread > 0 ? 'unread' : ''}" 
             onclick="openConversation('${conv.id}')">
            <div class="conversation-avatar ${conv.type === 'group' ? 'group' : ''}">
                ${conv.avatar}
                ${conv.online && conv.type === 'direct' ? '<span class="online-indicator"></span>' : ''}
            </div>
            <div class="conversation-info">
                <h4>
                    ${conv.name}
                    <span class="conversation-time">${conv.time}</span>
                </h4>
                <p class="conversation-preview">${conv.lastMessage}</p>
            </div>
            ${conv.unread > 0 ? `<span class="unread-badge">${conv.unread}</span>` : ''}
        </div>
    `).join('');
};

// Filter conversations
const filterConversations = (type) => {
    currentFilter = type;

    // Update active tab
    document.querySelectorAll('.conversation-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === type) {
            btn.classList.add('active');
        }
    });

    displayConversations();
};

// Open conversation
const openConversation = (conversationId) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;

    currentConversation = conversation;

    // Mark as read
    conversation.unread = 0;
    localStorage.setItem('campusConnect_conversations', JSON.stringify(conversations));

    // Hide empty state, show active chat
    document.getElementById('chatEmptyState').style.display = 'none';
    document.getElementById('activeChat').style.display = 'flex';

    // Update chat header
    document.getElementById('chatAvatar').textContent = conversation.avatar;
    document.getElementById('chatName').textContent = conversation.name;
    document.getElementById('chatStatus').textContent = conversation.online ? 'Online' : 'Offline';

    // Display messages
    displayMessages(conversation.messages);

    // Update conversations list
    displayConversations();

    // Focus message input
    document.getElementById('messageInput').focus();
};

// Display messages
const displayMessages = (messages) => {
    const messagesArea = document.getElementById('messagesArea');
    if (!messagesArea) return;

    let lastDate = null;
    let html = '';

    messages.forEach(msg => {
        // Add date divider if needed
        const msgDate = msg.time.includes('Yesterday') ? 'Yesterday' :
            msg.time.includes('ago') ? 'Today' :
                msg.time.split(' ')[0];

        if (msgDate !== lastDate) {
            html += `
                <div class="message-date-divider">
                    <span class="date-label">${msgDate}</span>
                </div>
            `;
            lastDate = msgDate;
        }

        // Add message
        const isSent = msg.sent || msg.sender === 'You';
        html += `
            <div class="message-group ${isSent ? 'sent' : 'received'}">
                ${!isSent && currentConversation.type === 'group' ? `<div class="message-sender">${msg.sender}</div>` : ''}
                <div class="message-bubble">
                    <p class="message-text">${msg.text}</p>
                    <div class="message-time">${msg.time.split(' ').slice(-2).join(' ')}</div>
                </div>
            </div>
        `;
    });

    messagesArea.innerHTML = html;

    // Scroll to bottom
    messagesArea.scrollTop = messagesArea.scrollHeight;
};

// Send message
const sendMessage = () => {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (!messageText || !currentConversation) return;

    // Create new message
    const newMessage = {
        id: Date.now(),
        sender: 'You',
        text: messageText,
        time: 'Just now',
        sent: true
    };

    // Add to conversation
    currentConversation.messages.push(newMessage);
    currentConversation.lastMessage = `You: ${messageText}`;
    currentConversation.time = 'Just now';

    // Save to localStorage
    localStorage.setItem('campusConnect_conversations', JSON.stringify(conversations));

    // Update display
    displayMessages(currentConversation.messages);
    displayConversations();

    // Clear input
    messageInput.value = '';
    messageInput.focus();
};

// Handle Enter key for sending message
const handleMessageKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
};

// Show/hide chat info
const showChatInfo = () => {
    const chatInfoPanel = document.getElementById('chatInfoPanel');
    if (!chatInfoPanel || !currentConversation) return;

    // Load members if group chat
    if (currentConversation.type === 'group') {
        const chatMembers = document.getElementById('chatMembers');
        chatMembers.innerHTML = currentConversation.members.map(member => {
            const initial = member.charAt(0);
            return `
                <div class="member-item">
                    <div class="member-avatar">${initial}</div>
                    <div class="member-info">
                        <h5>${member}</h5>
                        <p>${member === 'You' ? 'You' : 'Online'}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    chatInfoPanel.style.display = 'block';
    chatInfoPanel.classList.add('active');
};

const closeChatInfo = () => {
    const chatInfoPanel = document.getElementById('chatInfoPanel');
    if (chatInfoPanel) {
        chatInfoPanel.classList.remove('active');
        setTimeout(() => {
            chatInfoPanel.style.display = 'none';
        }, 300);
    }
};

// New message modal
const showNewMessageModal = () => {
    const modal = document.getElementById('newMessageModal');
    modal.classList.add('active');

    // Setup recipient search
    setupRecipientSearch();
};

const closeNewMessageModal = () => {
    const modal = document.getElementById('newMessageModal');
    modal.classList.remove('active');
    document.getElementById('newMessageRecipient').value = '';
    document.getElementById('newMessageText').value = '';
    document.getElementById('recipientSuggestions').classList.remove('active');
};

const setupRecipientSearch = () => {
    const recipientInput = document.getElementById('newMessageRecipient');
    const suggestionsContainer = document.getElementById('recipientSuggestions');

    recipientInput.addEventListener('input', () => {
        const query = recipientInput.value.toLowerCase();

        if (query.length === 0) {
            suggestionsContainer.classList.remove('active');
            return;
        }

        const matches = mockConnections.filter(conn =>
            conn.name.toLowerCase().includes(query)
        );

        if (matches.length > 0) {
            suggestionsContainer.innerHTML = matches.map(conn => `
                <div class="suggestion-item" onclick="selectRecipient('${conn.name}')">
                    <div class="suggestion-avatar">${conn.name.charAt(0)}</div>
                    <div>
                        <div style="font-weight: 600; font-size: 0.875rem;">${conn.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-light);">${conn.department}</div>
                    </div>
                </div>
            `).join('');
            suggestionsContainer.classList.add('active');
        } else {
            suggestionsContainer.classList.remove('active');
        }
    });
};

let selectedRecipient = null;

const selectRecipient = (name) => {
    selectedRecipient = name;
    document.getElementById('newMessageRecipient').value = name;
    document.getElementById('recipientSuggestions').classList.remove('active');
};

const sendNewMessage = () => {
    const messageText = document.getElementById('newMessageText').value.trim();

    if (!selectedRecipient || !messageText) {
        alert('Please select a recipient and enter a message');
        return;
    }

    // Check if conversation already exists
    let conversation = conversations.find(c => c.name === selectedRecipient);

    if (!conversation) {
        // Create new conversation
        conversation = {
            id: 'CONV_' + Date.now(),
            type: 'direct',
            name: selectedRecipient,
            avatar: selectedRecipient.charAt(0),
            lastMessage: `You: ${messageText}`,
            time: 'Just now',
            unread: 0,
            online: Math.random() > 0.5,
            messages: []
        };
        conversations.unshift(conversation);
    }

    // Add message
    const newMessage = {
        id: Date.now(),
        sender: 'You',
        text: messageText,
        time: 'Just now',
        sent: true
    };

    conversation.messages.push(newMessage);
    conversation.lastMessage = `You: ${messageText}`;
    conversation.time = 'Just now';

    // Save to localStorage
    localStorage.setItem('campusConnect_conversations', JSON.stringify(conversations));

    // Close modal
    closeNewMessageModal();

    // Open conversation
    displayConversations();
    openConversation(conversation.id);
};

// Search conversations
const conversationSearch = document.getElementById('conversationSearch');
if (conversationSearch) {
    conversationSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        const conversationItems = document.querySelectorAll('.conversation-item');
        conversationItems.forEach(item => {
            const name = item.querySelector('h4').textContent.toLowerCase();
            const preview = item.querySelector('.conversation-preview').textContent.toLowerCase();

            if (name.includes(query) || preview.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initializeMessagesPage();
});
