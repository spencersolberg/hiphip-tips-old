import { qrcode, decode } from "./deps.ts";
import { coins } from "./coins.ts";
import { getUrl } from "./functions/getUrl.ts";

export const qr = async (coin: string, address: string): Promise<Response> => {

    const url = coins[coin] ? getUrl(address, coin) : address;

    let qr = await qrcode(url);
    qr = qr.replace("data:image/gif;base64,", "");

    const uint8Array: Uint8Array = decode(qr);
    const blob = new Blob([uint8Array.buffer]);

    return new Response(blob, {
        headers: {
            "content-type": "image/gif"
        }
    })


}

