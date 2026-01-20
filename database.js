// ============================================
// CIVIC ISSUE REPORTING SYSTEM - LOCAL DATABASE
// Uses Browser LocalStorage (No Download Required!)
// ============================================

const Database = {

    // ============================================
    // INITIALIZATION
    // ============================================
    init: function () {
        // Initialize users if not exists
        if (!localStorage.getItem('users')) {
            const defaultUsers = [
                {
                    id: 1,
                    name: 'Admin User',
                    email: 'admin@civicissues.com',
                    password: 'admin123',
                    phone: '',
                    address: '',
                    role: 'admin',
                    isActive: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'user123',
                    phone: '9876543210',
                    address: 'New Delhi',
                    role: 'reporter',
                    isActive: true,
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }

        // Initialize issues if not exists
        if (!localStorage.getItem('issues')) {
            const defaultIssues = [
                {
                    id: 1,
                    title: 'Large pothole on Main Street',
                    description: 'Deep pothole causing traffic issues near the bus stop',
                    category: 'pothole',
                    status: 'pending',
                    priority: 'high',
                    latitude: 28.6139,
                    longitude: 77.2090,
                    address: 'Main Street, Near Bus Stop',
                    city: 'New Delhi',
                    reporterId: 2,
                    imageUrl: 'pothole.png',
                    votes: 5,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    title: 'Broken streetlight',
                    description: 'Streetlight not working for past 2 weeks',
                    category: 'streetlight',
                    status: 'in_progress',
                    priority: 'medium',
                    latitude: 28.6145,
                    longitude: 77.2095,
                    address: 'Park Avenue, Sector 5',
                    city: 'New Delhi',
                    reporterId: 2,
                    imageUrl: 'issue2.png',
                    votes: 3,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    title: 'Garbage overflow',
                    description: 'Garbage bin overflowing, causing smell',
                    category: 'garbage',
                    status: 'pending',
                    priority: 'high',
                    latitude: 28.6150,
                    longitude: 77.2100,
                    address: 'Market Road',
                    city: 'New Delhi',
                    reporterId: 2,
                    imageUrl: 'issue3.png',
                    votes: 8,
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('issues', JSON.stringify(defaultIssues));
        }

        // Initialize comments if not exists
        if (!localStorage.getItem('comments')) {
            localStorage.setItem('comments', JSON.stringify([]));
        }

        console.log('✅ Database initialized successfully!');
    },

    // ============================================
    // USER FUNCTIONS
    // ============================================

    // Get all users
    getAllUsers: function () {
        return JSON.parse(localStorage.getItem('users')) || [];
    },

    // Get user by ID
    getUserById: function (id) {
        const users = this.getAllUsers();
        return users.find(user => user.id === id);
    },

    // Get user by email
    getUserByEmail: function (email) {
        const users = this.getAllUsers();
        return users.find(user => user.email.toLowerCase() === email.toLowerCase());
    },

    // Register new user
    registerUser: function (userData) {
        const users = this.getAllUsers();

        // Check if email already exists
        if (this.getUserByEmail(userData.email)) {
            return { success: false, message: 'Email already registered!' };
        }

        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name: userData.name,
            email: userData.email,
            password: userData.password,
            phone: userData.phone || '',
            address: userData.address || '',
            role: userData.role || 'reporter',
            isActive: true,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        return { success: true, message: 'Registration successful!', user: newUser };
    },

    // Login user
    loginUser: function (email, password) {
        const user = this.getUserByEmail(email);

        if (!user) {
            return { success: false, message: 'User not found!' };
        }

        if (user.password !== password) {
            return { success: false, message: 'Incorrect password!' };
        }

        // Store logged in user
        localStorage.setItem('currentUser', JSON.stringify(user));

        return { success: true, message: 'Login successful!', user: user };
    },

    // Logout user
    logoutUser: function () {
        localStorage.removeItem('currentUser');
        return { success: true, message: 'Logged out successfully!' };
    },

    // Get current logged in user
    getCurrentUser: function () {
        return JSON.parse(localStorage.getItem('currentUser'));
    },

    // Update user
    updateUser: function (id, updates) {
        const users = this.getAllUsers();
        const index = users.findIndex(user => user.id === id);

        if (index === -1) {
            return { success: false, message: 'User not found!' };
        }

        users[index] = { ...users[index], ...updates };
        localStorage.setItem('users', JSON.stringify(users));

        return { success: true, message: 'User updated!', user: users[index] };
    },

    // Delete user
    deleteUser: function (id) {
        let users = this.getAllUsers();
        users = users.filter(user => user.id !== id);
        localStorage.setItem('users', JSON.stringify(users));

        return { success: true, message: 'User deleted!' };
    },

    // ============================================
    // ISSUE FUNCTIONS
    // ============================================

    // Get all issues
    getAllIssues: function () {
        return JSON.parse(localStorage.getItem('issues')) || [];
    },

    // Get issue by ID
    getIssueById: function (id) {
        const issues = this.getAllIssues();
        return issues.find(issue => issue.id === id);
    },

    // Get issues by status
    getIssuesByStatus: function (status) {
        const issues = this.getAllIssues();
        return issues.filter(issue => issue.status === status);
    },

    // Get issues by category
    getIssuesByCategory: function (category) {
        const issues = this.getAllIssues();
        return issues.filter(issue => issue.category === category);
    },

    // Get issues by reporter
    getIssuesByReporter: function (reporterId) {
        const issues = this.getAllIssues();
        return issues.filter(issue => issue.reporterId === reporterId);
    },

    // Create new issue
    createIssue: function (issueData) {
        const issues = this.getAllIssues();
        const currentUser = this.getCurrentUser();

        const newIssue = {
            id: issues.length > 0 ? Math.max(...issues.map(i => i.id)) + 1 : 1,
            title: issueData.title,
            description: issueData.description,
            category: issueData.category,
            status: 'pending',
            priority: issueData.priority || 'medium',
            latitude: issueData.latitude || null,
            longitude: issueData.longitude || null,
            address: issueData.address || '',
            city: issueData.city || '',
            reporterId: currentUser ? currentUser.id : null,
            reporterName: currentUser ? currentUser.name : 'Anonymous',
            imageUrl: issueData.imageUrl || '',
            votes: 0,
            createdAt: new Date().toISOString()
        };

        issues.push(newIssue);
        localStorage.setItem('issues', JSON.stringify(issues));

        return { success: true, message: 'Issue reported successfully!', issue: newIssue };
    },

    // Update issue
    updateIssue: function (id, updates) {
        const issues = this.getAllIssues();
        const index = issues.findIndex(issue => issue.id === id);

        if (index === -1) {
            return { success: false, message: 'Issue not found!' };
        }

        issues[index] = { ...issues[index], ...updates, updatedAt: new Date().toISOString() };
        localStorage.setItem('issues', JSON.stringify(issues));

        return { success: true, message: 'Issue updated!', issue: issues[index] };
    },

    // Update issue status
    updateIssueStatus: function (id, status) {
        return this.updateIssue(id, { status: status });
    },

    // Vote for issue (increases priority)
    voteIssue: function (issueId) {
        const issues = this.getAllIssues();
        const index = issues.findIndex(issue => issue.id === issueId);

        if (index === -1) {
            return { success: false, message: 'Issue not found!' };
        }

        issues[index].votes = (issues[index].votes || 0) + 1;

        // Auto-increase priority based on votes
        if (issues[index].votes >= 10) {
            issues[index].priority = 'critical';
        } else if (issues[index].votes >= 5) {
            issues[index].priority = 'high';
        }

        localStorage.setItem('issues', JSON.stringify(issues));

        return { success: true, message: 'Vote recorded!', issue: issues[index] };
    },

    // Delete issue
    deleteIssue: function (id) {
        let issues = this.getAllIssues();
        issues = issues.filter(issue => issue.id !== id);
        localStorage.setItem('issues', JSON.stringify(issues));

        return { success: true, message: 'Issue deleted!' };
    },

    // ============================================
    // COMMENT FUNCTIONS
    // ============================================

    // Get comments for an issue
    getCommentsByIssue: function (issueId) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        return comments.filter(comment => comment.issueId === issueId);
    },

    // Add comment
    addComment: function (issueId, content) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        const currentUser = this.getCurrentUser();

        const newComment = {
            id: comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1,
            issueId: issueId,
            userId: currentUser ? currentUser.id : null,
            userName: currentUser ? currentUser.name : 'Anonymous',
            content: content,
            createdAt: new Date().toISOString()
        };

        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));

        return { success: true, message: 'Comment added!', comment: newComment };
    },

    // ============================================
    // STATISTICS
    // ============================================

    getStats: function () {
        const issues = this.getAllIssues();
        const users = this.getAllUsers();

        return {
            totalIssues: issues.length,
            pendingIssues: issues.filter(i => i.status === 'pending').length,
            inProgressIssues: issues.filter(i => i.status === 'in_progress').length,
            resolvedIssues: issues.filter(i => i.status === 'resolved').length,
            totalUsers: users.length,
            totalReporters: users.filter(u => u.role === 'reporter').length,
            totalAdmins: users.filter(u => u.role === 'admin').length
        };
    },

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    // Clear all data (use with caution!)
    clearAllData: function () {
        localStorage.removeItem('users');
        localStorage.removeItem('issues');
        localStorage.removeItem('comments');
        localStorage.removeItem('currentUser');
        console.log('⚠️ All data cleared!');
    },

    // Export all data as JSON
    exportData: function () {
        return {
            users: this.getAllUsers(),
            issues: this.getAllIssues(),
            comments: JSON.parse(localStorage.getItem('comments')) || [],
            exportedAt: new Date().toISOString()
        };
    },

    // Import data from JSON
    importData: function (data) {
        if (data.users) localStorage.setItem('users', JSON.stringify(data.users));
        if (data.issues) localStorage.setItem('issues', JSON.stringify(data.issues));
        if (data.comments) localStorage.setItem('comments', JSON.stringify(data.comments));
        console.log('✅ Data imported successfully!');
    }
};

// Initialize database when script loads
Database.init();

// Make it globally available
window.Database = Database;

console.log('🗄️ Database ready! Use Database.getAllUsers() or Database.getAllIssues() to view data.');
