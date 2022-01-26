"use strict";

import Visit from "./Visit.js";
import Input from "./Input.js";
import Requests from "./Request.js";
import constans from "./constans.js";
import Cards from "./Cards.js";
import DentistCards from "./DentistCards.js";
import CardiologistCards from "./CardiologistCards.js";

class VisitCardiologist extends Visit {
  constructor(modalURL, cardsWindowURL) {
    super(modalURL, cardsWindowURL);
  }

  render() {
    super.render();
    const dataInput = document.getElementById("visitDate").closest("label");

    const pressureLabel = document.createElement("label");
    pressureLabel.textContent = "Normal pressure:";

    const patientPressure = new Input({
      type: "text",
      name: "patientPressure",
      isRequired: true,
      id: "patientPressure",
      classes: ["patientPressure", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();
    pressureLabel.append(patientPressure);

    const bodyMassLabel = document.createElement("label");
    bodyMassLabel.textContent = "Body mass index:";

    const patientBodyMassIndex = new Input({
      type: "text",
      name: "patientBodyMassIndex",
      isRequired: true,
      id: "patientBodyMassIndex",
      classes: ["patientBodyMassIndex", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();

    bodyMassLabel.append(patientBodyMassIndex);

    const pastDeseasesLabel = document.createElement("label");
    pastDeseasesLabel.textContent =
      "Past diseases of the cardiovascular system:";

    const patientCardiovascularDeseases = new Input({
      type: "text",
      name: "patientCardiovascularDeseases",
      isRequired: true,
      id: "patientCardiovascularDeseases",
      classes: ["patientCardiovascularDeseases", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();
    pastDeseasesLabel.append(patientCardiovascularDeseases);

    const patientAgeLabel = document.createElement("label");
    patientAgeLabel.textContent = "Patient's age:";

    const patientAge = new Input({
      type: "number",
      name: "patientAge",
      isRequired: true,
      id: "patientAge",
      classes: ["patientAge", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();

    patientAgeLabel.append(patientAge);

    dataInput.before(
      pressureLabel,
      bodyMassLabel,
      pastDeseasesLabel,
      patientAgeLabel
    );
  }

  submitHandler(e) {
    e.preventDefault();

    const inputs = [...document.getElementsByClassName("card-input")];
    const doctor = document.getElementById("createVisitSelect");
    const select = document.getElementById("prioritySelect");
    const [
      purpose,
      patientName,
      description,
      patientPressure,
      patientBodyMassIndex,
      patientCardiovascularDeseases,
      patientAge,
      visitDate,
    ] = inputs;

    const data = {
      doctor: doctor.value,
      title: purpose.value,
      description: description.value,
      patientName: patientName.value,
      visitDate: visitDate.value,
      priority: select.value,
      patientPressure: patientPressure.value,
      patientBodyMassIndex: patientBodyMassIndex.value,
      patientCardiovascularDeseases: patientCardiovascularDeseases.value,
      patientAge: patientAge.value,
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
        } else if (data.doctor === "Cardiologist") {
          const card2 = new CardiologistCards(
            data,
            constans.fieldCardsContainer
          );
          card2.render();
        } else {
          const card3 = new Cards(data, constans.fieldCardsContainer);
          card3.render();
        }
      });
  }
}

export default VisitCardiologist;
