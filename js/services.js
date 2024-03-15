function createElement(elem, attr) {
  const element = document.createElement(elem);
  Object.assign(element, attr);
  return element;
}

export default createElement;
