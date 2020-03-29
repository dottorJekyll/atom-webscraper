import 'core-js/stable';
import 'regenerator-runtime/runtime';
import sinon from 'sinon';
import { expect } from 'chai';
import cheerio from 'cheerio';
import {
  afterEach, beforeEach, describe, it,
} from 'mocha'; import fixtures from '../fixtures';
import ValueHandler from '../../lib/handler/valueHandler';
import DateHandler from '../../lib/handler/dateHandler';
import LinkHandler from '../../lib/handler/linkHandler';
import ListHandler from '../../lib/handler/listHandler';
import ExtensionHandler from '../../lib/handler/extensionHandler';
import FeedBuilder from '../../lib/builder/feedBuilder';
import AuthorBuilder from '../../lib/builder/authorBuilder';
import Node from '../../lib/node';

describe('FeedBuilder', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(ValueHandler, 'handle')
      .returns('fakeValue');
    sandbox.stub(DateHandler, 'handle')
      .returns(new Date());
    sandbox.stub(LinkHandler, 'handle');
    sandbox.stub(ListHandler, 'handle')
      .returns([]);
    sandbox.stub(AuthorBuilder, 'build')
      .returns({});
    sandbox.stub(ExtensionHandler, 'handle');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should set value for id', async () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      id: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(feed.options.id).to.not.be.undefined;
  });

  it('Should set value for title', async () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      title: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(feed.options.title).to.not.be.undefined;
  });

  it('Should set value for generator', async () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      generator: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(feed.options.generator).to.not.be.undefined;
  });

  it('Should set value for language', async () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      language: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(feed.options.language).to.not.be.undefined;
  });

  it('Should set value for feedLinks', async () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      feedLinks: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(feed.options.feedLinks).to.not.be.undefined;
  });

  it('Should set value for hub', async () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      hub: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(feed.options.hub).to.not.be.undefined;
  });

  it('Should set value for docs', async () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      docs: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(feed.options.docs).to.not.be.undefined;
  });

  // TODO: test, author should use node object
  it('Should set value for author', async () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      author: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(AuthorBuilder.build.calledWithExactly(prop, el)).to.be.true;
    expect(feed.options.author).to.not.be.undefined;
  });

  it('Should set value for link', async () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      link: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(feed.options.link).to.not.be.undefined;
  });

  it('Should set value for description', async () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      description: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(feed.options.description).to.not.be.undefined;
  });

  it('Should set value for image', async () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      image: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(feed.options.image).to.not.be.undefined;
  });

  it('Should set value for logo with specified config', async () => {
    ValueHandler.handle.restore();
    sandbox.spy(ValueHandler, 'handle');

    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {
      selector: '.logo',
      attr: 'href',
    };
    const config = {
      logo: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    //  name of 'logo' in feed library is favicon
    expect(feed.options.favicon).to.not.be.undefined;
    expect(feed.options.favicon)
      .to
      .equal('logo');
  });

  it('Should set value for logo', async () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      logo: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    //  name of 'logo' in feed library is favicon
    expect(feed.options.favicon).to.not.be.undefined;
  });

  it('Should set value for copyright', async () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      copyright: prop,
    };

    const feedNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const feed = await FeedBuilder.build(feedNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(feed.options.copyright).to.not.be.undefined;
  });
});
