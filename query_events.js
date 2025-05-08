import { ethers } from "ethers";

// 明确指定你能正常连通的 Sepolia RPC
const provider = new ethers.JsonRpcProvider("");

// WETH合约地址和只包含Transfer事件的ABI
const abiWETH = [
    "event Transfer(address indexed from, address indexed to, uint amount)"
];
const addressWETH = "0x6c5aAE4622B835058A41879bA5e128019B9047d6";

// 合约实例
const contract = new ethers.Contract(addressWETH, abiWETH, provider);

// 获取当前区块高度
const block = await provider.getBlockNumber();
console.log(`当前区块高度: ${block}`);

// 查询过去10个区块内的Transfer事件
console.log("打印事件详情:");
const transferEvents = await contract.queryFilter("Transfer", block - 10, block);

// 解析第一个Transfer事件
if (transferEvents.length > 0) {
    const e = transferEvents[0];
    const amount = ethers.formatUnits(e.args.amount, "ether");
    console.log(`地址 ${e.args.from} 转账 ${amount} WETH 到地址 ${e.args.to}`);
} else {
    console.log("在最近10个区块内没有找到Transfer事件");
}
