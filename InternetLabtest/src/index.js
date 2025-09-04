import './styles/index.css';
import { initBurgerMenu } from './modules/burgerMenu';
import { initFormValidation } from './modules/formValidation';
import { initSwiper } from './modules/swiperInit';
import { initFaqAccordion } from './modules/faqAccordion';
import { renderReviews } from './modules/reviewsRender';
import { howThisWorksRender } from './modules/howThisWorksRender';
import { faqRender } from './modules/faqRender';

document.addEventListener('DOMContentLoaded', function() {
    initBurgerMenu();
    initFormValidation();
    howThisWorksRender();
    renderReviews();
    initSwiper();
    faqRender()
    initFaqAccordion();
});