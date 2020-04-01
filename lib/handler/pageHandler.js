import Builder from '../builder';
import ListHandler from './listHandler';
import Node from '../node';
import ElementHandler from './elementHandler';

function supports(pageConfig, page) {
  let isSupported = false;

  if ('identifier' in pageConfig) {
    const { identifier } = pageConfig;
    const el = ElementHandler.handle(identifier, page);

    let exist = true;
    if ('exist' in identifier) {
      exist = identifier.exist;
    }
    isSupported = exist ? el.length > 0 : el.length === 0;
  }

  return isSupported;
}

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
  supports,
};
