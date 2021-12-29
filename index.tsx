/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, tw } from "./deps.ts";

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
    span, input, button {
        font-family: "Fluro Bold";
    }
    @media (prefers-color-scheme: dark) {
        body {
            background-color: black;
        }
    }
`;

const onMouseUp = `
    const domain = document.getElementById('domain-input').value;
    window.location.assign('/' + domain);
`;
const onKeyUp = `
    if (event.keyCode == 13) {
        const domain = document.getElementById("domain-input").value;
        window.location.assign("/" + domain);
    }
`;

export const Index = () => (
    <div>
        <style>{style}</style>
        <h1 class={tw`text-6xl md:text-8xl dark:text-white text-center mt-4 mb-8 mt-20 break-all max-w-3xl mx-auto`}>hiphip.tips</h1>
        <div class={tw`max-w-sm mx-auto px-2`}>
            <input onkeyup={onKeyUp} id="domain-input" class={tw`rounded-md w-full text-2xl px-4 pb-1 pt-0.5 text-center border-2 border-black`} type="text" placeholder="yourdomain.com" autocomplete="off" autocorrect="off" spellcheck="false"></input>
        </div>
        <div class={tw`max-w-sm mx-auto px-2`}>
            <button
                class={tw`rounded-md w-full text-3xl px-4 pb-1 pt-0.5 text-center border-2 border-black mt-4 bg-green-400 transition-transform transform-gpu md:motion-safe:hover:scale-105 motion-safe:active:scale-95`}
                onmouseup={onMouseUp}
            >
                Go
            </button>
        </div>
    </div>
);

