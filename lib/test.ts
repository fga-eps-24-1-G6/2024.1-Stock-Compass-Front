async function main(ticker: string) {
    const result = await fetch(`${process.env.STOCK_API}/api/stocks/stock-summary/${ticker.toUpperCase()}`);
    console.log(result)
}

main('bbas3');