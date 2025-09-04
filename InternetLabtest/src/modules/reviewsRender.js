import { reviewsData } from '../data/reviewsData';

export function renderReviews() {
    const reviewsWrapper = document.querySelector('.reviews__wrapper');
    
    const reviewsHTML = reviewsData.reviews.map(review => `
        <div class="reviews__slide swiper-slide">
            <div class="user__info">
                <img src="${review.image}" alt="${review.alt}">
                <h3 class="user__name">${review.name}</h3>
                <p class="user__city">${review.city}</p>
            </div>
            <p class="user__review">${review.review}</p>
        </div>
    `).join('');
    
    reviewsWrapper.innerHTML = reviewsHTML;
}