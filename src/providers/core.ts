import { L2_ETH } from "@app/config"
import { ETHProvider } from "./ETHprovider"
import { ERC20Provider } from "./ERC20provider"
import { FundTransferRequest } from "@app/dto/fundTransferRequest"

const ethProvider = new ETHProvider()
const ercProvider = new ERC20Provider()

export interface Provider {
  deposit: (payload: FundTransferRequest) => Promise<void>
  withdraw: (payload: FundTransferRequest) => Promise<void>
}

export const getProvider = (address: string): Provider => {
  if (address === L2_ETH) {
    return ethProvider
  } else {
    return ercProvider
  }
}