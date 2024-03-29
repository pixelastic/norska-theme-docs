const current = require('../../src/_data/themeMethods');
const _ = require('golgoth/lodash');

describe('norska-theme-docs > themeMethods', () => {
  describe('parseNavigationLink', () => {
    const dependencyInjection = {
      link: jest.fn(),
      isCurrentPage: jest.fn(),
    };
    beforeEach(async () => {
      dependencyInjection.link.mockImplementation((input) => {
        return `link:${input}`;
      });
      dependencyInjection.isCurrentPage.mockImplementation((input) => {
        return `isCurrentPage:${input}`;
      });
    });
    it.each([
      [
        'Object notation',
        {
          title: 'Getting Started',
          href: 'gettingStarted',
        },
        {
          title: 'Getting Started',
          relativeLink: 'link:/gettingStarted',
          isActive: 'isCurrentPage:/gettingStarted',
        },
      ],
      [
        'Shorthand notation',
        'emptyDir',
        {
          title: 'emptyDir',
          relativeLink: 'link:/emptyDir',
          isActive: 'isCurrentPage:/emptyDir',
        },
      ],
    ])('%s', async (_name, input, expected) => {
      const actual = current.parseNavigationLink(input, dependencyInjection);
      _.each(expected, (value, key) => {
        expect(actual).toHaveProperty(key, value);
      });
    });
  });
});
