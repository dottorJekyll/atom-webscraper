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

describe('ValueHandler', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should return value if value', () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {
      value: 'Value',
    };

    const value = ValueHandler.handle(config, el);

    expect(value)
      .to
      .equal('Value');
  });

  it('Should return text if none attr', () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {
      selector: 'h1',
    };

    const expectedValue = el.find(config.selector)
      .text();

    const value = ValueHandler.handle(config, el);

    expect(value)
      .to
      .equal(expectedValue);
  });

  it('Should return html if attr specify html', () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {
      selector: '.items',
      attr: 'html',
    };

    const expectedValue = el.find(config.selector)
      .html();

    const value = ValueHandler.handle(config, el);

    expect(value)
      .to
      .equal(expectedValue);
  });

  it('Should return undefined if none element is found', () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {
      selector: '.no-items',
      attr: 'html',
    };

    const value = ValueHandler.handle(config, el);

    expect(value).to.be.undefined;
  });

  it('Should return attr passed by', () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {
      selector: 'body',
      attr: 'examples-type',
    };

    const expectedValue = el.find(config.selector)
      .attr(config.attr);

    const value = ValueHandler.handle(config, el);

    expect(value)
      .to
      .equal(expectedValue);
  });
});
