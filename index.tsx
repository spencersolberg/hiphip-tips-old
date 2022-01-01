/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, tw } from "./deps.ts";
import { style } from "./style.ts";
import { Head } from "./head.tsx";

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
        <Head />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="/" />
        <meta name="twitter:title" content="hiphip.tips" />
        <meta name="twitter:description" content="Tip crypto to any HIP-0002 domain" />
        <meta name="twitter:image" content="/static/favicon/apple-icon.png" />
        <meta content="#34D399" data-react-helmet="true" name="theme-color" />

        <h1 class={tw`text-6xl md:text-8xl dark:text-white text-center mt-4 mb-8 mt-20 break-all max-w-3xl mx-auto`}>hiphip.tips</h1>
        <div class={tw`max-w-sm mx-auto px-2`}>
            <input onkeyup={onKeyUp} id="domain-input" class={tw`rounded-md w-full text-2xl px-4 pb-1 pt-0.5 text-center border-2 border-black`} type="text" placeholder="yourdomain.com" autocomplete="off" autocorrect="off" spellcheck="false" autocapitalize="none"></input>
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

