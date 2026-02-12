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

    // 3. ПОЛНОЭКРАННОЕ МОБИЛЬНОЕ МЕНЮ
    const burgerBtn = document.querySelector('.burger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            // Переключаем активное состояние кнопки и меню
            burgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Блокируем скролл основной страницы, когда меню открыто
            if (mobileMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Закрываем меню при клике на ссылки
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }
});