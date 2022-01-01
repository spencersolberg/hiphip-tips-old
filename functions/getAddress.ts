import { getICANNTLDS } from "./getICANNTLDS.ts";

export const getAddress = async (domain: string, ticker: string): Promise<string> => {

    if (domain.replace("/", "").toLowerCase() == "hiphip.tips") {
        console.log("self-check")
        const address = await Deno.readTextFile("./static/wallets/" + ticker.toUpperCase());
        console.log(address);
        return address;
    }

    const tlds = await getICANNTLDS();

    const icann = tlds.includes(domain.split(".")[domain.split(".").length - 1].toUpperCase());
    const local = domain.includes("localhost");

    let addressURL;

    if(icann) {
        addressURL = "https://" + domain + "/.well-known/wallets/" + ticker.toUpperCase();
    } else if (local) {
        addressURL = "http://" + domain + "/.well-known/wallets/" + ticker.toUpperCase();
    } else {
        addressURL = "https://" + domain + ".hns.is/.well-known/wallets/" + ticker.toUpperCase();
    }

    console.log("Requesting /.well-known/wallets/: " + addressURL);
    
    const response = await fetch(addressURL);
    const address = await response.text();

    return address.trim();
}
