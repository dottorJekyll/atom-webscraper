import ElementHandler from './elementHandler';

function handle(elConfig, el) {
  let elementConfig = elConfig;

  if (elementConfig === null) {
    elementConfig = {};
  }

  if ('value' in elementConfig) {
    return elementConfig.value;
  }

  const element = ElementHandler.handle(elementConfig, el);
  if (element.length === 0) {
    return undefined;
  }

  let val;

  const { attr } = elementConfig;
  if (!('attr' in elementConfig) || attr === 'text') {
    val = element.text();
    val = val.replace(/(\r\n\t|\n|\r\t)/gm, ' ')
      .trim();
  } else if (attr === 'html') {
    val = element.html();
  } else {
    val = element.attr(elementConfig.attr);
  }
  return val;
}

export default { handle };
