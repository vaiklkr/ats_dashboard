document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Toggle for Mobile
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.getElementById('menuToggle');
    
    // Create overlay element if it doesn't exist
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }

    // Close sidebar when clicking overlay
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Close sidebar when clicking a link on mobile
    const navLinks = sidebar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });

    // Set Current Date
    const dateEl = document.getElementById('currentDate');
    if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // Dummy JSON Data
    const dashboardData = {
        stats: { jobs: 14, candidates: 284, interviews: 42 },
        recentApplications: [
            { name: "Rahul Sharma", role: "Frontend Developer", status: "shortlisted" },
            { name: "Priya Patel", role: "UI Designer", status: "pending" },
            { name: "Amit Verma", role: "React Developer", status: "rejected" },
            { name: "Sneha Rao", role: "Backend Developer", status: "hired" }
        ]
    };

    // Render Stats
    if (document.getElementById('totalJobs')) {
        document.getElementById('totalJobs').innerText = dashboardData.stats.jobs;
        document.getElementById('totalCandidates').innerText = dashboardData.stats.candidates;
        document.getElementById('totalInterviews').innerText = dashboardData.stats.interviews;

        const tableBody = document.querySelector('#recentApplicationsTable tbody');
        tableBody.innerHTML = dashboardData.recentApplications.map(app => `
            <tr><td>${app.name}</td><td>${app.role}</td><td><span class="status ${app.status}">${app.status}</span></td></tr>
        `).join('');
    }

    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');

    function updateToggleButton(isDark) {
        if (!darkModeToggle) return;
        const icon = isDark ? 'fa-sun' : 'fa-moon';
        const text = isDark ? 'Light Mode' : 'Dark Mode';
        darkModeToggle.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${text}</span>`;
    }

    // Dark Mode Toggle Logic
    if (darkModeToggle) {
        // Check for saved preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            updateToggleButton(true);
        }

        darkModeToggle.addEventListener('click', () => {
            const isNowDark = body.classList.toggle('dark-mode');
            updateToggleButton(isNowDark);
            if (isNowDark) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const table = document.getElementById('candidateTable');

    const filterCandidates = () => {
        if (!table) return;
        const filter = searchInput?.value.toLowerCase() || "";
        const statusVal = statusFilter?.value.toLowerCase() || "";
        const rows = table.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            if (cells.length < 4) continue;
            const name = cells[0].textContent.toLowerCase();
            const role = cells[1].textContent.toLowerCase();
            const status = cells[3].textContent.trim().toLowerCase();

            const matchesText = name.includes(filter) || role.includes(filter);
            const matchesStatus = statusVal === "" || status === statusVal;
            
            rows[i].style.display = (matchesText && matchesStatus) ? "" : "none";
        }
    };

    if (searchInput) searchInput.addEventListener('input', filterCandidates);
    if (statusFilter) statusFilter.addEventListener('change', filterCandidates);

    const jobSearchInput = document.getElementById('jobSearchInput');
    const jobStatusFilter = document.getElementById('jobStatusFilter');
    const jobGrid = document.querySelector('.job-grid');

    const filterJobs = () => {
        if (!jobGrid) return;
        const filter = jobSearchInput?.value.toLowerCase() || "";
        const statusVal = jobStatusFilter?.value.toLowerCase() || "";
        const cards = jobGrid.getElementsByClassName('job-card');

        for (let card of cards) {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || "";
            const location = card.querySelector('p')?.textContent.toLowerCase() || "";
            const status = card.querySelector('.status')?.textContent.trim().toLowerCase() || "";

            const matchesText = title.includes(filter) || location.includes(filter);
            const matchesStatus = statusVal === "" || status === statusVal;
            
            card.style.display = (matchesText && matchesStatus) ? "" : "none";
        }
    };

    if (jobSearchInput) jobSearchInput.addEventListener('input', filterJobs);
    if (jobStatusFilter) jobStatusFilter.addEventListener('change', filterJobs);

    // Main Hiring Chart (Bar)
    const hireCtx = document.getElementById('hiringChart')?.getContext('2d');
    if (hireCtx) {
        new Chart(hireCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Hired Candidates',
                    data: [12, 19, 13, 15, 22, 30],
                    backgroundColor: '#6c63ff',
                    borderRadius: 6
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, grid: { display: false } }, x: { grid: { display: false } } }
            }
        });
    }

    // Pipeline Chart (Donut)
    const pipeCtx = document.getElementById('pipelineChart')?.getContext('2d');
    if (pipeCtx) {
        new Chart(pipeCtx, {
            type: 'doughnut',
            data: {
                labels: ['Applied', 'Shortlisted', 'Interview', 'Hired', 'Rejected'],
                datasets: [{
                    data: [120, 80, 45, 20, 15],
                    backgroundColor: ['#94a3b8', '#6c63ff', '#f59e0b', '#10b981', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } } },
                cutout: '70%'
            }
        });
    }
});