import 'core-js/stable';
import 'regenerator-runtime/runtime';
import sinon from 'sinon';
import { expect } from 'chai';
import cheerio from 'cheerio';
import {
  afterEach, beforeEach, describe, it,
} from 'mocha';
import fixtures from '../fixtures';
import DateHandler from '../../lib/handler/dateHandler';

describe('DateHandler', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should return Date type', () => {
    const pageFixture = fixtures.item;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {
      selector: '#item',
      attr: 'data-datetime',
      format: 'dd/mm/yyyy',
    };

    const date = DateHandler.handle(config, el);

    expect(date)
      .to
      .be
      .a('Date');
  });

  it('Value is not a date', () => {
    const pageFixture = fixtures.article_list;
    const el = cheerio.load(pageFixture)
      .root();
    const config = {
      selector: 'h1',
      format: 'dd/mm/yyyy',
    };

    const date = DateHandler.handle(config, el);

    expect(date).to.be.undefined;
  });
});
