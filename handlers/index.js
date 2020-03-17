const repos = require("./../configs/repos");
const shell = require("shelljs");
const webhookHandler = require("./webhook")({ repos, shell });

module.exports = {
  webhookHandler
};
