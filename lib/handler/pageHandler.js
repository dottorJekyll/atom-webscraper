import FeedBuilder from '../builder/feedBuilder';

function handle(pageConfig, page, tagType) {
  const { item } = pageConfig;

  if (!(tagType in pageConfig)) {
    return false;
  }

  const tag = FeedBuilder.build(elementsNode, page);

  return tag;
}

export default {
  handle,
  supports,
};
