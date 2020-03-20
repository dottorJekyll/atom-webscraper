import ValueHandler from '../handler/valueHandler';
import DateHandler from '../handler/dateHandler';
import PageHandler from '../handler/pageHandler';
import ListHandler from '../handler/listHandler';
import utils from '../utils';

async function build(itemConfig, el) {
  const config = itemConfig;
  let item;

  if ('link' in config && 'link_to' in config.link) {
    const uri = ValueHandler.handle(config.link, el);
    const page = utils.parsePageByUrl(uri);
    item = PageHandler.handle(pageConfig, page, 'item');
  }

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

  if ('category' in config) {
    item.category = ListHandler.handle(config.category, el, 'category');
  }

  if ('image' in config) {
    item.image = ValueHandler.handle(config.image, el);
  }

  if ('author' in config) {
    item.author = ListHandler.handle(config.author, el);
  }

  if ('contributor' in config) {
    item.contributor = ListHandler.handle(config.contributor, el, 'author');
  }

  if ('published' in config) {
    item.published = DateHandler.handle(config.published, el);
  }

  if ('copyright' in config) {
    item.copyright = ValueHandler.handle(config.copyright, el);
  }

  return item;
}

export default { build };
