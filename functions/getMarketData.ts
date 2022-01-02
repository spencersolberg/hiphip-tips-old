export const getMarketData = async (id: string): Promise<{price: number, percent: number, increased: boolean}> => {
    let price;
    let firstPrice;
    let increased;
    let percent;
    const response = await fetch("https://api.coingecko.com/api/v3/coins/" + id + "/market_chart?vs_currency=usd&days=1");
    const data = await response.json();

    price = data.prices[data.prices.length - 1][1];
    firstPrice = data.prices[0][1];
    increased = price > firstPrice;
    percent = ((increased ? price / firstPrice : firstPrice / price) - 1) * 100;

    return {price, percent, increased};
}