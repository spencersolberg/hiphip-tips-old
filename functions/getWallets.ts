import { getICANNTLDS } from "./getICANNTLDS.ts";

export const getWallets = async (domain: string): Promise<string[]> => {

    const tlds = await getICANNTLDS();

    const walletsURL ="http://" + domain + "/.well-known/wallets/";

    console.log("Requesting /.well-known/wallets/: " + walletsURL);
    
    const response = await fetch(walletsURL);
    const text = await response.text();

    const wallets = text.split(",");

    return wallets;
}
