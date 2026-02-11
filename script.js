document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Отменяем стандартный резкий прыжок

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Скроллим с отступом сверху (чтобы хедер не перекрыл заголовок)
                const headerOffset = 100; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth" // Самая важная часть — плавность
                });
            }
        });
    });

    // 2. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (Observer)
    // Элементы будут мягко всплывать, когда до них докручиваешь
    const observerOptions = {
        threshold: 0.1 // Срабатывает, когда показалось 10% элемента
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Анимируем только один раз
            }
        });
    }, observerOptions);

    // Следим за всеми секциями
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden'); // Сначала скрываем
        observer.observe(section);
    });
});