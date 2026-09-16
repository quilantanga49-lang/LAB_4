document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberMe = document.getElementById('rememberMe');
    const alertContainer = document.getElementById('alertContainer');

    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
        return;
    }

    const validCredentials = {
        username: 'arjay',
        password: 'arjay123'
    };

    function showAlert(message, type) {
        alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <i class="bi bi-${type === 'danger' ? 'exclamation-circle' : 'check-circle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }

    function handleLogin() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            showAlert('Please enter both username and password.', 'danger');
            return;
        }

        if (username === validCredentials.username && password === validCredentials.password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            localStorage.setItem('loginTime', new Date().toISOString());

            if (rememberMe.checked) {
                localStorage.setItem('rememberUser', 'true');
            } else {
                localStorage.removeItem('rememberUser');
            }

            showAlert('Login successful! Redirecting...', 'success');

            setTimeout(function() {
                window.location.href = 'dashboard.html';
            }, 800);
        } else {
            showAlert('Invalid username or password. Use arjay / arjay123.', 'danger');
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        handleLogin();
    });

    usernameInput.addEventListener('focus', function() {
        alertContainer.innerHTML = '';
    });

    passwordInput.addEventListener('focus', function() {
        alertContainer.innerHTML = '';
    });
});