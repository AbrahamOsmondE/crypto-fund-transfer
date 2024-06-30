import { FundTransferController } from "@app/controllers/FundTransferController";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const fundTransferController = new FundTransferController()
const router = async (fastify: FastifyInstance) => {
  fastify.post("/transfer", (request: FastifyRequest, reply: FastifyReply) => {
    fundTransferController.transfer(request, reply)
  });
};

export default router;
