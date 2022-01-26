import constans from "./constans.js";
import Requests from "./Request.js";
import Visit from "./Visit.js";
import Modal from "./Modal.js";

class Cards {
  constructor({ description, title, patientName, id, priority }, url) {
    this.description = description;
    this.title = title;
    this.patientName = patientName;
    this.id = id;
    this.priority = priority;
    this.url = url;
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
      "bg-primary"
    );

    const purposeVisit = document.createElement("p");
    purposeVisit.textContent = `The problem is: ${this.title}`;
    purposeVisit.classList.add("card-info");

    const shortDescription = document.createElement("p");
    shortDescription.textContent = `Description: ${this.description}`;
    shortDescription.classList.add("card-info");

    const fullName = document.createElement("p");
    fullName.textContent = `Patient: ${this.patientName}`;
    fullName.classList.add("card-info");

    const priority = document.createElement("p");
    priority.textContent = `Priority: ${this.priority}`;
    priority.classList.add("font-weight-bold");

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
      priority,
      fullName,
      purposeVisit,
      shortDescription,
      showmoreBtn,
      editBtn,
      closetBtn
    );
    this.url.append(this.cardWrapper);
  }

  closeCardHandler = (e) => {
    const request = new Requests(constans.URL);

    request.delete(this.id, localStorage.token).then((resp) => {
      if (resp.status === 200) {
        e.target.closest(".card-wrapper").remove();

        const getRequest = new Requests(constans.URL);
        getRequest
          .get("", localStorage.token)
          .then((resp) => resp.json())
          .then((data) => {
            if (data.length <= 0) {
              document.querySelector(".visit__field-text").style.display =
                "block";
              const fieldForCards = document.getElementsByClassName(
                "field-cards-modified"
              )[0];
              fieldForCards.className = "field-cards";
            }
          });
      }
    });
  };

  editHandler = (e) => {
    const modalEditWindow = new Modal(
      "edit-modal",
      ["modal", "modal-content"],
      "test"
    );

    const newModal = modalEditWindow.render();
    modalEditWindow.openModal();
    constans.ROOT.append(newModal);
    const modal = document.getElementById("modalTitle");

    const editForm = new Visit(modal, "");

    editForm.submitHandler = (e) => {
      e.preventDefault();

      const inputs = [...document.getElementsByClassName("card-input")];
      const [purpose, description, patientName] = inputs;

      const data = {
        title: purpose.value,
        description: description.value,
        patientName: patientName.value,
      };

      const request = new Requests(constans.URL);
      request
        .put("", JSON.stringify(data), this.id, localStorage.token)
        .then((resp) => resp.json())
        .then((data) => {
          const card = new Cards(data, constans.fieldCardsContainer);
          card.render();
          this.cardWrapper.remove();
          document.getElementById("edit-modal").remove();
        });
    };

    editForm.render();

    const inputs = [...document.getElementsByClassName("card-input")];
    const [purpose, description, patientName] = inputs;

    purpose.value = this.title;
    description.value = this.description;
    patientName.value = this.patientName;
  };

  showMore = (e) => {
    e.preventDefault();

    const items = [...this.cardWrapper.getElementsByTagName("p")];
  };
}

export default Cards;
