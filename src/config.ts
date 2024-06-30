import { CrossChainMessenger } from "@mantleio/sdk";
import { pino } from "pino";
import {ethers} from "ethers" ;

import * as fs from 'fs';
import * as path from 'path';

export const LOG_LEVEL = process.env.LOG_LEVEL || "info";
export const HEALTH_CHECK_PATH = "/health";

export const logger = pino({
  level: LOG_LEVEL,
});


export const L1_BRIDGE = process.env.L1_BRIDGE
export const L2_BRIDGE = process.env.L2_BRIDGE

export const PRIVATE_KEY = process.env.PRIVATE_KEY! // Should use secret manager instead

export const L1_RPC = process.env.L1_RPC
export const L2_RPC = process.env.L2_RPC

export const L2_ETH = process.env.L2_ETH!

export const L1_CHAINID = process.env.L1_CHAINID
export const L2_CHAINID = process.env.L2_CHAINID

const l1RpcProvider = new ethers.providers.JsonRpcProvider(process.env.L1_RPC);
const l2RpcProvider = new ethers.providers.JsonRpcProvider(process.env.L2_RPC);
export const l1Wallet = new ethers.Wallet(PRIVATE_KEY, l1RpcProvider) as any;
export const l2Wallet = new ethers.Wallet(PRIVATE_KEY, l2RpcProvider) as any;

let crossChainMessenger: CrossChainMessenger;
export const getCrossChainMessenger = () => {
  if (crossChainMessenger) return crossChainMessenger;
  crossChainMessenger = new CrossChainMessenger({
    l1ChainId: process.env.L1_CHAINID!,
    l2ChainId: process.env.L2_CHAINID!,
    l1SignerOrProvider: l1Wallet,
    l2SignerOrProvider: l2Wallet,
    bedrock: true
  });

  return crossChainMessenger
}

export const L1TestERC20 = JSON.parse(fs.readFileSync(path.join(__dirname, 'abi', 'L1TestERC20.json'), 'utf-8'));
export const L2StandardERC20 = JSON.parse(fs.readFileSync(path.join(__dirname, 'abi', 'L2StandardERC20.json'), 'utf-8'));

export const factory__L1_ERC20 = new ethers.ContractFactory(
  L1TestERC20.abi,
  L1TestERC20.bytecode
);
export const factory__L2_ERC20 = new ethers.ContractFactory(
  L2StandardERC20.abi,
  L2StandardERC20.bytecode
);