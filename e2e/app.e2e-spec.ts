import { FlickerPage } from './app.po';

describe('flicker App', () => {
  let page: FlickerPage;

  beforeEach(() => {
    page = new FlickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
