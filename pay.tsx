/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, tw, encode } from "./deps.ts";
import { coins } from "./coins.ts";
import { getUrl } from "./functions/getUrl.ts";
import { style } from "./style.ts";
import { Head } from "./head.tsx";

export const Pay = ({domain, ticker, address, marketData}: { domain: string, ticker: string, address: string, marketData: {price: number, percent: number, increased: boolean} | null }) => (
    <div>

        <style>{style}</style>
        <Head />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={`Send ${coin(ticker) ? coin(ticker).name + ` (${ticker})` : ticker} to ${domain.includes(".") ? domain.toLowerCase() : domain.toLowerCase() + "/"}`} />
        <meta name="twitter:url" content={"/" + domain + "/" + ticker} />
        <meta name="twitter:title" content={"hiphip.tips | " + (domain.includes(".") ? domain.toLowerCase() : domain.toLowerCase() + "/") + " | " + ticker} />
        <meta name="twitter:image" content={"/" + domain + "/" + ticker + "/qr"} />
        <meta content={coin(ticker) ? coin(ticker).color : "#34D399"} data-react-helmet="true" name="theme-color" />
        <div class={tw`py-2 flex-col justify-between mx-auto px-4 dark:text-white`}>
            <div class={tw`mb-2`}>
                <a href="/" class={tw`px-4 text-xl`}>
                    <span>🏠 hiphip.tips</span>
                </a>
            </div>
            <div class={tw`mb-2`}>
                <a href={"/" + domain} class={tw`px-4 text-xl`}><span>⬅️ /{domain.includes(".") ? domain.toLowerCase() : domain.toLowerCase() + "/"}</span></a>
            </div>
        </div>
        {
            coin(ticker) ? (
                <div>
                    <div class={tw`flex justify-center max-w-3xl mx-auto`}>  
                        <span class={tw`text-4xl md:text-5xl dark:text-white text-center`}>
                            <img src={"/static/coins/" + ticker + ".webp"} alt="" class={tw`w-10 h-10 md:w-12 md:h-12 mb-2 mr-2 inline`} />

                            {coin(ticker).name + ` (${ticker})`}
                        </span>
                    </div>
                    <div class={tw`flex justify-center max-w-3xl mx-auto`}>
                        <h2 class={tw`text-3xl ${marketData!.increased ? "text-green-400" : "text-red-400 text-center" }`}>
                        {((marketData!.increased ? "▲ " : "▼ ") + marketData!.percent.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }) + "% " + "$" + marketData!.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })) || ""}
                        </h2>
                    </div>
                </div>
            ) : (
                <h1 class={tw`text-4xl md:text-5xl dark:text-white text-center mt-4 break-all max-w-3xl mx-auto`}>{ticker}</h1>
            )

        }
        <h2 class={tw`text-3xl mt-1  dark:text-white text-center max-w-md mx-auto`}>{domain.includes(".") ? domain.toLowerCase() : domain.toLowerCase() + "/"}</h2>

        {
            (coin(ticker) && (coin(ticker).type == "basic" || coin(ticker).type == "lnAddress")) ? (
                <div>
                    <p class={tw`text-xl mt-1 dark:text-white text-center max-w-md mx-auto`}>Tap or scan to pay</p>
                    {/* <img 
                        class={tw`border-white border-8 rounded-lg w-64 h-64 mx-auto mt-4 transition-transform transform-gpu md:motion-safe:hover:scale-105 motion-safe:active:scale-95 hover:cursor-pointer`}
                        src={"/" + domain + "/" + ticker + "/qr/" + address}
                        onmouseup={`(() => {window.location.assign("${getUrl(address, ticker)}")})()`}
                    /> */}
                    <div
                        id="canvas"
                        class={tw`flex justify-center w-64 h-64 mx-auto border-white border-8 rounded-xl ring-8 ring-white ring-inset mt-4 mb-4 transition-transform transform-gpu md:motion-safe:hover:scale-105 motion-safe:active:scale-95 hover:cursor-pointer`}
                        onmouseup={`(() => {window.location.assign("${getUrl(address, ticker)}")})()`}
                    ></div>
                    <script type="text/javascript" src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script>
                    <script>{script(address, ticker)}</script>
                    {(coin(ticker).type == "lnAddress") ? <p class={tw`text-xl mb-4 dark:text-white text-center max-w-xs mx-auto`}>You will need a <a style={"color: " + coin(ticker).color}href="https://lightningaddress.com"><strong>lightning address wallet</strong></a></p> : null}
                </div>
             ) : (
                <div>
                    <p class={tw`text-xl mt-1 dark:text-white text-center max-w-md mx-auto`}>Scan to pay</p>
                    {/* <img class={tw`border-white border-8 rounded-lg w-64 h-64 mx-auto mt-4`} src={"/" + domain + "/" + ticker + "/qr/" + address}/> */}
                    <div
                        id="canvas"
                        class={tw`flex justify-center w-64 h-64 mx-auto border-white border-8 rounded-xl ring-8 ring-white ring-inset mt-4 mb-4`}
                    ></div>
                    <script type="text/javascript" src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script>
                    <script>{script(address, ticker)}</script>
                </div>
             )
            
        }
        <div class={tw`flex justify-center mb-8`}>
            <button 
                class={tw`border-2 border-black dark:border-white dark:text-white text-center rounded-md w-full text-3xl px-4 pb-1 pt-0.5 w-80 mx-auto transition-transform transform-gpu md:motion-safe:hover:scale-105 motion-safe:active:scale-95`}
                onmouseup={`(() => {navigator.clipboard.writeText("${address}")})()`}
            >
                📋 Copy Address
            </button>
        </div>
    </div>
);

const coin = (ticker: string) => { return coins[ticker] };

const script = (address: string, ticker: string): string => `
        const qrCode = new QRCodeStyling({
            data: "${getUrl(address, ticker)}",
            type: "canvas",
            height: 500,
            width: 500,
            image: "${coin(ticker) ? "data:image/webp;base64," + encode(Deno.readFileSync("./static/coins/" + ticker + ".webp")) : ""}",
            dotsOptions: {
                color: "${coin(ticker)?.color ?? "#000000"}",
                type: "rounded"
            },
            cornersSquareOptions: {
                color: "${coin(ticker)?.color ?? "#000000"}",
                type: "extra-rounded" 
            },
            cornersDotOptions: {
                color: "${coin(ticker)?.color ?? "#000000"}",
                type: "dot"
            },
            backgroundOptions: {
                color: "#ffffff"
            },
            imageOptions: {
                margin: 8
            }
        });

        // const qrCode = new QRCodeStyling({
        //     data: "hello",
        //     height: 300,
        //     width: 100,
        //     type: "svg"
        // })

        qrCode.append(document.getElementById("canvas"));
`;