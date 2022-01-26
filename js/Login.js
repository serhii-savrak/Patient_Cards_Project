import Input from "./Input.js";
import Modal from "./Modal.js";
import Requests from "./Request.js";
import constans from "./constans.js";
import VisitDentist from "./VisitDentist.js";
import Cards from "./Cards.js";
import DentistCards from "./DentistCards.js";
import TherapistCards from "./TherapistCards.js";
import CardiologistCards from "./CardiologistCards.js";

class Login extends Modal {
  constructor(id, classes, text) {
    super(id, classes, text);
    this.modalInside = this.renderAutorisationForm();
  }

  renderAutorisationForm() {
    const form = document.createElement("form");
    form.id = "login-form";

    const inputLogin = new Input({
      type: "email",
      name: "login",
      isRequired: true,
      id: "login",
      classes: [],
      placeholder: "Ваш логин",
      errorText: "Enter login",
    }).render();

    const inputPassword = new Input({
      type: "password",
      name: "password",
      isRequired: true,
      id: "password",
      classes: [],
      placeholder: "Ваш пароль",
      errorText: "Enter password",
    }).render();

    const submit = new Input({
      type: "submit",
      name: "",
      isRequired: true,
      id: "submit",
      classes: [],
      placeholder: "Авторизация",
      errorText: "",
    }).render();
    submit.addEventListener("click", (e) => {
      e.preventDefault();
      const email = inputLogin.value;
      const password = inputPassword.value;
      const data = { email, password };
      const request = new Requests(constans.URL);
      request
        .post(JSON.stringify(data), "/login")
        .then((response) => {
          if (response.status >= 200 && response.status <= 399) {
            return response.text();
          }
        })
        .then((token) => {
          if (token) {
            localStorage.setItem("token", token);
            constans.loginButton.classList.add("btn-none");
            this.modal.remove();
            constans.createVisitButton.classList.remove("btn-none");
            document.getElementById("filter").style.display = "flex";
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
          } else {
            alert("Ошибка! Неверный email или пароль.");
          }
        });
    });

    form.append(inputLogin, inputPassword, submit);

    return form;
  }
}

export default Login;
