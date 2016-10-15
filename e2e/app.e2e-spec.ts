import { RrPage } from './app.po';

describe('rr App', function() {
  let page: RrPage;

  beforeEach(() => {
    page = new RrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
