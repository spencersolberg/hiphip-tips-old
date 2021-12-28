/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, serve, ssr } from "./deps.ts";
import { Index } from "./index.tsx";
import { Domain } from "./domain.tsx";
import { Pay } from "./pay.tsx";
import { getWallets } from "./functions/getWallets.ts";

console.log("Listening on http://localhost:8000");
serve(async (req) => {
    const url = new URL(req.url);
    const path = url.pathname;

    console.log("GET " + path);

    if (path == "/favicon.ico") return new Response(null);
    if (path == "/.well-known/wallets" || path == "/.well-known/wallets/") return new Response("BTC,DOGE,ETH,HNS,MOON,STX,TRTL,XMR,XNO,XTZ");
    if (path.startsWith("/.well-known/wallets/")) {
        const ticker = path.replace("/.well-known/wallets/", "").replace("/", "");
        const file = await Deno.readFile("./static/wallets/" + ticker);
        return new Response(file);
    }
    if (path.startsWith("/static/")) {
        const fileName = path.replace("/static/", "");
        const file = await Deno.readFile("./static/" + fileName);
        return new Response(file);
    }

    if (path == "/") {
        return ssr(() => <Index />); 
    }

    const pathArr = path.split("/").filter(e => e !== "");

    if (pathArr.length == 2) {
        return ssr(() => <Pay domain={pathArr[0]} coin={pathArr[1]}/>);
    }

    if (path.toLowerCase() == "/hiphip.tips" || path.toLowerCase() == "/hiphip.tips/") {
        return ssr(() => <Domain domain="hiphip.tips" wallets={["BTC","DOGE","ETH","HNS","MOON","STX","TRTL","XMR","XNO","XTZ"]} />);
    }

    const domain = path.replace("/", "");
    const wallets = await getWallets(domain);
    // const wallets = ["BTC", "HNS", "ETH"];
    return ssr(() => <Domain domain={domain} wallets={wallets}/>);

})