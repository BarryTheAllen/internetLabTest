export function initFaqAccordion() {
    document.addEventListener('click', (e) => {
        const questionEl = e.target.closest('.faq__question');
        if (!questionEl) return;

        const itemEl = questionEl.parentElement;
        const answerEl = questionEl.nextElementSibling;
        const plusIcon = questionEl.querySelector('.icon__plus');
        const minusIcon = questionEl.querySelector('.icon__minus');

        const openItems = document.querySelectorAll('.faq__item.active');
        for (const otherItem of openItems) {
            if (otherItem === itemEl) continue;
            
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq__answer');
            const otherPlus = otherItem.querySelector('.icon__plus');
            const otherMinus = otherItem.querySelector('.icon__minus');
            
            if (otherAnswer) otherAnswer.style.maxHeight = null;
            if (otherPlus) otherPlus.style.display = '';
            if (otherMinus) otherMinus.style.display = 'none';
        }

        const isOpen = itemEl.classList.toggle('active');
        
        if (answerEl) {
            answerEl.style.maxHeight = isOpen ? answerEl.scrollHeight + 'px' : null;
        }
        
        if (plusIcon) {
            plusIcon.style.display = isOpen ? 'none' : '';
        }
        
        if (minusIcon) {
            minusIcon.style.display = isOpen ? '' : 'none';
        }
    });
}