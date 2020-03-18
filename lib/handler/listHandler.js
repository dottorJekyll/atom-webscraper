import $ from 'cheerio';
import ElementHandler from './elementHandler';
import Builder from '../builder';

function handle(config, page, tagType) {
  const { selector } = config;

  const elements = ElementHandler.handle({ selector }, page);

  if (elements.length === 0) {
    return [];
  }
  return elements.toArray()
    .map((element) => Builder.build(config, $(element), tagType));
}

export default { handle };
