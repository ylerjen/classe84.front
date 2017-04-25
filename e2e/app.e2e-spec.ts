import { Classe84.Front2Page } from './app.po';

describe('classe84.front2 App', () => {
  let page: Classe84.Front2Page;

  beforeEach(() => {
    page = new Classe84.Front2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
