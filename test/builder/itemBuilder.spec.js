import 'core-js/stable';
import 'regenerator-runtime/runtime';
import sinon from 'sinon';
import { expect } from 'chai';
import cheerio from 'cheerio';
import {
  afterEach, beforeEach, describe, it,
} from 'mocha';
import fixtures from '../fixtures';
import ValueHandler from '../../lib/handler/valueHandler';
import DateHandler from '../../lib/handler/dateHandler';
import LinkHandler from '../../lib/handler/linkHandler';
import ListHandler from '../../lib/handler/listHandler';
import ExtensionHandler from '../../lib/handler/extensionHandler';
import ItemBuilder from '../../lib/builder/itemBuilder';
import Node from '../../lib/node';

describe('ItemBuilder', () => {
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
    sandbox.stub(ExtensionHandler, 'handle');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should set value for title', async () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      title: prop,
    };

    const item = await ItemBuilder.build(config, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(item.title).to.not.be.undefined;
  });

  it('Should set value for id', async () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      id: prop,
    };

    const item = await ItemBuilder.build(config, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(item.id).to.not.be.undefined;
  });

  it('Should set value for link', async () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      link: prop,
    };

    const linkNode = new Node(
      { scraping: { hostname: 'example.com' } },
      config,
    );
    const item = await ItemBuilder.build(linkNode, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(item.link).to.not.be.undefined;
  });

  it('Should set value for date', async () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      date: prop,
    };

    const item = await ItemBuilder.build(config, el);

    expect(DateHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(item.date).to.not.be.undefined;
  });

  it('Should set value for description', async () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      description: prop,
    };

    const item = await ItemBuilder.build(config, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(item.description).to.not.be.undefined;
  });

  it('Should set value for content', async () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      content: prop,
    };

    const item = await ItemBuilder.build(config, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(item.content).to.not.be.undefined;
  });

  // it('Should set value for category', async () => {
  //     const pageFixture = fixtures.item;
  //     const el = cheerio.load(pageFixture).root();
  //     const prop = { prop: 'ff' };
  //     const config = {
  //         category: prop,
  //     };
  //
  //     const itemNode = new Node.Create(config);
  //     const categoryNode = new Node({}, {});
  //
  //     const apiServiceModule = require('../../lib/node');
  //     sinon
  //         .stub(apiServiceModule, 'Node')
  //         .callsFake(function MockedApiService() {
  //             return new (class {
  //                 constructor(root, object) {
  //                     console.log('aaa');
  //                 }
  //             })();
  //         });
  //
  //     const item = await ItemBuilder.build(itemNode, el);
  //
  //     expect(
  //         ListHandler.handle.calledWithExactly(categoryNode, el, 'category')
  //     ).to.be.true;
  //     expect(item.category).to.not.be.undefined;
  // });

  it('Should set value for image', async () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      image: prop,
    };

    const item = await ItemBuilder.build(config, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(item.image).to.not.be.undefined;
  });

  // it('Should set value for author', async () => {
  //     const pageFixture = fixtures.item;
  //     const el = cheerio.load(pageFixture).root();
  //     const prop = {};
  //     const config = {
  //         author: prop,
  //     };
  //
  //     const itemNode = new Node({}, config);
  //     const item = await ItemBuilder.build(itemNode, el);
  //     const authorNode = new Node({}, prop);
  //
  //     expect(ListHandler.handle.calledWithExactly(authorNode, el, 'author'))
  //         .to.be.true;
  //     expect(item.author).to.not.be.undefined;
  // });

  // it('Should set value for contributor', async () => {
  //     const pageFixture = fixtures.item;
  //     const el = cheerio.load(pageFixture).root();
  //     const prop = {};
  //     const config = {
  //         contributor: prop,
  //     };
  //
  //     const contributorNode = new Node({}, config);
  //     const item = await ItemBuilder.build(contributorNode, el);
  //
  //     expect(
  //         ListHandler.handle.calledWithExactly(contributorNode, el, 'author')
  //     ).to.be.true;
  //     expect(item.contributor).to.not.be.undefined;
  // });

  it('Should set value for published', async () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      published: prop,
    };

    const item = await ItemBuilder.build(config, el);

    expect(DateHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(item.published).to.not.be.undefined;
  });

  it('Should set value for copyright', async () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      copyright: prop,
    };

    const item = await ItemBuilder.build(config, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(item.copyright).to.not.be.undefined;
  });
});
