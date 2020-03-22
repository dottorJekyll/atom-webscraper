import urlParse from 'url-parse';
import ValueHandler from './valueHandler';
import utils from '../utils';

function handle(elementConfig, el) {
  const uri = ValueHandler.handle(elementConfig, el);

  const { hostname } = elementConfig.getRoot().scraping;
  const parsedUrl = urlParse(uri);

  return utils.parsePageByUrl(hostname + parsedUrl.pathname);
}

export default { handle };
