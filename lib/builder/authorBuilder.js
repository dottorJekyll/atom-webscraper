import $ from 'cheerio';
import ValueHandler from '../handler/valueHandler';
import LinkHandler from '../handler/linkHandler';
import PageHandler from '../handler/pageHandler';
import Node from '../node';

async function build(authorConfig, el) {
  const config = authorConfig;
  let author;

  if ('link' in config && 'link_to' in config.link) {
    const linkNode = new Node(config.getRoot(), config.link);
    const page = await LinkHandler.handle(linkNode, $(el));
    let pageConfig = config.getRoot().scraping.page[linkNode.link_to];
    pageConfig = new Node(config.getRoot(), pageConfig);
    author = await PageHandler.handle(pageConfig, page, 'author');
  }

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
