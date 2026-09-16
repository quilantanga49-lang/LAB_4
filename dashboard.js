document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    const username = localStorage.getItem('username') || 'Student';
    const contentArea = document.getElementById('contentArea');
    const navLinks = document.querySelectorAll('[data-section]');

    document.getElementById('navUsername').textContent = username;

    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    }

    function formatDate() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    }

    function getStoredData(key, fallback) {
        const saved = localStorage.getItem(key);
        if (!saved) return fallback;

        try {
            return JSON.parse(saved);
        } catch (error) {
            return fallback;
        }
    }

    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    document.getElementById('greeting').textContent = getGreeting() + ', ' + username;
    document.getElementById('dateDisplay').textContent = formatDate();

    const defaultDashboardCards = [
        { title: 'Overall GPA', value: '3.85', icon: 'bi-star-fill', color: 'primary', note: '+0.15 from last semester' },
        { title: 'Current Courses', value: '6', icon: 'bi-book', color: 'success', note: '3 major, 2 general, 1 elective' },
        { title: 'Pending Tasks', value: '12', icon: 'bi-clipboard-check', color: 'warning', note: '3 due this week' },
        { title: 'Attendance', value: '94%', icon: 'bi-check2-circle', color: 'info', note: '+2% improvement' }
    ];

    const defaultActivities = [
        { activity: 'Assignment Submitted', course: 'Web System Analysis', date: 'Today', status: 'Completed', className: 'success' },
        { activity: 'Quiz Attempted', course: 'Data Structures', date: 'Yesterday', status: 'Graded', className: 'primary' },
        { activity: 'Project Proposal', course: 'Software Engineering', date: '2 days ago', status: 'Pending', className: 'warning' },
        { activity: 'Lab Report', course: 'Networkking', date: '3 days ago', status: 'Completed', className: 'success' }
    ];

    const defaultCourses = [
        { name: 'Web System Analysis', code: 'CS101', days: 'Mon & Wed', time: '9:00 AM - 10:30 AM', instructor: 'Mr. Santos' },
        { name: 'Data Structures', code: 'CS205', days: 'Tue & Thu', time: '1:00 PM - 2:30 PM', instructor: 'Ms. Reyes' },
        { name: 'Database Systems', code: 'CS310', days: 'Mon & Fri', time: '10:30 AM - 12:00 PM', instructor: 'Mr. Flores' },
        { name: 'Networkking', code: 'CS240', days: 'Wed & Fri', time: '2:00 PM - 3:30 PM', instructor: 'Mrs. Cruz' }
    ];

    let attendance = getStoredData('studentAttendance', [
        { subject: 'Web System Analysis', present: 18, total: 20, percent: '90%' },
        { subject: 'Data Structures', present: 17, total: 20, percent: '85%' },
        { subject: 'Database Systems', present: 19, total: 20, percent: '95%' },
        { subject: 'Networkking', present: 16, total: 18, percent: '89%' }
    ]);

    let grades = getStoredData('studentGrades', [
        { subject: 'Web System Analysis', score: '92', remark: 'Excellent' },
        { subject: 'Data Structures', score: '88', remark: 'Very Good' },
        { subject: 'Database Systems', score: '90', remark: 'Very Good' },
        { subject: 'Networkking', score: '85', remark: 'Good' }
    ]);

    let assignments = getStoredData('studentAssignments', [
        { title: 'HTML & CSS Activity', subject: 'Web System Analysis', due: 'May 18, 2026', status: 'Submitted' },
        { title: 'Linked List Exercise', subject: 'Data Structures', due: 'May 20, 2026', status: 'Pending' },
        { title: 'SQL Practical', subject: 'Database Systems', due: 'May 22, 2026', status: 'Ongoing' },
        { title: 'Network Diagram', subject: 'Networkking', due: 'May 24, 2026', status: 'Pending' }
    ]);

    let schedule = getStoredData('studentSchedule', [
        { day: 'Monday', time: '9:00 AM', subject: 'Web System Analysis' },
        { day: 'Tuesday', time: '1:00 PM', subject: 'Data Structures' },
        { day: 'Wednesday', time: '9:00 AM', subject: 'Web System Analysis' },
        { day: 'Thursday', time: '1:00 PM', subject: 'Data Structures' },
        { day: 'Friday', time: '10:30 AM', subject: 'Database Systems' }
    ]);

    const dashboardCards = defaultDashboardCards;
    const activities = defaultActivities;
    const courses = defaultCourses;

    function renderDashboard() {
        const cardHtml = dashboardCards.map(function(card) {
            return `
                <div class="col-md-6 col-xl-3 mb-4">
                    <div class="card stat-card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="small text-muted mb-1">${card.title}</p>
                                    <h3 class="stat-value mb-0">${card.value}</h3>
                                </div>
                                <div class="stat-icon bg-${card.color}">
                                    <i class="${card.icon}"></i>
                                </div>
                            </div>
                            <small class="text-muted">${card.note}</small>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const activityHtml = activities.map(function(item) {
            return `
                <tr>
                    <td>${item.activity}</td>
                    <td>${item.course}</td>
                    <td>${item.date}</td>
                    <td><span class="badge bg-${item.className}">${item.status}</span></td>
                </tr>
            `;
        }).join('');

        return `
            <div class="row mb-4">${cardHtml}</div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0"><i class="bi bi-clock-history me-2"></i>Recent Activity</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th>Activity</th>
                                    <th>Course</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>${activityHtml}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    function renderCourses() {
        const courseHtml = courses.map(function(course) {
            return `
                <div class="col-md-6 mb-3">
                    <div class="card simple-card">
                        <div class="card-body">
                            <h5 class="card-title">${course.name}</h5>
                            <p class="mb-1"><strong>Code:</strong> ${course.code}</p>
                            <p class="mb-1"><strong>Schedule:</strong> ${course.days}</p>
                            <p class="mb-1"><strong>Time:</strong> ${course.time}</p>
                            <p class="mb-0"><strong>Instructor:</strong> ${course.instructor}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0"><i class="bi bi-book me-2"></i>My Courses</h5>
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-return="dashboard">Return</button>
                </div>
                <div class="card-body">
                    <div class="row">${courseHtml}</div>
                </div>
            </div>
        `;
    }

    function renderAttendance() {
        const attendanceHtml = attendance.map(function(item) {
            return `
                <tr>
                    <td>${item.subject}</td>
                    <td>${item.present}/${item.total}</td>
                    <td>${item.percent}</td>
                </tr>
            `;
        }).join('');

        return `
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0"><i class="bi bi-calendar-check me-2"></i>Attendance</h5>
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-return="dashboard">Return</button>
                </div>
                <div class="card-body">
                    <form id="attendanceForm" class="row g-2 mb-3">
                        <div class="col-md-4">
                            <input type="text" class="form-control" name="subject" placeholder="Subject" required>
                        </div>
                        <div class="col-md-3">
                            <input type="number" class="form-control" name="present" placeholder="Present" min="0" required>
                        </div>
                        <div class="col-md-3">
                            <input type="number" class="form-control" name="total" placeholder="Total" min="1" required>
                        </div>
                        <div class="col-md-2">
                            <button type="submit" class="btn btn-primary w-100">Add</button>
                        </div>
                    </form>
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Present</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
                            <tbody>${attendanceHtml}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    function renderGrades() {
        const gradesHtml = grades.map(function(item) {
            return `
                <tr>
                    <td>${item.subject}</td>
                    <td>${item.score}</td>
                    <td>${item.remark}</td>
                </tr>
            `;
        }).join('');

        return `
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0"><i class="bi bi-clipboard-data me-2"></i>Grades</h5>
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-return="dashboard">Return</button>
                </div>
                <div class="card-body">
                    <form id="gradesForm" class="row g-2 mb-3">
                        <div class="col-md-4">
                            <input type="text" class="form-control" name="subject" placeholder="Subject" required>
                        </div>
                        <div class="col-md-3">
                            <input type="text" class="form-control" name="score" placeholder="Grade" required>
                        </div>
                        <div class="col-md-3">
                            <input type="text" class="form-control" name="remark" placeholder="Remark" required>
                        </div>
                        <div class="col-md-2">
                            <button type="submit" class="btn btn-primary w-100">Add</button>
                        </div>
                    </form>
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Grade</th>
                                    <th>Remark</th>
                                </tr>
                            </thead>
                            <tbody>${gradesHtml}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    function renderAssignments() {
        const assignmentHtml = assignments.map(function(item) {
            return `
                <div class="list-item">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-1">${item.title}</h6>
                            <small class="text-muted">${item.subject}</small>
                        </div>
                        <span class="badge bg-light text-dark">${item.status}</span>
                    </div>
                    <p class="mb-0 mt-2"><strong>Due:</strong> ${item.due}</p>
                </div>
            `;
        }).join('');

        return `
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0"><i class="bi bi-journal-text me-2"></i>Assignments</h5>
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-return="dashboard">Return</button>
                </div>
                <div class="card-body">
                    <form id="assignmentsForm" class="row g-2 mb-3">
                        <div class="col-md-4">
                            <input type="text" class="form-control" name="title" placeholder="Assignment Title" required>
                        </div>
                        <div class="col-md-3">
                            <input type="text" class="form-control" name="subject" placeholder="Subject" required>
                        </div>
                        <div class="col-md-3">
                            <input type="text" class="form-control" name="due" placeholder="Due Date" required>
                        </div>
                        <div class="col-md-2">
                            <button type="submit" class="btn btn-primary w-100">Add</button>
                        </div>
                    </form>
                    ${assignmentHtml}
                </div>
            </div>
        `;
    }

    function renderSchedule() {
        const scheduleHtml = schedule.map(function(item) {
            return `
                <tr>
                    <td>${item.day}</td>
                    <td>${item.time}</td>
                    <td>${item.subject}</td>
                </tr>
            `;
        }).join('');

        return `
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0"><i class="bi bi-calendar-event me-2"></i>Schedule</h5>
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-return="dashboard">Return</button>
                </div>
                <div class="card-body">
                    <form id="scheduleForm" class="row g-2 mb-3">
                        <div class="col-md-4">
                            <input type="text" class="form-control" name="day" placeholder="Day" required>
                        </div>
                        <div class="col-md-3">
                            <input type="text" class="form-control" name="time" placeholder="Time" required>
                        </div>
                        <div class="col-md-3">
                            <input type="text" class="form-control" name="subject" placeholder="Subject" required>
                        </div>
                        <div class="col-md-2">
                            <button type="submit" class="btn btn-primary w-100">Add</button>
                        </div>
                    </form>
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Time</th>
                                    <th>Subject</th>
                                </tr>
                            </thead>
                            <tbody>${scheduleHtml}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    function attachFormHandlers() {
        const returnButtons = document.querySelectorAll('[data-return="dashboard"]');
        returnButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                renderSection('dashboard');
            });
        });

        const attendanceForm = document.getElementById('attendanceForm');
        if (attendanceForm) {
            attendanceForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(attendanceForm);
                const subject = formData.get('subject').toString().trim();
                const present = Number(formData.get('present'));
                const total = Number(formData.get('total'));

                if (!subject || !present || !total) return;

                const percent = total > 0 ? Math.round((present / total) * 100) + '%' : '0%';
                attendance.push({ subject: subject, present: present, total: total, percent: percent });
                saveData('studentAttendance', attendance);
                renderSection('attendance');
            });
        }

        const gradesForm = document.getElementById('gradesForm');
        if (gradesForm) {
            gradesForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(gradesForm);
                const subject = formData.get('subject').toString().trim();
                const score = formData.get('score').toString().trim();
                const remark = formData.get('remark').toString().trim();

                if (!subject || !score || !remark) return;

                grades.push({ subject: subject, score: score, remark: remark });
                saveData('studentGrades', grades);
                renderSection('grades');
            });
        }

        const assignmentsForm = document.getElementById('assignmentsForm');
        if (assignmentsForm) {
            assignmentsForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(assignmentsForm);
                const title = formData.get('title').toString().trim();
                const subject = formData.get('subject').toString().trim();
                const due = formData.get('due').toString().trim();

                if (!title || !subject || !due) return;

                assignments.push({ title: title, subject: subject, due: due, status: 'New' });
                saveData('studentAssignments', assignments);
                renderSection('assignments');
            });
        }

        const scheduleForm = document.getElementById('scheduleForm');
        if (scheduleForm) {
            scheduleForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(scheduleForm);
                const day = formData.get('day').toString().trim();
                const time = formData.get('time').toString().trim();
                const subject = formData.get('subject').toString().trim();

                if (!day || !time || !subject) return;

                schedule.push({ day: day, time: time, subject: subject });
                saveData('studentSchedule', schedule);
                renderSection('schedule');
            });
        }
    }

    function renderSection(sectionName) {
        navLinks.forEach(function(link) {
            const isActive = link.getAttribute('data-section') === sectionName;
            link.classList.toggle('active', isActive);
        });

        if (sectionName === 'dashboard') {
            contentArea.innerHTML = renderDashboard();
        } else if (sectionName === 'courses') {
            contentArea.innerHTML = renderCourses();
        } else if (sectionName === 'attendance') {
            contentArea.innerHTML = renderAttendance();
        } else if (sectionName === 'grades') {
            contentArea.innerHTML = renderGrades();
        } else if (sectionName === 'assignments') {
            contentArea.innerHTML = renderAssignments();
        } else if (sectionName === 'schedule') {
            contentArea.innerHTML = renderSchedule();
        }

        attachFormHandlers();
    }

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            renderSection(link.getAttribute('data-section'));
        });
    });

    document.getElementById('navLogout').addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('rememberUser');
        window.location.href = 'index.html';
    });

    renderSection('dashboard');
});