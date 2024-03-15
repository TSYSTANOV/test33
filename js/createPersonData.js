import { createAirPlane } from "./createAirPlane.js";
import { updateTitle } from "./index.js";
import createElement from "./services.js";

export const createPersonData = (count, tour, parentElem) => {
  updateTitle("Выберите всех пасажиров");

  const passengersInfo = [];
  const passengers = [];
  for (let i = 1; i <= count; i++) {
    const form = createElement("form", { className: "person" });
    const h2 = createElement("h2", {
      className: "person__title",
      textContent: `Пассажир #${i}`,
    });
    const divFirst = createElement("div", { className: "field" });
    divFirst.innerHTML = `
    <label class="field__label">ФИО</label>
    <input class="field__input" id="name${i}" name="name" type="text" placeholder="Введите ваше ФИО" required="">
    `;
    const divSecond = createElement("div", { className: "field" });
    divSecond.innerHTML = `
    <label class="field__label">Номер билета (10 цифр)</label>
          <input class="field__input" id="ticket${i}" name="ticket" type="text" placeholder="Номер билета" required="" minlength="10" maxlength="10">`;
    const btnSubmit = createElement("button", {
      className: "btn-confirm",
      type: "submit",
      textContent: "Подтвердить",
    });
    form.append(h2, divFirst, divSecond, btnSubmit);
    passengers.push(form);
    form.addEventListener("submit", () => {
      event.preventDefault();
      const namePas = form.name.value;
      const ticket = form.ticket.value;
      passengersInfo.push({
        name: namePas,
        ticket,
        tourID: tour,
      });
      form.name.disabled = true;
      form.ticket.disabled = true;
      btnSubmit.disabled = true;
      if (passengersInfo.length === +count) {
        updateTitle("Выберите места");
        createAirPlane(passengersInfo, parentElem);
        parentElem.innerHTML = "";
        return;
      }
    });
  }
  parentElem.append(...passengers);
};
