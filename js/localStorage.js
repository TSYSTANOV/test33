function getStorage(id) {
  return JSON.parse(localStorage.getItem(`tour${id}`))
    ? JSON.parse(localStorage.getItem(`tour${id}`))
    : [];
}

function setStorage(id, passengersInfo) {
  localStorage.setItem(`tour${id}`, JSON.stringify(passengersInfo));
}

export { getStorage, setStorage };
