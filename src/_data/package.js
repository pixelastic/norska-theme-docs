const readJson = require('firost/readJson');
const parseRepoUrl = require('parse-github-repo-url');
// const gitRoot = require('firost/gitRoot');

module.exports = async (config) => {
  const packagePath = config.rootPath('../lib/package.json');
  const packageContent = await readJson(packagePath);

  const { version, homepage, name, description } = packageContent;
  const [userName, projectName] = parseRepoUrl(packageContent.repository);
  const github = `https://github.com/${userName}/${projectName}`;

  return {
    name,
    version,
    homepage,
    description,
    github,
  };
};
