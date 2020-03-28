import 'core-js/stable';
import 'regenerator-runtime/runtime';
import sinon from 'sinon';
import { assert, expect } from 'chai';
import cheerio from 'cheerio';
import {
  afterEach, beforeEach, describe, it,
} from 'mocha';
import fixtures from '../fixtures';
import ElementHandler from '../../lib/handler/elementHandler';

describe('ElementHandler', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should call find if selector', () => {
    const pageFixture = fixtures.article_list;
    const config = {
      selector: '.items',
    };

    const el = cheerio.load(pageFixture)
      .root();

    sinon.spy(el, 'find');

    ElementHandler.handle(config, el);

    assert(el.find.calledOnce);
  });

  it('Should return el if no config', () => {
    const pageFixture = fixtures.article_list;
    const config = {};

    const el = cheerio.load(pageFixture)
      .root();

    sinon.spy(el, 'find');

    const returnedEl = ElementHandler.handle(config, el);

    assert(el.find.notCalled);
    expect(returnedEl)
      .to
      .equal(el);
  });

  it('Should return el if null config', () => {
    const pageFixture = fixtures.article_list;
    const config = null;

    const el = cheerio.load(pageFixture)
      .root();

    sinon.spy(el, 'find');

    const returnedEl = ElementHandler.handle(config, el);

    assert(el.find.notCalled);
    expect(returnedEl)
      .to
      .equal(el);
  });
});
