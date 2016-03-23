'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('yu­gi­oh app', function() {


  it('should automatically redirect to /cards when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/cards");
  });


  describe('cards', function() {

    beforeEach(function() {
      browser.get('index.html#/cards');
    });


    it('should render cards when user navigates to /cards', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for cards/);
    });

  });

});