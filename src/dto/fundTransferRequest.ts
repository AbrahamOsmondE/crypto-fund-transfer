import { FundTransferActions } from "./fundTransferActions";

export interface FundTransferRequest {
  amount: number,
  to: string,
  from: string,
  action: FundTransferActions
}