const readJson = require('firost/readJson');
const parseRepoUrl = require('parse-github-repo-url');
const firostError = require('firost/error');

module.exports = async (config) => {
  const packagePath = config.rootPath('../lib/package.json');
  const packageContent = await readJson(packagePath);

  const { version, homepage, name, description, repository } = packageContent;
  let github;
  try {
    const [userName, projectName] = parseRepoUrl(repository);
    github = `https://github.com/${userName}/${projectName}`;
  } catch (err) {
    throw firostError(
      'NORSKA_THEME_DOCS_NO_REPOSITORY',
      'Cannot find repository url. Please set your repository key in ./lib/package.json in the "user/project" form'
    );
  }

  return {
    name,
    version,
    homepage,
    description,
    github,
  };
};
