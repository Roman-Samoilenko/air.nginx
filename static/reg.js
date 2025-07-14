// Оригинальная логика формы
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const data = {
            login: document.getElementById('login').value,
            password: document.getElementById('password').value
        };

        try {
            const response = await fetch('/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                showAlert('success', result.message || 'Регистрация успешна!');
            } else {
                const error = await response.json();
                showAlert('error', error.message || 'Ошибка регистрации');
            }
        } catch (error) {
            showAlert('error', 'Ошибка сети');
            console.error('Ошибка:', error);
        }
    });

    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        alertDiv.textContent = message;

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    // Простые эффекты для улучшения UX
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        // Эффект фокуса
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.01)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });

        // Эффект набора текста
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.3)';
            } else {
                this.style.boxShadow = '';
            }
        });
    });

    // Анимация появления формы
    const card = document.querySelector('.card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);

    // Плавная анимация кнопки
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});