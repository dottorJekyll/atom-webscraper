import 'core-js/stable';
import 'regenerator-runtime/runtime';
import sinon from 'sinon';
import { assert } from 'chai';
import cheerio from 'cheerio';
import {
  afterEach, beforeEach, describe, it,
} from 'mocha';
import { Feed } from 'feed';
import PageHandler from '../../lib/handler/pageHandler';
import fixtures from '../fixtures';
import Node from '../../lib/node';
import ListHandler from '../../lib/handler/listHandler';
import FeedBuilder from '../../lib/builder/feedBuilder';

describe('PageHandler', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(ListHandler, 'handle')
      .callsFake(() => []);
    sandbox.stub(FeedBuilder, 'build').returns(new Feed());
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Article List should have items', () => {
    const pageFixture = fixtures.article_list;
    const pageConfig = {
      item: {
        type: 'list',
        selector: '.items',
        link: {
          selector: 'a',
          attr: 'href',
        },
      },
      feed: {},
    };

    const pageNode = Node.Create(pageConfig);
    const el = cheerio.load(pageFixture)
      .root();
    PageHandler.handle(pageNode, el, 'feed');

    assert.ok(ListHandler.handle.called);
  });

  it('tagType not in pageConfig', () => {
    const pageFixture = fixtures.article_list;
    const pageConfig = {
      abc: {},
    };

    const pageNode = Node.Create(pageConfig);
    const el = cheerio.load(pageFixture)
      .root();
    const supported = PageHandler.handle(pageNode, el, 'ef');

    assert.isFalse(supported);
  });
});
