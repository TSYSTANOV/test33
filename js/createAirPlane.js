import { updateTitle } from "./index.js";
import { getTours } from "./api.js";
import createElement from "./services.js";
import { getStorage, setStorage } from "./localStorage.js";

function createCockPit(count) {
  const div = createElement("div", { className: "cockpit" });
  div.innerHTML = ``;

  const h1 = createElement("h1", {
    className: "cockpit-title",
    textContent: `Выберите ${count} место`,
  });
  const btnSubmit = createElement("button", {
    className: "cockpit-confirm",
    type: "submit",
    textContent: "Подтвердить",
  });
  div.append(h1, btnSubmit);
  return div;
}

function createPlane(scheme, id) {
  let numberSeat = 1;
  const dataBoodingSeat = getStorage(id).map((item) => item.seat);

  return scheme.map((item) => {
    if (item === "exit") {
      return createElement("div", { className: "exit fuselage" });
    } else {
      const elements = [];
      getTours;
      for (let i = 0; i < +item; i++) {
        const ol = createElement("ol", { className: "fuselage" });
        const li = createElement("li");
        const olInner = createElement("ol", { className: "seats" });
        const letters = ["A", "B", "C", "D", "E", "F"];
        const seatPlaces = letters.map((elem) => {
          const liSeat = createElement("li", { className: "seat" });
          if (dataBoodingSeat.includes(`${numberSeat}${elem}`)) {
            liSeat.innerHTML = `<label><input name="seat" type="checkbox" value="${numberSeat}${elem}" disabled></label>`;
          } else {
            liSeat.innerHTML = `<label><input name="seat" type="checkbox" value="${numberSeat}${elem}"></label>`;
          }
          return liSeat;
        });
        olInner.append(...seatPlaces);
        li.append(olInner);
        ol.append(li);
        elements.push(ol);
        numberSeat++;
      }
      return elements;
    }
  });
}

async function createAirPlane(passengersInfo, parentElem) {
  const data = await getTours();
  const dataBoodingSeat = getStorage(passengersInfo[0].tourID);
  const bookingSeatAlready = dataBoodingSeat.map((el) => el.seat);
  const schemePlane = data.find(
    (item) => +item.id === +passengersInfo[0].tourID
  ).scheme;

  const form = createElement("form", { className: "choises-seat" });
  const fieldset = createElement("fieldset", {
    className: "plane",
    name: "plane",
  });
  const cockpit = createCockPit(passengersInfo.length);
  const airPlane = createPlane(schemePlane, passengersInfo[0].tourID);

  fieldset.append(cockpit, ...airPlane.flat());
  form.append(fieldset);
  parentElem.append(form);
  let seats = [];
  form.addEventListener("change", () => {
    seats = checkInputChecked(form);
    if (seats.length === passengersInfo.length) {
      form.seat.forEach((item) => {
        if (!item.checked) {
          item.disabled = true;
        }
      });
    } else {
      form.seat.forEach((item) => {
        if (!item.checked && !bookingSeatAlready.includes(item.value)) {
          item.disabled = false;
        }
      });
    }
  });
  form.addEventListener("submit", () => {
    event.preventDefault();
    if (seats.length < passengersInfo.length) {
      return;
    }
    for (let i = 0; i < passengersInfo.length; i++) {
      passengersInfo[i].seat = seats[i];
    }

    form.remove();
    updateTitle(`Спасибо, Ваши места: ${seats.join(", ")}`);
    setStorage(passengersInfo[0].tourID, [
      ...dataBoodingSeat,
      ...passengersInfo,
    ]);
  });
}

function checkInputChecked(element) {
  const data = [...new FormData(element)];
  const elems = data.map(([key, value]) => {
    return value;
  });
  return elems;
}
export { createAirPlane };
