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
import CategoryBuilder from '../../lib/builder/categoryBuilder';

describe('CategoryBuilder', () => {
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

  it('Should set value for name', async () => {
    const pageFixture = fixtures.category;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      name: prop,
    };

    const category = await CategoryBuilder.build(config, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(category.name).to.not.be.undefined;
  });

  it('Should set value for domain', async () => {
    const pageFixture = fixtures.category;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      domain: prop,
    };

    const category = await CategoryBuilder.build(config, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(category.domain).to.not.be.undefined;
  });

  it('Should set value for scheme', async () => {
    const pageFixture = fixtures.category;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      scheme: prop,
    };

    const category = await CategoryBuilder.build(config, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(category.scheme).to.not.be.undefined;
  });

  it('Should set value for term', async () => {
    const pageFixture = fixtures.category;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      term: prop,
    };

    const category = await CategoryBuilder.build(config, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(category.term).to.not.be.undefined;
  });
});
