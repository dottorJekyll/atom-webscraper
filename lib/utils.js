import yaml from 'js-yaml';
import fs from 'fs';
import cheerio from 'cheerio';
import got from 'got';

export default {
  readYaml(yamlPath) {
    let doc;
    try {
      doc = yaml.safeLoad(fs.readFileSync(yamlPath, 'utf8'));
    } catch (e) {
      error('Cannot open config file.');
      process.exit(0);
    }

    return doc;
  },
  async parsePageByUrl(url) {
    try {
      const response = await got(`https://${url}`);
      const { body } = response;
      return cheerio.load(body).root();
    } catch (gotError) {
      process.exit(0);
    }

    return undefined;
  },
};
