import { ethers } from "ethers";
// 连接到以太坊主网的Alchemy节点，这是我自己注册的
const provider = new ethers.JsonRpcProvider("");

// 创建随机的wallet对象
const wallet1 = ethers.Wallet.createRandom()

// 利用私钥和provider创建wallet对象
const privateKey = ''
const wallet2 = new ethers.Wallet(privateKey, provider)

// 从助记词创建wallet对象
const wallet1WithProvider = wallet1.connect(provider)
const mnemonic = wallet1.mnemonic // 获取助记词
console.log(`助记词: ${mnemonic.phrase}`)
const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase)


const address1 = await wallet1.getAddress()
const address2 = await wallet2.getAddress()
const address3 = await wallet3.getAddress() // 获取地址
console.log(`1. 获取钱包地址`);
console.log(`钱包1地址: ${address1}`);
console.log(`钱包2地址: ${address2}`);
console.log(`钱包3地址: ${address3}`);
console.log(`钱包1和钱包3的地址是否相同: ${address1 === address3}`);

console.log(`钱包1助记词: ${wallet1.mnemonic.phrase}`)
console.log(`钱包2私钥: ${wallet2.privateKey}`)
const txCount1 = await provider.getTransactionCount(wallet1WithProvider)
const txCount2 = await provider.getTransactionCount(wallet2)
console.log(`钱包1发送交易次数: ${txCount1}`)
console.log(`钱包2发送交易次数: ${txCount2}`)

// 5. 发送ETH
// 如果这个钱包没goerli测试网ETH了，去水龙头领一些，钱包地址: 0xe16C1623c1AA7D919cd2241d8b36d9E79C1Be2A2
// 1. chainlink水龙头: https://faucets.chain.link/goerli
// 2. paradigm水龙头: https://faucet.paradigm.xyz/
console.log(`\n5. 发送ETH（测试网）`);
// i. 打印交易前余额
console.log(`i. 发送前余额`)
console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`)
console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)
// ii. 构造交易请求，参数：to为接收地址，value为ETH数额
const tx = {
    to: address1,
    value: ethers.parseEther("0.001")
}
// iii. 发送交易，获得收据
console.log(`\nii. 等待交易在区块链确认（需要几分钟）`)
const receipt = await wallet2.sendTransaction(tx)
await receipt.wait() // 等待链上确认交易
console.log(receipt) // 打印交易详情
// iv. 打印交易后余额
console.log(`\niii. 发送后余额`)
console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`)
console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)
