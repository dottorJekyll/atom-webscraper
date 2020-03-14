import { Feed } from 'feed';

function build(feedConfig, page) {
  const config = feedConfig;
  const feed = {};

  if ('id' in config) {
    feed.id = 'id'
  }


  return new Feed(feed);
}

export default { build };
