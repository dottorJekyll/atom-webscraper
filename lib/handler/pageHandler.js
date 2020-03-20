import Builder from '../builder/index';
import ListHandler from './listHandler';

function handle(pageConfig, page, tagType) {
  const { item } = pageConfig;

  if (!(tagType in pageConfig)) {
    return false;
  }

  const elements = pageConfig[tagType];

  const tag = Builder.build(elements, page, tagType);

  if (item) {
    tag.items = ListHandler.handle(item, page, 'item');
  }

  return tag;
}

export default {
  handle,
  supports,
};
