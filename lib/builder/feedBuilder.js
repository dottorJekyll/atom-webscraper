import { Feed } from 'feed';
import ValueHandler from '../handler/valueHandler';

function build(feedConfig, page) {
  const config = feedConfig;
  const feed = {};

  if ('id' in config) {
    feed.id = ValueHandler.handle(config.id, page);
  }

  return new Feed(feed);
}

export default { build };
