import 'core-js/stable';
import 'regenerator-runtime/runtime';
import urlParse from 'url-parse';

import cli from './cli';
import utils from './utils';

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


})();
