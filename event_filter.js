import { BaseWallet, ethers } from "ethers";
// 连接到以太坊sepolia的Alchemy节点，这是我自己注册的
// const provider = new ethers.JsonRpcProvider("");
// 连接到以太坊主网的Alchemy节点，这是我自己注册的
const provider = new ethers.JsonRpcProvider("");

// 合约地址
const addressUSDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
// bitget的交易所地址
const accountBinance = '0x1AB4973a48dc892Cd9971ECE8e01DcC7688f8F23'
// 构建ABI
const abi = [
    "event Transfer(address indexed from, address indexed to, uint value)",
    "function balanceOf(address) public view returns(uint)",
];
// 构建合约对象
const contractUSDT = new ethers.Contract(addressUSDT, abi, provider);
const balanceUSDT = await contractUSDT.balanceOf(accountBinance)
console.log(`USDT余额: ${ethers.formatUnits(balanceUSDT, 6)}\n`)
// 2. 创建过滤器，监听转移USDT进交易所
console.log("\n2. 创建过滤器，监听USDT转进交易所")
let filterBinanceIn = contractUSDT.filters.Transfer(null, accountBinance);
console.log("过滤器详情：")
console.log(filterBinanceIn);
contractUSDT.on(filterBinanceIn, (res) => {
    console.log('---------监听USDT进入交易所--------');
    console.log(
        `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2], 6)}`
    )
})
// 3. 创建过滤器，监听交易所转出USDT
let filterToBinanceOut = contractUSDT.filters.Transfer(accountBinance);
console.log("\n3. 创建过滤器，监听USDT转出交易所")
console.log("过滤器详情：")
console.log(filterToBinanceOut);
contractUSDT.on(filterToBinanceOut, (res) => {
    console.log('---------监听USDT转出交易所--------');
    console.log(
        `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2], 6)}`
    )
}
);
