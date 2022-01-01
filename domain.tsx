/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, tw } from "./deps.ts";
import { coins } from "./coins.ts";
import { style } from "./style.ts";
import { Head } from "./head.tsx";

export const Domain = ({ domain, wallets}: {domain: string, wallets: string[]}) => (
    <div>
        <style>
            {style}
        </style>
        <Head />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content={`Send ${wallets.slice(0, 3).join(", ")} to ${domain.includes(".") ? domain.toLowerCase() : domain.toLowerCase() + "/"}`} />
        <meta name="twitter:url" content={"/" + domain} />
        <meta name="twitter:title" content={"hiphip.tips | " + (domain.includes(".") ? domain.toLowerCase() : domain.toLowerCase() + "/")} />
        <meta name="twitter:image" content="/static/favicon/apple-icon.png" />
        <meta content="#34D399" data-react-helmet="true" name="theme-color" />
        <div class={tw`py-2 flex-col justify-between mx-auto px-4 dark:text-white`}>
            <div class={tw`mb-2`}>
                <a href="/" class={tw`px-4 text-xl`}>
                    <span>🏠 hiphip.tips</span>
                </a>
            </div>
        </div>
        
        <h1 class={tw`text-4xl md:text-5xl dark:text-white text-center mt-4 break-all max-w-3xl mx-auto`}>{domain.includes(".") ? domain.toLowerCase() : domain.toLowerCase() + "/"}</h1>
        
        <div class={tw`grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mx-auto max-w-xs md:max-w-md`}>
            {wallets.map((ticker: string) => (
                
                <a href={"/" + domain + "/" + ticker}>
                    
                    <div class={tw`rounded-lg dark:text-white dark:border-white border-black border-2 p-2 text-center flex justify-center md:justify-start transition-transform transform-gpu md:motion-safe:hover:scale-105 motion-safe:active:scale-95`}>

                        {coin(ticker) ? <img src={"/static/coins/" + ticker + ".webp"} alt="" class={tw`w-8 h-8`} /> : <img src="/static/unknown.png" alt="" class={tw`w-8 h-8`} />}


                        <span class={tw`mt-0.5 ml-2 text-xl`}>{coin(ticker) ? coin(ticker).name : ticker}</span>

                    </div>
                </a>

            ))}
        </div>
    </div>
);

const coin = (ticker: string) => { return coins[ticker] };