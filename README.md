# Game

Gaming platform with encrypted scores and private tournaments

## Let's go! рџљЂ

Ever wanted to keep your data private while still getting things done? That's exactly what this does. Using Zama's FHEVM, we can process your encrypted data without ever peeking inside. Pretty cool, right?

## What makes this special

- Your data stays encrypted. Always.
- The system can work with it without decrypting
- You control when and what gets revealed
- Built on blockchain for transparency and trust

## Tech stack

We're using:
- **Zama FHEVM** - The encryption powerhouse
- **Hardhat** - Our development playground
- **Solidity** - Writing smart contracts
- **TypeScript** - Keeping things type-safe

Everything runs on Sepolia testnet, so grab some test ETH and let's build!

## Get started

`ash
npm install
npm run compile
`

Don't forget to set up your .env file (there's a template to help you out).

Ready to deploy?

`ash
npm run deploy:sepolia
`

## The contracts

- `GamingPlatform`

Find the addresses in contracts.json after deployment.

## How it all works

Data gets encrypted on your end, sent to the blockchain, and the smart contract does its thing - all while your data remains encrypted. When you need to see something, you authorize decryption for that specific piece. It's privacy by design, not as an afterthought.

## Want to contribute?

This is open source! Fork it, break it, make it better. Found a bug? Open an issue. Have an idea? Send a PR. Let's make privacy-preserving tech accessible to everyone.

## License

MIT - go wild!


