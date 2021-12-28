/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, tw } from "./deps.ts";
import { coins } from "./coins.ts";

const style = `
    @font-face {
        font-family: "Anybody ExtraExpandedBlack";
        src: url("/static/Anybody-ExtraExpandedBlack.woff2") format("woff2"),
            url("/static/Anybody-ExtraExpandedBlack.woff") format("woff");
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: "Sporting Grotesque Bold";
        src: url("/static/Sporting_Grotesque-Bold_web.woff2") format("woff2"),
            url("/static/Sporting_Grotesque-Bold_web.woff") format("woff");
            font-weight: normal;
            font-style: normal;
    }
    h1 {
     font-family: "Anybody ExtraExpandedBlack";
    }
    span, a {
        font-family: "Sporting Grotesque Bold";
    }
    @media (prefers-color-scheme: dark) {
        body {
            background-color: black;
        }
    }
`;

export const Domain = (props: { domain: string; wallets: string[]; }) => (
    <div>
        <style>
            {style}
        </style>
        <div class={tw`pt-2`}>
            <a href="/" class={tw`px-4 text-md text-black dark:text-white`}>
                🏠 hiphip.tips
            </a>
        </div>
        
        <h1 class={tw`text-2xl md:text-3xl dark:text-white text-center mt-4 break-all max-w-3xl mx-auto`}>{props.domain.includes(".") ? props.domain.toLowerCase() : props.domain.toLowerCase() + "/"}</h1>
        
        <div class={tw`grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mx-auto max-w-xs md:max-w-md`}>
            {props.wallets.map((w: string) => (
                <a href={"/" + props.domain + "/" + w}>
                    <div class={tw`rounded-lg dark:text-white dark:border-white border-black border-2 p-2 text-center flex justify-center md:justify-start transition-transform transform-gpu md:motion-safe:hover:scale-105 motion-safe:active:scale-95`}>

                        {coins[w] ? <img src={"/static/coins/" + w + ".png"} alt="" class={tw`w-8 h-8`} /> : <img src="/static/unknown.png" alt="" class={tw`w-8 h-8`} />}


                        <span class={tw`mt-1.5 ml-2`}>{coins[w] ? coins[w].name : w}</span>

                    </div>
                </a>

            ))}
        </div>
        
        {/* <ul class={tw`mt-10 text-center dark:text-white mx-auto`}>
        {props.wallets.map((w) => (
            <li>{coins[w] ? coins[w].name : w}</li>
        ))}
        </ul> */}
    </div>
);
