import { FundTransferActions } from "@app/dto/fundTransferActions";
import { FundTransferRequest } from "@app/dto/fundTransferRequest";
import { getProvider } from "@app/providers/core";
import { FastifyReply, FastifyRequest } from "fastify";

export class FundTransferController {
  async transfer(request: FastifyRequest, _reply: FastifyReply) {
    const payload = request.body as FundTransferRequest
    const isDeposit = payload.action === FundTransferActions.DEPOSIT

    const providerAddress = isDeposit ? payload.to : payload.from;
    const provider = getProvider(providerAddress);

    if (payload.action === FundTransferActions.DEPOSIT) {
      await provider.deposit(payload);
    } else if (payload.action === FundTransferActions.WITHDRAw) {
      await provider.withdraw(payload)
    } else {
      throw new Error('Invalid action, action can only be deposit/withdraw')
    }
  }
}