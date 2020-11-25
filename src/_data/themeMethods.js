module.exports = {
  /**
   * Parses a navigation entry into .href, .title and .isActive
   * @param {string|object} entry Link object or string shorthand
   * @param {object} dependencyInjection Object containing pug methods
   * Expect isCurrentPage and link
   * @returns {object} Object with all parsed information
   **/
  parseNavigationLink(entry, dependencyInjection = {}) {
    const { isCurrentPage, link } = dependencyInjection;

    const title = entry.title || entry;

    // href is expected to be given as relative to the root, but will be returned
    // as relative to the file calling it
    let href = entry.href || entry;
    if (!href.startsWith('/')) {
      href = `/${href}`;
    }
    const relativeLink = link(href);

    const isActive = isCurrentPage(href);
    return { title, relativeLink, isActive };
  },
  /**
   * Returns the HTML code for the header logo, or the path to save it on disk
   * if not set
   * @param {object} dependencyInjection Object containing pug methods
   * Expect include
   * @returns {string} HTML representation of the logo
   **/
  headerLogos(dependencyInjection = {}) {
    const { include, _ } = dependencyInjection;
    const filepaths = {
      default: '_includes/logo.pug',
      md: '_includes/logo_md.pug',
      lg: '_includes/logo_lg.pug',
    };

    return _.mapValues(filepaths, (filepath) => {
      try {
        return include(filepath);
      } catch (_err) {
        return filepath;
      }
    });
  },
  /**
   * Returns a URL pointing to the page to edit the file in the GitHub repo
   * @param {string} here url.here of the calling page
   * @param {object} dependencyInjection Object containing pug data. Expect at
   * least package
   * @returns {string} URL of the edit page
   */
  editUrl(here, dependencyInjection = {}) {
    const { package } = dependencyInjection.data;
    const mdFile = here.replace(/\/$/, '.md');
    return `${package.github}/edit/master/docs/src${mdFile}`;
  },
};
