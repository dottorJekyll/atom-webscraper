import ValueHandler from '../handler/valueHandler';
import DateHandler from '../handler/dateHandler';

async function build(itemConfig, el) {
  const config = itemConfig;
  let item;

  if (typeof item !== 'object') {
    item = {};
  }

  if ('title' in config) {
    item.title = ValueHandler.handle(config.title, el);
  }

  if ('id' in config) {
    item.id = ValueHandler.handle(config.id, el);
  }

  if ('link' in config) {
    item.link = ValueHandler.handle(config.link, el);
  }

  if ('date' in config) {
    item.date = DateHandler.handle(config.date, el);
  }

  if ('description' in config) {
    item.description = ValueHandler.handle(config.description, el);
  }

  if ('content' in config) {
    item.content = ValueHandler.handle(config.content, el);
  }

  // TODO: category

  if ('image' in config) {
    item.image = ValueHandler.handle(config.image, el);
  }

  // TODO: author

  // TODO: contributor

  if ('published' in config) {
    item.published = DateHandler.handle(config.published, el);
  }

  if ('copyright' in config) {
    item.copyright = ValueHandler.handle(config.copyright, el);
  }

  return item;
}

export default { build };
