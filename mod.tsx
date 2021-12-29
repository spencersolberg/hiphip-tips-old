/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, serve, ssr } from "./deps.ts";
import { Index } from "./index.tsx";
import { Domain } from "./domain.tsx";
import { Pay } from "./pay.tsx";
import { qr } from "./qr.ts";
import { getWallets } from "./functions/getWallets.ts";
import { getAddress } from "./functions/getAddress.ts";

console.log("Listening on http://localhost:8000");
serve(async (req) => {
    const url = new URL(req.url);
    const path = url.pathname;

    console.log("GET " + path);

    if (path == "/favicon.ico") return new Response(null);
    if (path == "/.well-known/wallets" || path == "/.well-known/wallets/") return new Response("BTC,BTCLN,HNS");
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

    if (pathArr.length == 3 && pathArr[2].toLowerCase() == "qr") {
        return qr(pathArr[1], await getAddress(pathArr[0], pathArr[1]));
    }

    if (pathArr.length == 2) {
        const domain = pathArr[0];
        const coin = pathArr[1];
        const address = await getAddress(domain, coin);
        return ssr(() => <Pay domain={domain} coin={coin} address={address}/>);
    }

    if (path.toLowerCase() == "/hiphip.tips" || path.toLowerCase() == "/hiphip.tips/") {
        return ssr(() => <Domain domain="hiphip.tips" wallets={["BTC","BTCLN", "HNS"]} />);
    }

    const domain = path.replace("/", "");
    const wallets = await getWallets(domain);
    // const wallets = ["BTC", "HNS", "ETH"];
    return ssr(() => <Domain domain={domain} wallets={wallets}/>);

})