'use server'

interface StocksData {
    id: number;
    ticker: string;
    companyId: number;
    companyName: string;
    lastPrice: number;
    variationOneDay: number;
    sector: string;
}

export async function getStocksByTicker(ticker: string): Promise<StocksData[] | null> {
    try {
        const response = await fetch(
            `${process.env.STOCK_API}/api/stocks/search?ticker=${ticker}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}