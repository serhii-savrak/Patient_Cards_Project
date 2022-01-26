import constans from "./constans.js";
import Login from "./Login.js";
import CreateSelect from "./CreateSelect.js";
import Requests from "./Request.js";
import Cards from "./Cards.js";
import Visit from "./Visit.js";
import VisitDentist from "./VisitDentist.js";
import CardiologistCards from "./CardiologistCards.js";
import TherapistCards from "./TherapistCards.js";
import DentistCards from "./DentistCards.js";
import "./Filter.js";

const login = new Login("modal3", ["modal", "modal1"]);
const selectDoctors = new CreateSelect("modal3", ["modal", "modal1"]);

constans.loginButton.addEventListener("click", logInModal);
function logInModal(e) {
  e.preventDefault();
  constans.ROOT.append(login.render());
  login.openModal();
}
constans.createVisitButton.addEventListener("click", (e) => {
  e.preventDefault();
  constans.ROOT.append(selectDoctors.render());
  selectDoctors.openModal();
});

document.addEventListener("DOMContentLoaded", onLoad);
function onLoad() {
  if (!localStorage.token) {
    constans.createVisitButton.classList.add("btn-none");
    constans.loginButton.classList.remove("btn-none");
  } else {
    constans.loginButton.classList.add("btn-none");
    constans.createVisitButton.classList.remove("btn-none");
    document.getElementById("filter").style.display = "flex";
    const request = new Requests(constans.URL);
    request
      .get("", localStorage.token)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length !== 0) {
          const fieldForCards =
            document.getElementsByClassName("field-cards")[0];
          const textNoItems =
            document.getElementsByClassName("visit__field-text")[0];
          textNoItems.style.display = "none";
          fieldForCards.className = "field-cards-modified";
          data.forEach((element) => {
            if (element.doctor === "Dentist") {
              const card1 = new DentistCards(
                element,
                constans.fieldCardsContainer
              );
              card1.render();
            } else if (element.doctor === "Cardiologist") {
              const card2 = new CardiologistCards(
                element,
                constans.fieldCardsContainer
              );
              card2.render();
            } else if (element.doctor === "Therapist") {
              const card3 = new TherapistCards(
                element,
                constans.fieldCardsContainer
              );
              card3.render();
            }
          });
        } else {
        }
      });
  }
}
