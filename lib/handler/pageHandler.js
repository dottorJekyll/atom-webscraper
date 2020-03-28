import Builder from '../builder/index';
import ListHandler from './listHandler';
import Node from '../node';

async function handle(pageConfig, page, tagType) {
  const { item } = pageConfig;

  if (!(tagType in pageConfig)) {
    return false;
  }

  const elements = pageConfig[tagType];

  let promises = [];
  if (tagType === 'feed' && item && item.type === 'list') {
    const listConfig = new Node(pageConfig.getRoot(), item);

    promises = ListHandler.handle(listConfig, page, 'item');
  }

  const elementsNode = new Node(pageConfig.getRoot(), elements);
  const tag = await Builder.build(elementsNode, page, tagType);
  if (tagType === 'feed') {
    tag.items = await Promise.all(promises);
  }

  return tag;
}

export default {
  handle,
};
