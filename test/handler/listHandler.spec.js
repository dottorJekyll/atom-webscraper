import 'core-js/stable';
import 'regenerator-runtime/runtime';
import sinon from 'sinon';
import { expect } from 'chai';
import cheerio from 'cheerio';
import {
  afterEach, beforeEach, describe, it,
} from 'mocha';
import ListHandler from '../../lib/handler/listHandler';
import fixtures from '../fixtures';
import Node from '../../lib/node';
import ElementHandler from '../../lib/handler/elementHandler';
import Builder from '../../lib/builder';

describe('ListHandler', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('List should not have elements', () => {
    const pageFixture = fixtures.article_list;
    const config = {
      type: 'list',
      selector: '#no-items',
      link: {
        selector: 'a',
        attr: 'href',
      },
    };

    sandbox.stub(ElementHandler, 'handle')
      .callsFake(() => []);
    sandbox.stub(Builder, 'build')
      .callsFake(() => undefined);

    const pageNode = Node.Create(config);
    const el = cheerio.load(pageFixture)
      .root();
    const tag = ListHandler.handle(pageNode, el, 'item');

    expect(tag).to.be.empty;
  });

  it('List should have elements', () => {
    const pageFixture = fixtures.article_list;
    const config = {
      type: 'list',
      selector: '.items a',
      link: {
        selector: 'a',
        attr: 'href',
      },
    };

    sandbox.stub(Builder, 'build')
      .callsFake(() => 'jj');

    const pageNode = Node.Create(config);
    const el = cheerio.load(pageFixture)
      .root();
    const tag = ListHandler.handle(pageNode, el, 'item');

    expect(tag).to.not.be.empty;
  });

  it('ListHandler should want to build item', () => {
    const pageFixture = fixtures.article_list;
    const config = {
      type: 'list',
      selector: '.items a',
      link: {
        selector: 'a',
        attr: 'href',
      },
    };

    sandbox.stub(Builder, 'build')
      .callsFake(() => undefined);

    const pageNode = Node.Create(config);
    const el = cheerio.load(pageFixture)
      .root();
    ListHandler.handle(pageNode, el, 'item');

    expect(Builder.build.args[0][2])
      .to
      .equal('item');
  });

  it('ListHandler should build each element', () => {
    const pageFixture = fixtures.article_list;
    const config = {
      type: 'list',
      selector: '.items a',
      link: {
        attr: 'href',
      },
    };

    sandbox.stub(Builder, 'build')
      .callsFake(() => undefined);
    const elements = ElementHandler.handle(
      config,
      cheerio.load(pageFixture)
        .root(),
    );

    const pageNode = Node.Create(config);
    const el = cheerio.load(pageFixture)
      .root();
    ListHandler.handle(pageNode, el, 'item');

    elements.toArray()
      .forEach((element) => {
        expect(
          Builder.build.calledWithExactly(
            pageNode,
            cheerio(element),
            'item',
          ),
        ).to.be.true;
      });
  });

  it('ListHandler with null config for an element', async () => {
    const pageFixture = fixtures.article_list;
    const config = {
      type: 'list',
      selector: '.items a',
      title: null,
    };

    const elements = ElementHandler.handle(
      config,
      cheerio.load(pageFixture)
        .root(),
    );
    const expectedList = await Promise.all(
      elements.toArray()
        .map((element) => Builder.build(config, cheerio(element), 'item')),
    );

    const pageNode = Node.Create(config);
    const el = cheerio.load(pageFixture)
      .root();
    const tag = await Promise.all(ListHandler.handle(pageNode, el, 'item'));

    expect(tag)
      .to
      .eql(expectedList);
  });
});
