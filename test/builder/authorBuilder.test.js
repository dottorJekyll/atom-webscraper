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
import AuthorBuilder from '../../lib/builder/authorBuilder';

describe('AuthorBuilder', () => {
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
    const pageFixture = fixtures.author;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      name: prop,
    };

    const author = await AuthorBuilder.build(config, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(author.name).to.not.be.undefined;
  });

  it('Should set value for email', async () => {
    const pageFixture = fixtures.author;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      email: prop,
    };

    const author = await AuthorBuilder.build(config, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(author.email).to.not.be.undefined;
  });

  it('Should set value for link', async () => {
    const pageFixture = fixtures.author;
    const el = cheerio.load(pageFixture)
      .root();
    const prop = {};
    const config = {
      name: prop,
    };

    const author = await AuthorBuilder.build(config, el);

    expect(ValueHandler.handle.calledWithExactly(prop, el)).to.be.true;
    expect(author.link).to.not.be.undefined;
  });
});
