const lazyload = require('norska/frontend/lazyload');
module.exports = {
  async init() {
    this.initSidebar();
    this.initImages();
  },
  // Scroll sidebar to the current page
  initSidebar() {
    const link = document.querySelector('.js-navigation-link-active');
    const sidebar = document.querySelector('.js-scrollable-sidebar');
    sidebar.scrollTop = link.offsetTop - 100;
  },
  // Lazy loading of images when in viewport
  initImages() {
    lazyload.init();
  },
};
