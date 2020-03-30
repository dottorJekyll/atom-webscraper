function handle(elementConfig, el) {
  if (elementConfig == null) {
    return el;
  }
  const { selector, removeChildren, takeFirst } = elementConfig;

  let element = el;
  if (selector) {
    element = element.find(selector);
  }

  if (takeFirst) {
    element = element.first();
  }

  if (removeChildren) {
    element = element.clone();
    element.children(removeChildren)
      .remove();
  }

  return element;
}

export default { handle };
