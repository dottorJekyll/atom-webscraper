import $ from 'cheerio';
import ElementHandler from './elementHandler';
import ItemBuilder from '../builder/itemBuilder';

function handle(config, page) {
  const { selector } = config;

  const elements = ElementHandler.handle({ selector }, page);

  if (elements.length === 0) {
    return [];
  }
  return elements.toArray()
    .map((element) => ItemBuilder.build(config, $(element)));
}

export default { handle };
