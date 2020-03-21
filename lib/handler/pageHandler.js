import Builder from '../builder/index';
import ListHandler from './listHandler';
import Node from '../node';

function handle(pageConfig, page, tagType) {
  const { item } = pageConfig;

  if (!(tagType in pageConfig)) {
    return false;
  }

  const elements = pageConfig[tagType];

  const elementsNode = new Node(pageConfig.getRoot(), elements);
  const tag = Builder.build(elementsNode, page, tagType);

  if (item) {
    tag.items = ListHandler.handle(item, page, 'item');
  }

  return tag;
}

export default {
  handle,
  supports,
};
