import ValueHandler from './valueHandler';
import DateHandler from './dateHandler';
import LinkHandler from './linkHandler';
import ListHandler from './listHandler';

function handleProperty(extensionConfig, el, tagType) {
  let val;

  switch (extensionConfig.type) {
    case 'date':
      val = DateHandler.handle(extensionConfig, el);
      break;
    case 'link':
      val = LinkHandler.handle(extensionConfig, el);
      break;
    case 'list':
      val = ListHandler.handle(extensionConfig, el, tagType);
      break;
    case 'text':
    default:
      val = ValueHandler.handle(extensionConfig, el);
      break;
  }

  return val;
}

function handle(extensionConfig, el) {
  if ('attributes' in extensionConfig) {
    const extensionAttributes = extensionConfig.attributes;
    const attributes = {};
    Object.keys(extensionAttributes)
      .forEach((propertyName) => {
        const propertyConfig = extensionAttributes[propertyName];

        const objects = handle(propertyConfig, el);
        attributes[propertyName] = {
          name: propertyName,
          objects,
        };
      });

    return attributes;
  }

  const { tagType } = extensionConfig;

  return handleProperty(extensionConfig, el, tagType);
}

const extensionHandler = { handle };

if (process.env.NODE_ENV === 'test') {
  extensionHandler.handleProperty = handleProperty;
}

export default extensionHandler;
