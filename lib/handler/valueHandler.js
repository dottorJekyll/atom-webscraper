import ElementHandler from './elementHandler';

function handle(elConfig, el) {
  let elementConfig = elConfig;

  const element = ElementHandler.handle(elementConfig, el);
  if (element.length === 0) {
    return undefined;
  }

  return element.text();
}

export default { handle };
