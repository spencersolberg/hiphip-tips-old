/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, tw } from "./deps.ts";
import { coins } from "./coins.ts";
import { getUrl } from "./functions/getUrl.ts";

const style = `
    @font-face {
        font-family: "Fluro Bold";
        src: url("/static/FluroBold.woff") format("woff");
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: "Anonymous Pro";
        src: url("/static/AnonymousPro-Regular.ttf") format("ttf");
            font-weight: normal;
            font-style: normal;
    }
    h1, button {
     font-family: "Fluro Bold";
    }
    span, h2 {
        font-family: "Fluro Bold";
    }
    @media (prefers-color-scheme: dark) {
        body {
            background-color: black;
        }
    }
    p {
        font-family: "Courier New";
    }
`;

export const Pay = (props: { domain: string, coin: string, address: string }) => (
    <div>

        <style>{style}</style>

        <div class={tw`py-2 flex-col justify-between mx-auto px-4 dark:text-white`}>
            <div class={tw`mb-2`}>
                <a href="/" class={tw`px-4 text-xl`}>
                    <span>🏠 hiphip.tips</span>
                </a>
            </div>
            <div class={tw`mb-2`}>
                <a href={"/" + props.domain} class={tw`px-4 text-xl`}><span>⬅️ /{props.domain.includes(".") ? props.domain.toLowerCase() : props.domain.toLowerCase() + "/"}</span></a>
            </div>
        </div>
        {
            coins[props.coin] ? (
                <div class={tw`flex justify-center max-w-3xl mx-auto`}>  
                    <span class={tw`text-4xl md:text-5xl dark:text-white text-center`}>
                        <img src={"/static/coins/" + props.coin + ".webp"} alt="" class={tw`w-10 h-10 md:w-12 md:h-12 mb-2 mr-2 inline`} />

                        {coins[props.coin].name + ` (${props.coin})`}
                    </span>
                </div>
            ) : (
                <h1 class={tw`text-4xl md:text-5xl dark:text-white text-center mt-4 break-all max-w-3xl mx-auto`}>{props.coin}</h1>
            )

        }
        <h2 class={tw`text-3xl mt-1  dark:text-white text-center max-w-md mx-auto`}>{props.domain.includes(".") ? props.domain.toLowerCase() : props.domain.toLowerCase() + "/"}</h2>

        {
            (coins[props.coin] && (coins[props.coin].type == "basic" || coins[props.coin].type == "lnAddress")) ? (
                <div>
                    <p class={tw`text-xl mt-1 dark:text-white text-center max-w-md mx-auto`}>Tap or scan to pay</p>
                    <img 
                        class={tw`border-white border-8 rounded-lg w-64 h-64 mx-auto mt-4 transition-transform transform-gpu md:motion-safe:hover:scale-105 motion-safe:active:scale-95 hover:cursor-pointer`}
                        src={"/" + props.domain + "/" + props.coin + "/qr"}
                        onmouseup={`(() => {window.location.assign("${getUrl(props.address, props.coin)}")})()`}
                    />
                    {(coins[props.coin].type == "lnAddress") ? <p class={tw`text-xl mt-1.5 dark:text-white text-center max-w-xs mx-auto`}>You will need a <a style={"color: " + coins[props.coin].color}href="https://lightningaddress.com"><strong>lightning address wallet</strong></a></p> : null}
                </div>
             ) : (
                <div>
                    <p class={tw`text-xl mt-1 dark:text-white text-center max-w-md mx-auto`}>Scan to pay</p>
                    <img class={tw`border-white border-8 rounded-lg w-64 h-64 mx-auto mt-4`} src={"/" + props.domain + "/" + props.coin + "/qr"}/>
                </div>
             )
            
        }
        <div class={tw`flex justify-center`}>
            <button 
                class={tw`mt-4 border-2 border-black dark:border-white dark:text-white text-center rounded-md w-full text-3xl px-4 pb-1 pt-0.5 w-80 mx-auto transition-transform transform-gpu md:motion-safe:hover:scale-105 motion-safe:active:scale-95`}
                onmouseup={`(() => {navigator.clipboard.writeText("${props.address}")})()`}
            >
                📋 Copy Address
            </button>
        </div>
    </div>
)