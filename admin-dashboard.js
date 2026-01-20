// Initialize Lucide Icons
lucide.createIcons();

// Mock Data
const issues = [
    {
        id: 1,
        photoPath: 'pothole.png',
        category: 'Roads',
        location: '28.6139° N, 77.2090° E',
        votes: 45,
        status: 'Pending',
        date: '2023-10-25'
    },
    {
        id: 2,
        photoPath: 'issue1.png',
        category: 'Electricity',
        location: '19.0760° N, 72.8777° E',
        votes: 28,
        status: 'In Progress',
        date: '2023-10-24'
    },
    {
        id: 3,
        photoPath: 'issue2.png',
        category: 'Waste Management',
        location: '12.9716° N, 77.5946° E',
        votes: 12,
        status: 'Resolved',
        date: '2023-10-23'
    },
    {
        id: 4,
        photoPath: 'issue3.png',
        category: 'Water Supply',
        location: '13.0827° N, 80.2707° E',
        votes: 89,
        status: 'Pending',
        date: '2023-10-22'
    }
];

// Populate Table
function renderTable() {
    const tableBody = document.getElementById('issuesTableBody');
    tableBody.innerHTML = issues.map(issue => `
    <tr>
      <td><img src="${issue.photoPath}" class="issue-img" alt="${issue.category}"></td>
      <td><strong>${issue.category}</strong></td>
      <td><code style="font-size: 0.75rem">${issue.location}</code></td>
      <td>${issue.votes}</td>
      <td>
        <span class="badge ${getStatusBadgeClass(issue.status)}">
          ${issue.status}
        </span>
      </td>
      <td>${issue.date}</td>
      <td>
        <div class="action-btns">
          <button class="btn btn-outline" style="padding: 0.25rem 0.5rem" onclick="updateStatus(${issue.id}, 'In Progress')">
            <i data-lucide="play" style="width: 14px; height: 14px"></i>
          </button>
          <button class="btn btn-outline" style="padding: 0.25rem 0.5rem" onclick="updateStatus(${issue.id}, 'Resolved')">
            <i data-lucide="check" style="width: 14px; height: 14px"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
    lucide.createIcons();
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'Pending': return 'badge-pending';
        case 'In Progress': return 'badge-progress';
        case 'Resolved': return 'badge-resolved';
        default: return '';
    }
}

function updateStatus(id, newStatus) {
    const issue = issues.find(i => i.id === id);
    if (issue) {
        issue.status = newStatus;
        renderTable();
        showToast(`Issue #${id} updated to ${newStatus}`);
    }
}

// Charts Configuration
function initCharts() {
    // Trend Chart
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Issues Reported',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true },
                x: { grid: { display: false } }
            }
        }
    });

    // Category Chart
    const catCtx = document.getElementById('categoryChart').getContext('2d');
    new Chart(catCtx, {
        type: 'doughnut',
        data: {
            labels: ['Roads', 'Water', 'Cleaning', 'Power'],
            datasets: [{
                data: [300, 50, 100, 80],
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    lucide.createIcons();
});

// Toast Notification
function showToast(message) {
    console.log(message); // For now, in a real app we'd have a UI toast
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    initCharts();
});
