const fastify = require("fastify")({ logger: true });
const shell = require("shelljs");

const { webhookHandler } = require("./handlers");

fastify.get("/", webhookHandler);
fastify.post("/", webhookHandler);

const start = async () => {
  try {
    await shell.exec("eval `ssh-agent`");
    await fastify.listen(process.env.PORT || 8181);
    console.log(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
