


// Reviews 

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("retroReviewForm");
    const display = document.getElementById("retroReviews");

    // 1. Загружаем отзывы из localStorage
    const storedReviews = JSON.parse(localStorage.getItem("retroReviews")) || [];
    storedReviews.forEach(addReviewToDOM);

    // 2. Обработка формы
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.name.value;
        const review = form.review.value;
        const rating = form.rating.value;

        const newReview = { name, review, rating };
        addReviewToDOM(newReview);

        // 3. Сохраняем в localStorage
        storedReviews.unshift(newReview);
        localStorage.setItem("retroReviews", JSON.stringify(storedReviews));

        form.reset();
    });

    // 4. Добавление в DOM
    function addReviewToDOM({ name, review, rating }) {
        const entry = document.createElement("div");
        entry.innerHTML = `
             <span class="review-name">${name}:</span>
             <span class="review-text">${review}</span>
             <div class="review-stars">${"★".repeat(rating)}</div>
         `;
        display.prepend(entry);
    }
});



let currentSlide = 0;
const slides = document.querySelectorAll('#slides .slide');
const totalSlides = slides.length;

function showSlide(index) {
    // Убедимся, что индекс находится в пределах допустимого диапазона
    if (index < 0) {
        currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    // Останавливаем все видео перед переключением слайда
    pauseAllVideos();

    // Скрываем все слайды
    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    // Показываем текущий слайд
    slides[currentSlide].style.display = 'block';

    // Проверяем, есть ли видео на текущем слайде
    const currentVideo = slides[currentSlide].querySelector('video');
    if (currentVideo) {
        currentVideo.play(); // Автоматически воспроизводим видео
        currentVideo.onended = () => nextSlide(); // Переход к следующему слайду после завершения видео
    }
}

function pauseAllVideos() {
    const videos = document.querySelectorAll('#slides video');
    videos.forEach(video => {
        video.pause(); // Останавливаем воспроизведение видео
        video.currentTime = 0; // Сбрасываем видео на начало
    });
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Инициализация слайдера
showSlide(currentSlide);

let startX = 0;
let endX = 0;

const slider = document.getElementById('slider');

slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX; // Запоминаем начальную точку касания
});

slider.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX; // Запоминаем конечную точку касания
    const delta = startX - endX; // Разница между начальной и конечной точкой

    if (delta > 50) {
        // Если свайп влево
        nextSlide();
    } else if (delta < -50) {
        // Если свайп вправо
        prevSlide();
    }
});

                                    // language


document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('langSelect');

    // Определяем язык по URL
    const currentLang = location.pathname.includes('-he') ? 'he' : 'ru';

    // Установка значения select, если он существует
    if (langSelect) {
        langSelect.value = currentLang;

        langSelect.addEventListener('change', () => {
            const selectLang = langSelect.value;
            if (selectLang === 'he') {
                window.location.href = 'index-he.html';
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    // Автоматическое перенаправление на иврит, если браузер he и мы на главной
    if (!localStorage.getItem('langAutoRedirect')) {
        const isHebrewBrowser = navigator.language.startsWith('he');
        const isRootPage =
            location.pathname === '/Master/' ||
            location.pathname.endsWith('index.html');

        if (isHebrewBrowser && isRootPage) {
            localStorage.setItem('langAutoRedirect', 'true');
            window.location.href = 'index-he.html';
        }
    }
});


// document.addEventListener('DOMContentLoaded', () => {
//     const langSelect = document.getElementById('langSelect');


//     // Определяем язык по URL

//     const currentLang = location.pathname.includes('-he') ? 'he' : 'ru';

    
//     // Установка значения select, если он существует

//     if (langSelect) {
//         langSelect.value = currentLang;

//         langSelect.addEventListener('change', () => {
//             const selectLang =langSelect.value;
//             if (selectLang === 'he') {
//                 window.location.href = 'index-he.html';
//             } else {
//                 window.location.href = 'index.html';
//             }
//         });
//     }



//     // Автоматическое перенаправление на иврит, если браузер he и находимся в ru

//     if (!localStorage.getItem('langAutoRedirect')) {
//         const isHebrewBrowser = navigator.language.startsWith('he');
        
//         const isRootPage = location.pathname.endsWith('index.html') || location.pathname === '/';
        
//         if (isHebrewBrowser && isRootPage) {
//             localStorage.setItem('langAutoRedirect', 'true');
//             window.location.href = 'index-he.html';
//         }
//     }
// });




document.addEventListener('DOMContentLoaded', () => {
    const slides = Array.from(document.querySelectorAll('.slide img, .slide video'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.querySelector('.lightbox .close');
  
    let currentIndex = 0;
  
    // Показать элемент по индексу
    function showLightbox(index) {
      const el = slides[index];
      if (!el) return;
  
      currentIndex = index;
      lightbox.classList.remove('hidden');
  
      if (el.tagName === 'IMG') {
        lightboxImg.src = el.src;
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
      } else {
        const videoSrc = el.querySelector('source')?.src;
        lightboxVideo.src = videoSrc || '';
        lightboxVideo.style.display = 'block';
        lightboxImg.style.display = 'none';
      }
    }

    const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

if (leftArrow && rightArrow) {
  leftArrow.addEventListener('click', () => {
    showLightbox((currentIndex - 1 + slides.length) % slides.length);
  });

  rightArrow.addEventListener('click', () => {
    showLightbox((currentIndex + 1) % slides.length);
  });
}

  
    // Обработчик тапов по миниатюрам
    slides.forEach((el, idx) => {
      el.addEventListener('click', () => showLightbox(idx));
    });
  
    closeBtn.addEventListener('click', () => {
      lightbox.classList.add('hidden');
      lightboxImg.src = '';
      lightboxVideo.pause();
      lightboxVideo.src = '';
    });
  
    // Свайп — touch
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    });
  
    lightbox.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;
  
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          // swipe left
          showLightbox((currentIndex + 1) % slides.length);
        } else {
          // swipe right
          showLightbox((currentIndex - 1 + slides.length) % slides.length);
        }
      }
    });
  });
  
  








// if (langSelect) {
    //     langSelect.addEventListener('change', () => {
    //         const selectedLang = langSelect.value;
    //         if (selectedLang === 'he') {
    //             window.location.href = 'index-he.html';
    //         } else {
    //             window.location.href = 'index.html';
    //         }
    //     });
    // }
