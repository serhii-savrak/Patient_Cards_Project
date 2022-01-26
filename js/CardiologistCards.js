import constans from "./constans.js";
import Requests from "./Request.js";
import Visit from "./Visit.js";
import Modal from "./Modal.js";
import Cards from "./Cards.js";
import Input from "./Input.js";

class CardiologistCards extends Cards {
  constructor(
    {
      description,
      title,
      patientName,
      id,
      priority,
      doctor,
      visitDate,
      patientPressure,
      patientBodyMassIndex,
      patientCardiovascularDeseases,
      patientAge,
    },
    url
  ) {
    super({ description, title, patientName, id, priority }, url);
    this.doctor = doctor;
    this.visitDate = visitDate;
    this.url = url;
    this.patientPressure = patientPressure;
    this.patientBodyMassIndex = patientBodyMassIndex;
    this.patientCardiovascularDeseases = patientCardiovascularDeseases;
    this.patientAge = patientAge;
  }

  render() {
    this.cardWrapper = document.createElement("div");
    this.cardWrapper.classList.add(
      "card-wrapper",
      "border",
      "border-info",
      "rounded",
      "d-flex",
      "flex-column",
      "p-4",
      "bg-danger",
      "bg-gradient"
    );

    const purposeVisit = document.createElement("p");
    purposeVisit.textContent = `The problem is: ${this.title}`;
    purposeVisit.classList.add("card-info");

    const doctorName = document.createElement("p");
    doctorName.textContent = `The doctor is: ${this.doctor}`;
    doctorName.classList.add("card-info", "active");

    const shortDescription = document.createElement("p");
    shortDescription.textContent = `Description: ${this.description}`;
    shortDescription.classList.add("card-info");

    const fullName = document.createElement("p");
    fullName.textContent = `Patient: ${this.patientName}`;
    fullName.classList.add("card-info", "active");

    const priority = document.createElement("p");
    priority.textContent = `Priority: ${this.priority}`;
    priority.classList.add("card-info", "font-weight-bold");
    // ===================================================================
    const patientPressure = document.createElement("p");
    patientPressure.textContent = `Normal pressure: ${this.patientPressure}`;
    patientPressure.classList.add("card-info", "font-weight-bold");

    const patientBodyMassIndex = document.createElement("p");
    patientBodyMassIndex.textContent = `Body mass index: ${this.patientBodyMassIndex}`;
    patientBodyMassIndex.classList.add("card-info", "font-weight-bold");

    const patientCardiovascularDeseases = document.createElement("p");
    patientCardiovascularDeseases.textContent = `Past diseases of the cardiovascular system: ${this.patientCardiovascularDeseases}`;
    patientCardiovascularDeseases.classList.add(
      "card-info",
      "font-weight-bold"
    );

    const patientAge = document.createElement("p");
    patientAge.textContent = `Patient's age: ${this.patientAge}`;
    patientAge.classList.add("card-info", "font-weight-bold");

    // ======================================================================
    const visitTime = document.createElement("p");
    visitTime.textContent = `Visit date: ${this.visitDate}`;
    visitTime.classList.add("card-info", "font-weight-bold");

    const editBtn = document.createElement("a");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", this.editHandler);
    editBtn.classList.add("text-warning", "edit-btn", "d-inline", "card-btn");

    const showmoreBtn = document.createElement("a");
    showmoreBtn.textContent = "Show more";
    showmoreBtn.addEventListener("click", this.showMore);
    showmoreBtn.classList.add(
      "text-info",
      "showmore-btn",
      "d-inline",
      "card-btn"
    );

    const closetBtn = document.createElement("a");
    closetBtn.textContent = "X";
    closetBtn.addEventListener("click", this.closeCardHandler);
    closetBtn.classList.add("text-danger", "close-btn", "d-inline", "card-btn");

    this.cardWrapper.append(
      doctorName,
      fullName,
      priority,
      purposeVisit,
      shortDescription,
      patientPressure,
      patientBodyMassIndex,
      patientCardiovascularDeseases,
      patientAge,
      visitTime,
      showmoreBtn,
      editBtn,
      closetBtn
    );
    this.url.append(this.cardWrapper);
  }

