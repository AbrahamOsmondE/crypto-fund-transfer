import { L2_ETH, getCrossChainMessenger, l2Wallet } from "@app/config";
import { Provider } from "./core";
import { ethers } from "ethers"
import { erc20ABI } from "@app/constants";
import { CrossChainMessenger, MessageStatus, NumberLike } from "@mantleio/sdk";
import { FundTransferRequest } from "@app/dto/fundTransferRequest";

export class ETHProvider implements Provider {
  readonly crossChainMessenger: CrossChainMessenger;
  constructor() {
    this.crossChainMessenger = getCrossChainMessenger()
  }

  deposit = async (fundTransferRequest: FundTransferRequest) => {
    const amount = fundTransferRequest.amount
    const eth = amount

    const response = await this.crossChainMessenger.depositETH(eth);
    await response.wait();

    await this.crossChainMessenger.waitForMessageStatus(
      response,
      MessageStatus.RELAYED
    );
  };

  withdraw = async (fundTransferRequest: FundTransferRequest) => {
    const amount = fundTransferRequest.amount
    const eth = amount
    const doubleEth = 2 * amount
    const approve = await this.crossChainMessenger.approveERC20(
      ethers.constants.AddressZero,
      L2_ETH,
      doubleEth,
      { signer: l2Wallet }
    );

    const response = await this.crossChainMessenger.withdrawERC20(
      ethers.constants.AddressZero,
      L2_ETH,
      eth,
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