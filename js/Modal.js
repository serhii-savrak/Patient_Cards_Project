import Input from "./Input.js";

class Modal {
  constructor(id, classes, text) {
    this.id = id;
    this.classes = classes;
    this.text = text;
    this.modalInside = this._defaultContent();
  }
  _defaultContent() {
    const modalText = document.createElement("p");
    modalText.textContent = this.text;
    modalText.id = "modalTitle";
    return modalText;
  }
  render() {
    this.modal = document.createElement("div");
    this.modal.id = this.id;
    this.modal.classList.add(...this.classes);

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const modalSpan = document.createElement("span");
    modalSpan.classList.add("close");
    modalSpan.innerHTML = "&times;";
    modalSpan.addEventListener("click", this.closeModal);

    modalContent.append(modalSpan);
    modalContent.append(this.modalInside);
    this.modal.append(modalContent);

    return this.modal;
  }

  openModal = () => {
    this.modal.classList.add("active");
  };

  closeModal = () => {
    this.modal.remove();
  };
}

export default Modal;
