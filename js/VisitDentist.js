"use strict";

import Visit from "./Visit.js";
import Input from "./Input.js";
import Requests from "./Request.js";
import constans from "./constans.js";
import Cards from "./Cards.js";
import DentistCards from "./DentistCards.js";

class VisitDentist extends Visit {
  constructor(modalURL, cardsWindowURL) {
    super(modalURL, cardsWindowURL);
  }

  render() {
    super.render();
    const dataInput = document.getElementById("visitDate").closest("label");

    const lastVisitLabel = document.createElement("label");
    lastVisitLabel.textContent = "Last visit date:";

    const lastVisit = new Input({
      type: "date",
      name: "lastVisitDate",
      isRequired: true,
      id: "lastVisitDate",
      classes: ["lastVisitDate", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();

    lastVisitLabel.append(lastVisit);

    dataInput.before(lastVisitLabel);
  }

  submitHandler(e) {
    e.preventDefault();

    const inputs = [...document.getElementsByClassName("card-input")];
    const doctor = document.getElementById("createVisitSelect");
    const select = document.getElementById("prioritySelect");
    const [patientName, purpose, description, lastVisitDate, visitDate] =
      inputs;

    const data = {
      doctor: doctor.value,
      title: purpose.value,
      description: description.value,
      patientName: patientName.value,
      visitDate: visitDate.value,
      lastVisitDate: lastVisitDate.value,
      priority: select.value,
    };

    const form = document.getElementById("modal3");
    if (form) form.remove();
    const request = new Requests(constans.URL);
    const tokenID = localStorage.token;
    request
      .post(JSON.stringify(data), "", tokenID)
      .then((resp) => resp.json())
      .then((data) => {
        document.querySelector(".visit__field-text").style.display = "none";
        if (document.getElementsByClassName("field-cards")[0]) {
          const fieldForCards =
            document.getElementsByClassName("field-cards")[0];
          fieldForCards.className = "field-cards-modified";
        }

        if (data.doctor === "Dentist") {
          const card = new DentistCards(data, constans.fieldCardsContainer);
          card.render();
        } else {
          const card2 = new Cards(data, constans.fieldCardsContainer);
          card2.render();
        }
      });
  }
}

export default VisitDentist;
