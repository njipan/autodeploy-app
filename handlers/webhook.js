const makeWebhookHanlder = ({ repos, shell, fs }) => {
  return async (req, res) => {
    try {
      const eventName = req.headers["x-github-event"] || "";
      const prefixBranch = "refs/heads/";
      const branch = (req.body.ref || "").replace(prefixBranch, "");
      const repoName = req.body.repository.name || "";
      const after = req.body.after || "NO-AFTER";

      const repoConfig = repos[repoName] || {};
      if (eventName != repoConfig.event) throw null;
      if (branch !== repoConfig.branch) throw null;

      const stream = fs.createWriteStream("../deploy_log.txt", { flags: "a+" });
      stream.write(`${repoName}:${branch} incoming ${after}\n`);

      await shell.cd("..");
      const cmd = await shell.exec(repoConfig.script_deploy_path);
      const codeSuccess = cmd.code || 1;
      if (codeSuccess === 0) {
        stream.write(
          `${repoName}:${branch} ${after} deployed successfully\n\n`
        );
      } else {
        stream.write(`${repoName}:${branch} ${after} failed\n\n`);
      }
      stream.end();
    } catch (e) {
      if (e) console.log("Error: ", e);
    }
    return res.send({ status: "success" });
  };
};

module.exports = makeWebhookHanlder;
