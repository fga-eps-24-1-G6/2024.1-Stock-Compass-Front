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

export async function getStocksBySector(sector: string, category: string): Promise<StocksData[] | null> {
    try {
        const response = await fetch(
            `${process.env.STOCK_API}/api/stocks/search?category=${category}&sector=${sector}`
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

interface Wallet {
    id: string,
    name: string,
    externalId: string
}

interface CreateWallet {
    name: string,
    externalId: string
}

export async function createWallet({ externalId, name }: CreateWallet): Promise<Wallet | null> {
    try {
        const response = await fetch(
            `${process.env.WALLET_API}/api/wallets/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                externalId,
                name
            })
        }
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

interface UpdateWallet {
    walletId: number,
    name: string
}

export async function updateWallet({ walletId, name }: UpdateWallet): Promise<Wallet | null> {
    try {
        const response = await fetch(
            `${process.env.WALLET_API}/api/wallets/update/${walletId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name
            })
        }
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

export async function deleteWallet(walletId: number) {
    try {
        const response = await fetch(
            `${process.env.WALLET_API}/api/wallets/delete/${walletId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

interface CreateTransaction {
    walletId: number,
    ticker: string,
    price: number,
    date: string,
    amount: number,
    operation: string
}

interface Transaction {
    id: number,
    stocks: {
        ticker: string,
    },
    price: number,
    date: string,
    amount: number,
    operation: string
}

export async function createTransaction({
    walletId,
    ticker,
    price,
    date,
    amount,
    operation
}: CreateTransaction): Promise<Transaction | null> {
    try {
        const response = await fetch(
            `${process.env.WALLET_API}/api/transactions/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                walletId,
                ticker,
                price,
                date,
                amount,
                operation
            })
        }
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

interface UpdateTransaction {
    transactionId: number,
    walletId: number,
    ticker: string,
    price: number,
    date: string,
    amount: number,
    operation: string
}

export async function updateTransaction({
    transactionId,
    walletId,
    ticker,
    price,
    date,
    amount,
    operation
}: UpdateTransaction): Promise<Transaction | null> {
    try {
        const response = await fetch(
            `${process.env.WALLET_API}/api/transactions/update/${transactionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                walletId,
                ticker,
                price,
                date,
                amount,
                operation
            })
        }
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

export async function deleteTransaction(transactionId: number) {
    try {
        const response = await fetch(
            `${process.env.WALLET_API}/api/transactions/delete/${transactionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
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