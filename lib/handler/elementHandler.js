function handle(elementConfig, el) {
  if (elementConfig == null) {
    return el;
  }
  const { selector, removeChildren, takeFirst } = elementConfig;

  let element = el;
  if (selector) {
    element = element.find(selector);
  }

  return element;
}

export default { handle };
