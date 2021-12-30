import { qrcode, decode } from "./deps.ts";
import { coins } from "./coins.ts";
import { getUrl } from "./functions/getUrl.ts";

export const qr = async (ticker: string, address: string): Promise<Response> => {

    const url = coins[ticker] ? getUrl(address, ticker) : address;

    let qr = await qrcode(url) as unknown as string;
    qr = qr.replace("data:image/gif;base64,", "");

    const uint8Array: Uint8Array = decode(qr);
    const blob = new Blob([uint8Array.buffer]);

    return new Response(blob, {
        headers: {
            "content-type": "image/gif"
        }
    })


}

