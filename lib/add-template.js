const chalk = require('chalk');
const isGitUrl = require('is-git-url');
const inquirer = require('inquirer');
const { stopSpinner } = require('./util/spinner');
const { log } = require('./util/logger');
const {
  readTemplateJson,
  writeTemplateJson
} = require('./util/readTemplateData');

async function addProjectTemplate(templateName, gitRepoAddress) {
  const templateGitRepoJson = readTemplateJson();
  if (templateGitRepoJson[templateName]) {
    console.log(`  ` + chalk.red(`template name ${templateName} has exists.`));
    // 当前目录下创建给用户提示,是否覆盖
    const { ok } = await inquirer.prompt([
      {
        name: 'ok',
        type: 'confirm',
        message: `Make sure you want to reset ${templateName} repo download url?`
      }
    ]);
    if (!ok) {
      return;
    }
  }
  if (!isGitUrl(gitRepoAddress)) {
    console.log(
      `  ` +
        chalk.red(
          `git repo address ${gitRepoAddress} is not a correct git repo.`
        )
    );
    return;
  }
  // 检查格式，是否是百家互联的内网仓库
  if (!checkGitRepo(gitRepoAddress)) {
    console.log(
      `  ` +
        chalk.red(
          `git repo address ${gitRepoAddress} is not a correct git repo.`
        )
    );
    return;
  }
  templateGitRepoJson[templateName] = {
    download: gitRepoAddress
  };
  writeTemplateJson(templateGitRepoJson);
  stopSpinner();
  log();
  log(`🎉  Successfully add project template ${chalk.yellow(templateName)}.`);
  log();
}
/**
 * 检查是否是符合要求
 */
function checkGitRepo(gitRepo) {
  const sshRegExp = /^git@(github|git.baijiahulian).com:(.+)\/(.+).git$/;
  const httpsRegExp = /^http(?:s)?:\/\/(github|git.baijiahulian).com\/(.+)\/(.+).git$/;
  if (sshRegExp.test(gitRepo) || httpsRegExp.test(gitRepo)) {
    // ssh
    return true;
  }
  return false;
}

module.exports = (...args) => {
  return addProjectTemplate(...args).catch(err => {
    console.error(err);
    process.exit(1);
  });
};
