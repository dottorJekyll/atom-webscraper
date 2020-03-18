import ValueHandler from '../handler/valueHandler';

async function build(categoryConfig, el) {
  const config = categoryConfig;
  let category;

  if (typeof category !== 'object') {
    category = {};
  }

  if ('name' in config) {
    category.name = ValueHandler.handle(config.name, el);
  }

  if ('domain' in config) {
    category.domain = ValueHandler.handle(config.domain, el);
  }

  if ('scheme' in config) {
    category.scheme = ValueHandler.handle(config.scheme, el);
  }

  if ('term' in config) {
    category.term = ValueHandler.handle(config.term, el);
  }

  return category;
}

export default { build };
