function handle(elementConfig, el) {
  if (elementConfig == null) {
    return el;
  }
  const { selector, takeFirst } = elementConfig;

  let element = el;
  if (selector) {
    element = element.find(selector);
  }

  if (takeFirst) {
    element = element.first();
  }

  return element;
}

export default { handle };
