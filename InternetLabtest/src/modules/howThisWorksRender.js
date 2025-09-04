import { howThisWorksData } from "../data/howThisWorksData";

export function howThisWorksRender() {
    const howThisWorksCards = document.querySelector('.how__this-works-cards');
    
    const howThisWorksHTML = howThisWorksData.works.map(work => `
        <li class="how__this-works-card">
            <img src=${work.img} alt="waiting">
            <h3 class="how__this-works-desc-title">${work.title}</h3>
            <p class="how__this-works-desc">${work.desc}</p>
        </li>
    `).join('');
    
    howThisWorksCards.innerHTML = howThisWorksHTML;
}