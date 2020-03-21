import ValueHandler from '../handler/valueHandler';
import PageHandler from '../handler/pageHandler';
import Node from '../node';
import utils from '../utils';

async function build(categoryConfig, el) {
  const config = categoryConfig;
  let category;

  if ('scheme' in config && 'scheme' in config.link) {
    const linkNode = new Node(config.getRoot(), config.link);
    const uri = ValueHandler.handle(config.link, el);
    const page = utils.parsePageByUrl(linkNode.getRoot().scaping.hostname + uri);
    const pageConfig = config.getRoot().scraping.page[linkNode.link_to];
    const pageNode = new Node(config.getRoot(), pageConfig);
    category = PageHandler.handle(pageNode, page, 'category');
  }

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
