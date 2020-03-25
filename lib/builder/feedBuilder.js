import { Feed } from 'feed';
import ValueHandler from '../handler/valueHandler';
import AuthorBuilder from './authorBuilder';

async function build(feedConfig, page) {
  const config = feedConfig;
  const feed = {};

  if ('id' in config) {
    feed.id = ValueHandler.handle(config.id, page);
  }

  if ('title' in config) {
    feed.title = ValueHandler.handle(config.title, page);
  }

  if ('generator' in config) {
    feed.generator = ValueHandler.handle(config.generator, page);
  }

  if ('language' in config) {
    feed.language = ValueHandler.handle(config.language, page);
  }

  if ('feedLinks' in config) {
    feed.feedLinks = ValueHandler.handle(config.feedLinks, page);
  }

  if ('hub' in config) {
    feed.hub = ValueHandler.handle(config.hub, page);
  }

  if ('docs' in config) {
    feed.docs = ValueHandler.handle(config.docs, page);
  }

  if ('author' in config) {
    feed.author = await AuthorBuilder.build(config.author, page);
  }

  const { hostname } = config.getRoot().scraping;
  feed.link = `https://${hostname}`;

  if ('description' in config) {
    feed.description = ValueHandler.handle(config.description, page);
  }

  if ('image' in config) {
    feed.image = ValueHandler.handle(config.image, page);
  }

  if (!('logo' in config)) {
    config.logo = {
      selector: 'head link[rel="shortcut icon"]',
      attr: 'href',
      takeFirst: true,
    };
  }
  //  name of 'logo' in feed library is favicon
  feed.favicon = ValueHandler.handle(config.logo, page);

  if ('copyright' in config) {
    feed.copyright = ValueHandler.handle(config.copyright, page);
  }

  return new Feed(feed);
}

export default { build };
