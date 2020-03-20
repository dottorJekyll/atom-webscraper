import FeedBuilder from './feedBuilder';
import ItemBuilder from './itemBuilder';
import CategoryBuilder from './categoryBuilder';
import AuthorBuilder from './authorBuilder';

function build(config, el, tagType) {
  let tag;

  switch (tagType) {
    case 'feed':
      tag = FeedBuilder.build(config, el);
      break;
    case 'category':
      tag = CategoryBuilder.build(config, el);
      break;
    case 'author':
      tag = AuthorBuilder.build(config, el);
      break;
    case 'item':
      tag = ItemBuilder.build(config, el);
      break;
    default:
      console.log(`\`Unknown ${tagType} type`);
  }

  return tag;
}

export default { build };
