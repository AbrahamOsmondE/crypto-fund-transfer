# crypto-fund-transfer

API to transfer funds from Ethereum mainnet to Mantle chain

## `POST /transfer`
### Request
Payload
```
{
  "amount": 0, // integer
  "to": "", // Token Address
  "from": "", // Token Address
  "action": "", // deposit/withdraw from mantle chain
}
```