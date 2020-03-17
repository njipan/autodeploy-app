const makeWebhookHanlder = ({ repos, shell }) => {
  return (req, res) => {
    try {
      const eventName = req.headers["x-github-event"] || "";
      const prefixBranch = "refs/heads/";
      const branch = (req.body.ref || "").replace(prefixBranch, "");
      const repoName = req.body.repository.name || "";

      const repoConfig = repos[repoName] || {};
      console.log(repoConfig);
      if (eventName != repoConfig.event) throw null;
      if (branch !== repoConfig.branch) throw null;

      shell.cd("..");
      shell.exec(repoConfig.script_deploy_path);
    } catch (e) {
      console.log("Error: ", e);
    }
    return res.send({ status: "success" });
  };
};

module.exports = makeWebhookHanlder;
