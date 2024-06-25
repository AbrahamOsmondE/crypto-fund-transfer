import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const router = async (fastify: FastifyInstance) => {
  fastify.post("/transfer", (request: FastifyRequest, reply: FastifyReply) => {
    console.log('transferring funds...')
  });
};

export default router;