  editHandler = (e) => {
    const modalEditWindow = new Modal(
      "edit-modal",
      ["modal", "modal-content"],
      "You're editing patient's card..."
    );

    const newModal = modalEditWindow.render();
    modalEditWindow.openModal();
    constans.ROOT.append(newModal);
    const modal = document.getElementById("modalTitle");

    const editForm = new Visit(modal, "");

    editForm.submitHandler = (e) => {
      e.preventDefault();

      const inputs = [...document.getElementsByClassName("card-input")];
      const doctorSelect = document.getElementById("createVisitSelect");
      const select = document.getElementById("prioritySelect");
      const [
        patientName,
        purpose,
        description,
        patientPressure,
        patientBodyMassIndex,
        patientCardiovascularDeseases,
        patientAge,
        visitDate,
      ] = inputs;

      const data = {
        doctor: this.doctor,
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

      const request = new Requests(constans.URL);
      request
        .put("", JSON.stringify(data), this.id, constans.token)
        .then((resp) => resp.json())
        .then((data) => {
          const card = new CardiologistCards(
            data,
            constans.fieldCardsContainer
          );
          card.render();
          this.cardWrapper.remove();
          document.getElementById("edit-modal").remove();
        });
    };

    editForm.render();

    const dataInput = document.getElementById("visitDate").closest("label");

    const pressureLabel = document.createElement("label");
    pressureLabel.textContent = "Normal pressure:";

    const patientPress = new Input({
      type: "text",
      name: "patientPressure",
      isRequired: true,
      id: "patientPressure",
      classes: ["patientPressure", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();
    pressureLabel.append(patientPress);

    const bodyMassLabel = document.createElement("label");
    bodyMassLabel.textContent = "Body mass index:";

    const patientBodyMassI = new Input({
      type: "text",
      name: "patientBodyMassIndex",
      isRequired: true,
      id: "patientBodyMassIndex",
      classes: ["patientBodyMassIndex", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();

    bodyMassLabel.append(patientBodyMassI);

    const pastDeseasesLabel = document.createElement("label");
    pastDeseasesLabel.textContent =
      "Past diseases of the cardiovascular system:";

    const patientCardiovascularDeseas = new Input({
      type: "text",
      name: "patientCardiovascularDeseases",
      isRequired: true,
      id: "patientCardiovascularDeseases",
      classes: ["patientCardiovascularDeseases", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();
    pastDeseasesLabel.append(patientCardiovascularDeseas);

    const patientAgeLabel = document.createElement("label");
    patientAgeLabel.textContent = "Patient's age:";

    const age = new Input({
      type: "number",
      name: "patientAge",
      isRequired: true,
      id: "patientAge",
      classes: ["patientAge", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();

    patientAgeLabel.append(age);

    dataInput.before(
      pressureLabel,
      bodyMassLabel,
      pastDeseasesLabel,
      patientAgeLabel
    );

    const inputs = [...document.getElementsByClassName("card-input")];
    const doctorSelect = document.getElementById("createVisitSelect");
    const select = document.getElementById("prioritySelect");
    const [
      patientName,
      purpose,
      description,
      patientPressure,
      patientBodyMassIndex,
      patientCardiovascularDeseases,
      patientAge,
      visitDate,
    ] = inputs;

    purpose.value = this.title;
    description.value = this.description;
    patientName.value = this.patientName;
    visitDate.value = this.visitDate;
    select.value = this.priority;
    patientPressure.value = this.patientPressure;
    patientBodyMassIndex.value = this.patientBodyMassIndex;
    patientCardiovascularDeseases.value = this.patientCardiovascularDeseases;
    patientAge.value = this.patientAge;
  };

  showMore = (e) => {
    e.preventDefault();

    const items = [...this.cardWrapper.getElementsByTagName("p")];
    items.forEach((el, index) => {
      if (index > 1) {
        if (!el.classList.contains("active")) {
          e.target.textContent = "Show less";
          el.classList.add("active");
        } else {
          el.classList.remove("active");
          e.target.textContent = "Show more";
        }
      }
    });
  };
}

export default CardiologistCards;
