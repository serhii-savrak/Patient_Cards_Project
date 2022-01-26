import constans from "./constans.js";
import Requests from "./Request.js";
import Visit from "./Visit.js";
import Modal from "./Modal.js";
import Cards from "./Cards.js";
import Input from "./Input.js";

// Why can't access VisitTherapist!!!????

class TherapistCards extends Cards {
  constructor(
    { description, title, patientName, id, priority, age, doctor, visitDate },
    url
  ) {
    super({ description, title, patientName, id, priority }, url);
    this.doctor = doctor;
    this.visitDate = visitDate;
    this.url = url;
    this.age = age;
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
      "bg-primary",
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

    const patientAge = document.createElement("p");
    patientAge.textContent = `Patient age: ${this.age}`;
    patientAge.classList.add("card-info", "font-weight-bold");

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
      const [patientName, purpose, description, age, visitDate] = inputs;

      const data = {
        doctor: this.doctor,
        title: purpose.value,
        description: description.value,
        patientName: patientName.value,
        visitDate: visitDate.value,
        age: age.value,
        priority: select.value,
      };

      const request = new Requests(constans.URL);
      request
        .put("", JSON.stringify(data), this.id, constans.token)
        .then((resp) => resp.json())
        .then((data) => {
          const card = new TherapistCards(data, constans.fieldCardsContainer);
          card.render();
          this.cardWrapper.remove();
          document.getElementById("edit-modal").remove();
        });
    };

    editForm.render();

    const dataInput = document.getElementById("visitDate").closest("label");

    const patientAgeLabel = document.createElement("label");
    patientAgeLabel.textContent = "Patient's age:";

    const patientAge = new Input({
      type: "number",
      name: "age",
      isRequired: true,
      id: "age",
      classes: ["age", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();

    patientAgeLabel.append(patientAge);

    dataInput.before(patientAgeLabel);

    const inputs = [...document.getElementsByClassName("card-input")];
    const doctorSelect = document.getElementById("createVisitSelect");
    const select = document.getElementById("prioritySelect");
    const [patientName, purpose, description, age, visitDate] = inputs;

    purpose.value = this.title;
    description.value = this.description;
    patientName.value = this.patientName;
    visitDate.value = this.visitDate;
    age.value = this.age;
    select.value = this.priority;
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

export default TherapistCards;
