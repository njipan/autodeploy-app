const repos = require("./../configs/repos");
const shell = require("shelljs");
const fs = require("fs");
const webhookHandler = require("./webhook")({ repos, shell, fs });

module.exports = {
  webhookHandler
};
