import { browser, element, by } from 'protractor';

export class Classe84.Front2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
