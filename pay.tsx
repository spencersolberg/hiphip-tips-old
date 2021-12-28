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

export const Pay = (props: { domain: string, coin: string }) => (
    <div>

        <style>{style}</style>

        <div class={tw`pt-2`}>
            <a href="/" class={tw`px-4 text-md text-black dark:text-white`}>
                🏠 hiphip.tips
            </a>
        </div>

        <h1 class={tw`text-2xl md:text-3xl dark:text-white text-center mt-4 break-all max-w-3xl mx-auto`}>{props.domain.includes(".") ? props.domain.toLowerCase() : props.domain.toLowerCase() + "/"}</h1>

    </div>
)