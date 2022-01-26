"use strict";
import Input from "./Input.js";
import Requests from "./Request.js";
import constans from "./constans.js";
import DentistCards from "./DentistCards.js";
import CardiologistCards from "./CardiologistCards.js";
import TherapistCards from "./TherapistCards.js";
import Select from "./Select.js";

class Visit {
  constructor(modalURL, cardsWindowURL) {
    this.modalURL = modalURL;
    this.cardsWindowURL = cardsWindowURL;
  }

  render() {
    const form = document.createElement("form");
    form.addEventListener("submit", this.submitHandler);
    form.id = "visit-form";

    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Visit priority:";

    const select = new Select();
    select.create();
    select.baseAttr("prioritySelect");
    select.addOption("Low", "Low");
    select.addOption("Middle", "Middle");
    select.addOption("High", "High");
    select.select.style.display = "block";

    priorityLabel.append(select.select);

    const purposeLabel = document.createElement("label");
    purposeLabel.textContent = "Purpose of visit:";
    // purposeLabel.setAttribute("for", "purpose");

    const purposeOfVisit = new Input({
      type: "text",
      name: "purpose",
      isRequired: true,
      id: "purpose",
      classes: ["purpose-of-visit", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();
    purposeLabel.append(purposeOfVisit);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Short description of visit:";

    const visitDescription = new Input({
      type: "text",
      name: "description",
      isRequired: false,
      id: "description",
      classes: ["visit-description", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();
    descriptionLabel.append(visitDescription);

    const patientNameLabel = document.createElement("label");
    patientNameLabel.textContent = "Full name of patient:";

    const patientName = new Input({
      type: "text",
      name: "patientName",
      isRequired: true,
      id: "patientName",
      classes: ["patient-name", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();
    patientNameLabel.append(patientName);

    const dateOfVisitLabel = document.createElement("label");
    dateOfVisitLabel.textContent = "Enter date of visit:";

    const dateOfVisit = new Input({
      type: "date",
      name: "visitDate",
      isRequired: true,
      id: "visitDate",
      classes: ["visit-date", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();
    dateOfVisitLabel.append(dateOfVisit);

    const btn = document.createElement("button");
    btn.textContent = "Submit";
    btn.id = "submit-btn";
    btn.classList.add("btn-success", "btn", "rounded");

    form.append(
      priorityLabel,
      patientNameLabel,
      purposeLabel,
      descriptionLabel,
      dateOfVisitLabel,
      btn
    );
    this.modalURL.append(form);
  }

  submitHandler(e) {
    e.preventDefault();

    const inputs = [...document.getElementsByClassName("card-input")];
    const doctor = document.getElementById("createVisitSelect");
    const select = document.getElementById("prioritySelect");
    const [patientName, purpose, description, visitDate] = inputs;

    const data = {
      doctor: doctor.value,
      title: purpose.value,
      description: description.value,
      patientName: patientName.value,
      visitDate: visitDate.value,
      priority: select.value,
    };

    const form = document.getElementById("visit-form");
    if (form) form.remove();

    const request = new Requests(constans.URL);
    const tokenID = localStorage.token;
    request
      .post(JSON.stringify(data), "", tokenID)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.doctor === "Dentist") {
          const card = new DentistCards(data, constans.fieldCardsContainer);
          card.render();
        } else if (data.doctor === "Cardiologist") {
          const card2 = new CardiologistCards(
            data,
            constans.fieldCardsContainer
          );
          card2.render();
        } else {
          const card3 = new TherapistCards(data, constans.fieldCardsContainer);
          card3.render();
        }
      });
  }
}

export default Visit;
