import 'core-js/stable';
import 'regenerator-runtime/runtime';
import urlParse from 'url-parse';
import jp from 'jsonpath';

import cli from './cli';
import utils from './utils';
import { warn } from './consoleColors';
import PageHandler from './handler/pageHandler';
import Node from './node';

const { url, config: configPath, output: outputPath } = cli;

const parsedUrl = urlParse(url);

const websiteConfig = utils.readYaml(configPath);

if (websiteConfig === undefined) {
  warn('Yaml is invalid');
  process.exit(0);
}

if (parsedUrl.hostname !== websiteConfig.scraping.hostname) {
  warn('config is not this website');
  process.exit(0);
}

(async () => {
  const page = await utils.parsePageByUrl(
    parsedUrl.hostname + parsedUrl.pathname,
  );

  const pages = jp.query(websiteConfig, '$.scraping.page[?(@.feed)]');

  const pagesConfig = pages.filter((pageConfig) => PageHandler.supports(pageConfig, page));

  if (pagesConfig.length === 0) {
    warn('Page not handled');
    process.exit(0);
  }

  const pageConfig = pagesConfig.reduce((prevConfig, currentConfig) => {
    if (
      typeof prevConfig === 'object'
      && typeof currentConfig === 'object'
    ) {
      warn('Page Handler is not unique');
      process.exit(0);
    } else {
      return currentConfig;
    }

    return undefined;
  });

  const pageNode = new Node(websiteConfig, pageConfig);
  const atom = await PageHandler.handle(pageNode, page, 'feed');
  atom.options.link = url;

  utils.save(atom, outputPath);
})();
