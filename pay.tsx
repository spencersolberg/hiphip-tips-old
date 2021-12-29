/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, tw } from "./deps.ts";
import { coins } from "./coins.ts";

const style = `
    @font-face {
        font-family: "Fluro Bold";
        src: url("/static/FluroBold.woff") format("woff");
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
     font-family: "Fluro Bold";
    }
    span, a, h2 {
        font-family: "Fluro Bold";
    }
    @media (prefers-color-scheme: dark) {
        body {
            background-color: black;
        }
    }
`;

export const Pay = (props: { domain: string, coin: string, address: string }) => (
    <div>

        <style>{style}</style>

        <div class={tw`py-2 flex-col justify-between mx-auto px-4 dark:text-white`}>
            <div class={tw`mb-2`}>
                <a href="/" class={tw`px-4 text-xl`}>
                    🏠 hiphip.tips
                </a>
            </div>
            <div class={tw`mb-2`}>
                <a href={"/" + props.domain} class={tw`px-4 text-xl`}>⬅️ /{props.domain.includes(".") ? props.domain.toLowerCase() : props.domain.toLowerCase() + "/"}</a>
            </div>
        </div>

        <h1 class={tw`text-4xl md:text-5xl dark:text-white text-center mt-4 break-all max-w-3xl mx-auto`}>{coins[props.coin] ? coins[props.coin].name + ` (${props.coin})` : props.coin}</h1>
        <h2 class={tw`text-3xl mt-1  dark:text-white text-center max-w-md mx-auto`}>{props.domain.includes(".") ? props.domain.toLowerCase() : props.domain.toLowerCase() + "/"}</h2>
    </div>
)