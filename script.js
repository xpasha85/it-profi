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

    // --- Кнопка "Наверх" ---

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Отслеживаем скролл страницы
    window.addEventListener('scroll', function() {
        // Если прокрутили больше 300px вниз - показываем кнопку
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show-btn');
        } else {
            // Иначе скрываем
            scrollToTopBtn.classList.remove('show-btn');
        }
    });

    // Клик по кнопке
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Отменяем стандартный переход по якорю #
        // Плавная прокрутка наверх
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- ОБРАБОТКА ФОРМЫ И МОДАЛЬНОЕ ОКНО ---

    const ctaForm = document.querySelector('.cta-form');
    const modal = document.getElementById('successModal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const modalOkBtn = document.querySelector('.modal-btn-ok');

    // Функция открытия окна
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл сайта
    }

    // Функция закрытия окна
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Возвращаем скролл
    }

    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Отменяем реальную отправку на сервер (так как бэкенда нет)
            
            // Тут можно добавить валидацию, но HTML5 required сделает это сам
            
            // 1. Показываем окно
            openModal();
            
            // 2. Очищаем форму
            ctaForm.reset();
        });
    }

    // Закрытие по крестику
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    // Закрытие по кнопке "Отлично"
    if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);

    // Закрытие по клику вне окна (по темному фону)
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

});