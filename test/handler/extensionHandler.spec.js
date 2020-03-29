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

describe('ExtensionHandler', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(ValueHandler, 'handle');
    sandbox.stub(DateHandler, 'handle');
    sandbox.stub(LinkHandler, 'handle');
    sandbox.stub(ListHandler, 'handle');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should handle date', () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {
      type: 'date',
    };

    ExtensionHandler.handleProperty(config, el);

    expect(DateHandler.handle.called).to.be.true;
    expect(ValueHandler.handle.notCalled).to.be.true;
    expect(LinkHandler.handle.notCalled).to.be.true;
    expect(ListHandler.handle.notCalled).to.be.true;
  });

  it('Should handle list', () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {
      type: 'list',
    };

    ExtensionHandler.handleProperty(config, el);

    expect(DateHandler.handle.notCalled).to.be.true;
    expect(ValueHandler.handle.notCalled).to.be.true;
    expect(LinkHandler.handle.notCalled).to.be.true;
    expect(ListHandler.handle.called).to.be.true;
  });

  it('Should handle link', () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {
      type: 'link',
    };

    ExtensionHandler.handleProperty(config, el);

    expect(DateHandler.handle.notCalled).to.be.true;
    expect(ValueHandler.handle.notCalled).to.be.true;
    expect(LinkHandler.handle.called).to.be.true;
    expect(ListHandler.handle.notCalled).to.be.true;
  });

  it('Should handle value', () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {
      type: 'value',
    };

    ExtensionHandler.handleProperty(config, el);

    expect(DateHandler.handle.notCalled).to.be.true;
    expect(ValueHandler.handle.called).to.be.true;
    expect(LinkHandler.handle.notCalled).to.be.true;
    expect(ListHandler.handle.notCalled).to.be.true;
  });
});
