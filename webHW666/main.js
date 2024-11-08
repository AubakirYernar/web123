document.addEventListener('DOMContentLoaded', () => {
  // Функция для применения темы
  function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }

  // Проверка сохраненной темы
  const savedTheme = localStorage.getItem('theme') || 'light'; // по умолчанию light
  applyTheme(savedTheme);

  // Переключение темы
  const toggleThemeButton = document.getElementById('toggleTheme');
  if (toggleThemeButton) {
    toggleThemeButton.addEventListener('click', () => {
      const currentTheme = localStorage.getItem('theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  }

  // Оценка звездами
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', (event) => {
      document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
      event.target.classList.add('selected');
    });
  });

  // Показ текущего времени
  const showTimeButton = document.getElementById('showTime');
  if (showTimeButton) {
    showTimeButton.addEventListener('click', () => {
      const now = new Date().toLocaleTimeString();
      const currentTimeElement = document.getElementById('currentTime');
      if (currentTimeElement) {
        currentTimeElement.textContent = `Current time: ${now}`;
      }
    });
  }

  // Обратная связь (форма)
  const submitFormButton = document.getElementById('submitForm');
  if (submitFormButton) {
    submitFormButton.addEventListener('click', () => {
      const formMessage = document.getElementById('formMessage');
      if (formMessage) {
        formMessage.textContent = "Submitting...";
        setTimeout(() => {
          formMessage.textContent = "Thank you! Your message has been submitted.";
        }, 2000);
      }
    });
  }

  // Звуковой эффект
  const soundButton = document.querySelector('.soundButton');
  const clickSound = document.querySelector('.clickSound');
  if (soundButton && clickSound) {
    soundButton.addEventListener('click', () => {
      clickSound.play();
    });
  }

  // Кнопка вращения
  const spinButton = document.getElementById('spinButton');
  if (spinButton) {
    spinButton.addEventListener('click', () => {
      spinButton.style.transform = 'rotate(1440deg)';
      setTimeout(() => {
        spinButton.style.transform = 'rotate(0deg)';
      }, 1000);
    });
  }
});
