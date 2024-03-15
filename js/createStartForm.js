import { getTours } from "./api.js";
import createElement from "./services.js";

function createTours(data) {
  return data
    .map((item) => [item.id, item.tour])
    .map(([id, tour]) => {
      const option = createElement("option", { value: id, textContent: tour });
      return option;
    });
}

async function createStartForm() {
  const form = createElement("form", { className: "field" });
  const label = createElement("label", {
    className: "field__label",
    textContent: "Укажите количество человек (max: 6)",
  });
  const select = createElement("select", {
    className: "field__select",
    id: "tour",
    name: "tour",
  });
  const data = await getTours();
  const tours = createTours(data);
  select.append(...tours);

  const input = createElement("input", {
    className: "field__input",
    id: "count",
    name: "count",
    type: "number",
    placeholder: "#",
    min: "1",
    max: "6",
    required: "true",
  });
  const btnSubmit = createElement("button", {
    className: "btn-confirm",
    type: "submit",
    textContent: "Подтвердить",
  });

  form.append(label, input, select, btnSubmit);

  return { form };
}

export { createStartForm };
