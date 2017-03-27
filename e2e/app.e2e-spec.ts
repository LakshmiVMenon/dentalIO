import { DentalIOAngularPage } from './app.po';

describe('dental-io-angular App', function() {
  let page: DentalIOAngularPage;

  beforeEach(() => {
    page = new DentalIOAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
