import ItemBuilder from './itemBuilder';
import AuthorBuilder from './authorBuilder';

function build(config, el, tagType) {
  let tag;

  switch (tagType) {
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
