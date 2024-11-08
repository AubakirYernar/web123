document.addEventListener('DOMContentLoaded', () => {
    // Функция для добавления нового пользователя в localStorage
    function addUser(username, email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = { username, email, password, theme: 'light' }; // По умолчанию светлая тема
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Функция для проверки существования пользователя по username
    function userExists(username) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.username === username);
    }

    // Регистрация
    const regForm = document.querySelector('.reg_form');
    if (regForm) {
        regForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Остановка отправки формы

            const username = document.querySelector('.reg_username').value.trim();
            const email = document.querySelector('.reg_email').value.trim();
            const password = document.querySelector('.reg_password').value;
            const confirmPassword = document.querySelector('.reg_conf_password').value;

            let isValid = true;

            // Проверка username
            if (username === "") {
                alert("Username is required.");
                isValid = false;
            }

            // Проверка существования username
            if (isValid && userExists(username)) {
                alert("Username already exists.");
                isValid = false;
            }

            // Проверка email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                isValid = false;
            }

            // Проверка пароля
            if (password.length < 6) {
                alert("Password must be at least 6 characters long.");
                isValid = false;
            }

            // Проверка совпадения паролей
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                isValid = false;
            }

            // Если форма валидна, добавляем пользователя
            if (isValid) {
                addUser(username, email, password);
                alert("Registration successful!");
                window.location.href = "sign_in.html";  // Переход на страницу входа
            }
        });
    }

    // Вход
    const loginForm = document.querySelector('.login_form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // остановить форму

            const username = document.querySelector('input[name="username"]').value.trim();
            const password = document.querySelector('input[name="password"]').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                alert("Login successful!");
                localStorage.setItem('currentUser', JSON.stringify(user)); // сохраняем пользователя в localStorage
                window.location.href = "home2.html"; // переходим в личный кабинет
            } else {
                alert("Invalid username or password.");
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // Остальной код регистрации и входа остается

    // Логика выхода из аккаунта
    const logoutButton = document.querySelector('.logout_button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('currentUser'); // Удаляем текущего пользователя из localStorage
            alert("Вы успешно вышли из аккаунта.");
            window.location.href = "sign_in.html"; // Переход на страницу входа
        });
    }
});