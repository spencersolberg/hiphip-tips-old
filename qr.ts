import { base64 } from "./deps.ts";
import QRCodeStyling from "https://cdn.skypack.dev/qr-code-styling?dts";
import { coins } from "./coins.ts";

export const qr = async (coin: string, address: string): Promise<Response> => {
    console.log("Starting QR");
    let color;
    let url;
    let image;

    if (coins[coin]) {
        color = coins[coin].color;
        url = getUrl(address, coins[coin]);
        const imageFile = await Deno.readFile("./static/coins/" + coin + ".png");
        const b64 = base64.fromUint8Array(imageFile);
        image = "data:image/png;base64," + b64;
    }

    const qr = new QRCodeStyling({
        data: url ?? address,
        type: "svg",
        image: image ?? undefined,
        margin: 8,
        dotsOptions: {
            color: color ?? "#000000",
            type: "classy"
        },
        cornersSquareOptions: {
            color: color ?? "#000000",
            type: "extra-rounded",
        },
        cornersDotOptions: {
            color: color ?? "#000000",
            type: "dot"
        }
  });

  return new Response(await qr.getRawData("png"));
}

const getUrl = (address: string, coin: any): string => {
    if(coin.type == "basic") {
        return coin.protocol + address;
    } else return address;
}