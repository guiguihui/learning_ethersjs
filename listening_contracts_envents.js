import { BaseWallet, ethers } from "ethers";
// 连接到以太坊主网的Alchemy节点，这是我自己注册的
const provider = new ethers.JsonRpcProvider("");

// USDT的合约地址
const contractAddress = '0x1c7d4b196cb0c7b01d743fbc6116a902379c7238'
// 构建USDT的Transfer的ABI
const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)"
];
// 生成USDT合约对象
const contractUSDT = new ethers.Contract(contractAddress, abi, provider);
// 只监听一次
console.log("\n1. 利用contract.once()，监听一次Transfer事件");
contractUSDT.once('Transfer', (from, to, value) => {
    // 打印结果
    console.log(
        `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
    )
})
// 持续监听USDT合约
// console.log("\n2. 利用contract.on()，持续监听Transfer事件");
// contractUSDT.on('Transfer', (from, to, value) => {
//     console.log(
//         // 打印结果
//         `${from} -> ${to} ${ethers.formatUnits(ethers.getBigInt(value), 6)}`
//     )
// })
