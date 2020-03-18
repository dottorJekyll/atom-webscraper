import ValueHandler from '../handler/valueHandler';

async function build(authorConfig, el) {
  const config = authorConfig;
  let author;

  if (typeof author !== 'object') {
    author = {};
  }

  if ('name' in config) {
    author.name = ValueHandler.handle(config.name, el);
  }

  if ('email' in config) {
    author.email = ValueHandler.handle(config.email, el);
  }

  if ('link' in config) {
    author.link = ValueHandler.handle(config.link, el);
  }

  return author;
}

export default { build };
