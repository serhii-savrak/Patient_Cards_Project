import Visit from "./Visit.js";
import Input from "./Input.js";
import Select from "./Select.js";
import constans from "./constans.js";
import Requests from "./Request.js";
import Cards from "./Cards.js";
import renderAllCards from "./renderAllCards.js";
const filterBtn = document.querySelector(".filter__search");
filterBtn.addEventListener("input", async (ev) => {
  const inputSearch = document.querySelector(".filter__search").value;
  clearCards();
  const request = new Requests(constans.URL);
  request
    .get("", constans.token)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((el) => {
        if (inputSearch) {
          const strSearch = [
            el.description,
            el.patientName,
            el.title,
            el.doctor,
          ]
            .join()
            .toLowerCase();
          const value = inputSearch.toLowerCase();
          if (strSearch.includes(value)) {
            renderAllCards(el);
          }
        }
        if (!inputSearch) {
          renderAllCards(el);
        }
      });
    });
});
const timeSelect = document.getElementById("time-select");
timeSelect.addEventListener("change", (e) => {
  clearCards();
  const request = new Requests(constans.URL);
  request
    .get("", constans.token)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((el) => {
        if (
          timeSelect.value === "Открыт" &&
          new Date() <= new Date(el.visitDate)
        ) {
          renderAllCards(el);
        } else if (
          timeSelect.value === "Завершен" &&
          new Date() > new Date(el.visitDate)
        ) {
          renderAllCards(el);
        } else if (timeSelect.value === "Все") {
          renderAllCards(el);
        }
      });
    });
});
const priorityVisit = document.querySelector(".filter__time > select");
priorityVisit.addEventListener("change", (e) => {
  clearCards();
  const request = new Requests(constans.URL);
  request
    .get("", constans.token)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((el) => {
        if (priorityVisit.value === "Обычная" && el.priority === "Low") {
          renderAllCards(el);
        } else if (
          priorityVisit.value === "Приоритетная" &&
          el.priority === "Middle"
        ) {
          renderAllCards(el);
        } else if (
          priorityVisit.value === "Неотложная" &&
          el.priority === "High"
        ) {
          renderAllCards(el);
        }
      });
    });
});
function clearCards() {
  const container = document.querySelector(".visit, .container");
  document.querySelectorAll(".card-wrapper").forEach((card) => card.remove());
}
const clearBtn = document.querySelector(".filter__btn-clr");
clearBtn.addEventListener("click", clearCards);
