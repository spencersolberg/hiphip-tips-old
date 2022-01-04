import { getICANNTLDS } from "./getICANNTLDS.ts";

export const getWallets = async (domain: string): Promise<string[]> => {

    const tlds = await getICANNTLDS();

    const icann = tlds.includes(domain.split(".")[domain.split(".").length - 1].toUpperCase());

    let walletsURL;

    if(icann) {
        walletsURL = "https://" + domain + "/.well-known/wallets/";
    } else {
        walletsURL = "https://" + domain + ".hns.is/.well-known/wallets/";
    };

    console.log("Requesting /.well-known/wallets/: " + walletsURL);
    
    const response = await fetch(walletsURL);
    const text = await response.text();

    const wallets = text.split(",").map(w => w.trim());

    return wallets;
}
