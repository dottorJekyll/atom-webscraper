import ValueHandler from '../handler/valueHandler';
import PageHandler from '../handler/pageHandler';
import Node from '../node';
import utils from '../utils';

async function build(authorConfig, el) {
  const config = authorConfig;
  let author;

  if ('link' in config && 'link_to' in config.link) {
    const linkNode = new Node(config.getRoot(), config.link);
    const uri = ValueHandler.handle(config.link, el);
    const page = utils.parsePageByUrl(linkNode.getRoot().scaping.hostname + uri);
    const pageConfig = config.getRoot().scraping.page[linkNode.link_to];
    const pageNode = new Node(config.getRoot(), pageConfig);
    author = PageHandler.handle(pageNode, page, 'author');
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
