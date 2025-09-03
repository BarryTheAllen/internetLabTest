import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initSwiper() {
    const reviewsSwiperElement = document.querySelector('.reviews__section.swiper');
    if (!reviewsSwiperElement) return;

    const reviewsSwiper = new Swiper(reviewsSwiperElement, {
        modules: [Navigation, Pagination],
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            reviewsSwiper.update();
        }, 250);
    });
}