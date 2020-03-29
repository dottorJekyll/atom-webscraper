import yaml from 'js-yaml';
import fs from 'fs';
import cheerio from 'cheerio';
import got from 'got';
import path from 'path';

export default {
  readYaml(yamlPath) {
    let doc;
    try {
      doc = yaml.safeLoad(fs.readFileSync(yamlPath, 'utf8'));
    } catch (e) {
      process.exit(0);
    }

    return doc;
  },
  save(feed, filePath) {
    const absolutePath = path.resolve(filePath);

    fs.writeFileSync(absolutePath, feed.atom1());
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
