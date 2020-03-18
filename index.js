const fastify = require("fastify")({ logger: true });
const { webhookHandler } = require("./handlers");

fastify.get("/", webhookHandler);
fastify.post("/", webhookHandler);

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 8181);
    console.log(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
