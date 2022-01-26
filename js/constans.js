const loginButton = document.getElementById("login");
const createVisitButton = document.getElementById("createVisitButton");
const ROOT = document.getElementById("root");
const URL = "https://ajax.test-danit.com/api/v2/cards";
const token = localStorage.getItem("token");
const fieldCardsContainer = document.getElementsByClassName("field-cards")[0];
const modalContent = document.getElementsByClassName("modal-content");

export default {
  loginButton,
  ROOT,
  createVisitButton,
  URL,
  token,
  fieldCardsContainer,
  modalContent,
};