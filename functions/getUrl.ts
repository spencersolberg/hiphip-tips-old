import { coins } from "../coins.ts";

export const getUrl = (address: string, coin: any): string => {
    if(coins[coin].type == "basic") {
        console.log("basic");
        return coins[coin].protocol + address;
    } else return address;
}