import { faqData } from "../data/faqData";

export function faqRender() {
    const faqList = document.querySelector('.faq__list');
    
    const faqListHTML = faqData.faq.map(faqItem => `
        <div class="faq__item">
                <div class="faq__question">
                    <span>${faqItem.title}</span>
                    <div class="faq__icon">
                        <img src=${faqItem.plusImg} alt="plus" class="icon__plus">
                        <img src=${faqItem.minusImg} alt="minus" class="icon__minus">
                    </div>
                </div>
                <div class="faq__answer">
                    <p>${faqItem.desc}</p>
                </div>
            </div>
    `).join('');
    
    faqList.innerHTML = faqListHTML;
}