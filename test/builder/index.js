import 'core-js/stable';
import 'regenerator-runtime/runtime';
import sinon from 'sinon';
import { expect } from 'chai';
import cheerio from 'cheerio';
import {
  afterEach, beforeEach, describe, it,
} from 'mocha';
import fixtures from '../fixtures';
import FeedBuilder from '../../lib/builder/feedBuilder';
import ItemBuilder from '../../lib/builder/itemBuilder';
import CategoryBuilder from '../../lib/builder/categoryBuilder';
import AuthorBuilder from '../../lib/builder/authorBuilder';
import Builder from '../../lib/builder/index';

describe('Builder', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(FeedBuilder, 'build');
    sandbox.stub(ItemBuilder, 'build');
    sandbox.stub(CategoryBuilder, 'build');
    sandbox.stub(AuthorBuilder, 'build');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should build item', () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {};
    const tagType = 'item';

    Builder.build(config, el, tagType);

    expect(ItemBuilder.build.called).to.be.true;
    expect(CategoryBuilder.build.notCalled).to.be.true;
    expect(AuthorBuilder.build.notCalled).to.be.true;
    expect(FeedBuilder.build.notCalled).to.be.true;
  });

  it('Should build feed', () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {};
    const tagType = 'feed';

    Builder.build(config, el, tagType);

    expect(ItemBuilder.build.notCalled).to.be.true;
    expect(CategoryBuilder.build.notCalled).to.be.true;
    expect(AuthorBuilder.build.notCalled).to.be.true;
    expect(FeedBuilder.build.called).to.be.true;
  });

  it('Should build category', () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {};
    const tagType = 'category';

    Builder.build(config, el, tagType);

    expect(ItemBuilder.build.notCalled).to.be.true;
    expect(CategoryBuilder.build.called).to.be.true;
    expect(AuthorBuilder.build.notCalled).to.be.true;
    expect(FeedBuilder.build.notCalled).to.be.true;
  });

  it('Should build author', () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {};
    const tagType = 'author';

    Builder.build(config, el, tagType);

    expect(ItemBuilder.build.notCalled).to.be.true;
    expect(CategoryBuilder.build.notCalled).to.be.true;
    expect(AuthorBuilder.build.called).to.be.true;
    expect(FeedBuilder.build.notCalled).to.be.true;
  });

  it('Should show error if tagType is unknown', () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {};
    const tagType = 'unknown';

    Builder.build(config, el, tagType);

    expect(ItemBuilder.build.notCalled).to.be.true;
    expect(CategoryBuilder.build.notCalled).to.be.true;
    expect(AuthorBuilder.build.notCalled).to.be.true;
    expect(FeedBuilder.build.notCalled).to.be.true;
  });
});
