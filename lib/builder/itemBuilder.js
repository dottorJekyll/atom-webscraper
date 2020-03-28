import $ from 'cheerio';
import ValueHandler from '../handler/valueHandler';
import DateHandler from '../handler/dateHandler';
import PageHandler from '../handler/pageHandler';
import LinkHandler from '../handler/linkHandler';
import ListHandler from '../handler/listHandler';
import ExtensionHandler from '../handler/extensionHandler';
import Node from '../node';

async function build(itemConfig, el) {
  const config = itemConfig;
  let item;

  if ('link' in config && 'link_to' in config.link) {
    const linkNode = new Node(config.getRoot(), config.link);
    const page = await LinkHandler.handle(linkNode, $(el));
    let pageConfig = config.getRoot().scraping.page[linkNode.link_to];
    pageConfig = new Node(config.getRoot(), pageConfig);
    item = await PageHandler.handle(pageConfig, page, 'item');
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
    const categoryNode = new Node(config.getRoot(), config.category);
    const promises = ListHandler.handle(categoryNode, el, 'category');
    item.category = await Promise.all(promises);
  }

  if ('image' in config) {
    item.image = ValueHandler.handle(config.image, el);
  }

  if ('author' in config) {
    const authorNode = new Node(config.getRoot(), config.author);
    const promises = ListHandler.handle(authorNode, el, 'author');
    item.author = await Promise.all(promises);
  }

  if ('contributor' in config) {
    const contributorNode = new Node(config.getRoot(), config.contributor);
    const promises = ListHandler.handle(contributorNode, el, 'author');
    item.contributor = await Promise.all(promises);
  }

  if ('published' in config) {
    item.published = DateHandler.handle(config.published, el);
  }

  if ('copyright' in config) {
    item.copyright = ValueHandler.handle(config.copyright, el);
  }

  if ('extensions' in config) {
    const { extensions } = config;

    item.extensions = [];
    Object.keys(extensions)
      .forEach((extensionName) => {
        const extensionConfig = extensions[extensionName];

        const extensionsNode = new Node(config.getRoot(), extensionConfig);
        const extension = ExtensionHandler.handle(extensionsNode, el);
        if (extension !== undefined) {
          item.extensions.push({
            name: extensionName,
            objects: extension,
          });
        }
      });
  }

  return item;
}

export default { build };
