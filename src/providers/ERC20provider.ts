import { getCrossChainMessenger } from "@app/config";
import { Provider } from "./core";

import { CrossChainMessenger, MessageStatus } from "@mantleio/sdk";
import { FundTransferRequest } from "@app/dto/fundTransferRequest";

export class ERC20Provider implements Provider {
  readonly crossChainMessenger: CrossChainMessenger;
  constructor() {
    this.crossChainMessenger = getCrossChainMessenger()
  }
  deposit = async (fundTransferRequest: FundTransferRequest) => {
    const { to, from, amount } = fundTransferRequest;
    const allowanceResponse = await this.crossChainMessenger.approveERC20(
      to,
      from,
      amount
    );
    await allowanceResponse.wait();

    const response = await this.crossChainMessenger.depositERC20(
      to,
      from,
      amount
    );
    await response.wait();
    await this.crossChainMessenger.waitForMessageStatus(
      response.hash,
      MessageStatus.RELAYED
    );
  };

  withdraw = async (fundTransferRequest: FundTransferRequest)  => {
    const { to, from, amount } = fundTransferRequest;
    const response = await this.crossChainMessenger.withdrawERC20(
      to,
      from,
      amount
    );
    await response.wait();

    await this.crossChainMessenger.waitForMessageStatus(
      response.hash,
      MessageStatus.READY_TO_PROVE
    );
    await this.crossChainMessenger.proveMessage(response.hash);

    await this.crossChainMessenger.waitForMessageStatus(
      response.hash,
      MessageStatus.IN_CHALLENGE_PERIOD
    );

    await this.crossChainMessenger.waitForMessageStatus(
      response.hash,
      MessageStatus.READY_FOR_RELAY
    );
    await this.crossChainMessenger.finalizeMessage(response.hash);
    await this.crossChainMessenger.waitForMessageStatus(
      response,
      MessageStatus.RELAYED
    );
  };
}