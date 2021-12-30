import { coins } from "../coins.ts";

export const getUrl = (address: string, ticker: string): string => {
    const coin = coins[ticker];
    if(coin.type == "basic") {
        console.log("basic");
        return coin.protocol + address;
    } else if(coin.type == "lnAddress") {
        return coin.protocol + address;
    } else return address;
}