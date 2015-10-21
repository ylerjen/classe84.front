describe('Routing', function () {
  it('should redirect index.html to index.html#/phones', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/phones');
      });
  });
});

describe('Phone list view', function() {
  beforeEach(function() {
    browser.get('app/index.html#/phones');
  });


describe('Phone detail view', function() {

  beforeEach(function() {
    browser.get('app/index.html#/phones/nexus-s');
  });


  it('should display placeholder page with phoneId', function() {
    expect(element(by.binding('phoneId')).getText()).toBe('nexus-s');
  });
});