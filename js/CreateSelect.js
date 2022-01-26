import Input from "./Input.js";
import Modal from "./Modal.js";
import VisitDentist from "./VisitDentist.js";
import constans from "./constans.js";
import Select from "./Select.js";
import Login from "./Login.js";
import VisitCardiologist from "./VisitCardiologist.js";
import VisitTherapist from "./VisitTherapist.js";

class CreateSelect extends Modal {
  constructor(id, classes, text) {
    super(id, classes, text);
    this.modalInside = this.createSelect();
  }

  createSelect() {
    const wrapper = document.createElement("div");
    const createVisitSelect = new Select();
    const select = createVisitSelect.create();
    createVisitSelect.addOption("Choose your doctor", "Choose your doctor");
    createVisitSelect.addOption("Therapist", "Therapist");
    createVisitSelect.addOption("Dentist", "Dentist");
    createVisitSelect.addOption("Cardiologist", "Cardiologist");
    createVisitSelect.baseAttr("createVisitSelect");
    wrapper.classList.add("form__modal-check-doctor");
    wrapper.classList.add("wrapper__modal-check-doctor");

    select.addEventListener("change", (e) => {
      e.preventDefault();
      if (document.getElementById("visit-form")) {
        document.getElementById("visit-form").remove();
      }
      this.chengeDoctor(select);
    });
    wrapper.append(select);

    return wrapper;
  }
  chengeDoctor(select) {
    if (select.value === "Cardiologist") {
      const visitdentist = new VisitCardiologist(constans.modalContent[0], "");
      visitdentist.render();
    } else if (select.value === "Therapist") {
      const visitdentist = new VisitTherapist(constans.modalContent[0], "");
      visitdentist.render();
    } else if (select.value === "Dentist") {
      const visitdentist = new VisitDentist(constans.modalContent[0], "");
      visitdentist.render();
    }
  }
}
export default CreateSelect;
