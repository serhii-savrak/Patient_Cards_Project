import DentistCards from "./DentistCards.js";
import TherapistCards from "./TherapistCards.js";
import CardiologistCards from "./CardiologistCards.js";
import constans from "./constans.js";
function renderAllCards(el) {
  if (el.doctor === "Dentist") {
    const card = new DentistCards(el, constans.fieldCardsContainer);
    card.render();
  }
  if (el.doctor === "Therapist") {
    const card = new TherapistCards(el, constans.fieldCardsContainer);
    card.render();
  }
  if (el.doctor === "Cardiologist") {
    const card = new CardiologistCards(el, constans.fieldCardsContainer);
    card.render();
  }
}
export default renderAllCards;
