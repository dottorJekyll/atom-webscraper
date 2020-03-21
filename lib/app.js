import 'core-js/stable';
import 'regenerator-runtime/runtime';
import urlParse from 'url-parse';

import cli from './cli';
import utils from './utils';
import PageHandler from './handler/pageHandler';
import Node from './node';

const { url, config: configPath, output: outputPath } = cli;

const parsedUrl = urlParse(url);

const websiteConfig = utils.readYaml(configPath);

if (websiteConfig === undefined) {
  process.exit(0);
}

if (parsedUrl.hostname !== websiteConfig.scraping.hostname) {
  process.exit(0);
}

(async () => {
  const page = await utils.parsePageByUrl(
    parsedUrl.hostname + parsedUrl.pathname,
  );

  const pagesConfig = websiteConfig.pages;
  const pageConfig = pagesConfig['article_list'];
  const pageNode = new Node(websiteConfig, pageConfig);

  const atom = await PageHandler.handle(pageNode, page, 'feed');
})();
