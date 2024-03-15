import { createPersonData } from "./createPersonData.js";
import { createStartForm } from "./createStartForm.js";

const app = document.querySelector(".app");

function createTitle() {
  const h1 = document.createElement("h1");
  h1.className = "title";
  return h1;
}
function updateTitle(text) {
  document.querySelector(".title").textContent = text;
}

function createMain() {
  const main = document.createElement("main");
  main.className = "person-data";
  return main;
}

async function initApp() {
  app.append(createTitle());
  updateTitle("Выберите тур");
  const main = createMain();
  app.append(main);
  let { form } = await createStartForm();
  main.append(form);
  form.addEventListener("submit", () => {
    event.preventDefault();
    const count = form.count.value;
    const tour = form.tour.value;
    form.remove();
    createPersonData(count, tour, main);
  });
}

initApp();
export { updateTitle };
