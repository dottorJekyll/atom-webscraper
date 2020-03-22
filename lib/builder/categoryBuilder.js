import $ from 'cheerio';
import ValueHandler from '../handler/valueHandler';
import LinkHandler from '../handler/linkHandler';
import PageHandler from '../handler/pageHandler';
import Node from '../node';

async function build(categoryConfig, el) {
  const config = categoryConfig;
  let category;

  if ('scheme' in config && 'scheme' in config.scheme) {
    const schemeNode = new Node(config.getRoot(), config.scheme);
    const page = await LinkHandler.handle(schemeNode, $(el));
    let pageConfig = config.getRoot().scraping.page[schemeNode.link_to];
    pageConfig = new Node(config.getRoot(), pageConfig);
    category = await PageHandler.handle(pageConfig, page, 'category');
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
