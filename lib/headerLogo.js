module.exports = (dependencyInjection = {}) => {
  const { include } = dependencyInjection;
  const logoPath = '_includes/logos.pug';

  try {
    return include(logoPath);
  } catch (err) {
    return logoPath;
  }
};
