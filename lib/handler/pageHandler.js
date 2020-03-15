import FeedBuilder from '../builder/feedBuilder';
import ListHandler from './listHandler';

function handle(pageConfig, page, tagType) {
  const { item } = pageConfig;

  if (!(tagType in pageConfig)) {
    return false;
  }

  const elements = pageConfig[tagType];

  const tag = FeedBuilder.build(elements, page);

  if (item) {
    tag.items = ListHandler.handle(item, page);
  }

  return tag;
}

export default {
  handle,
  supports,
};
