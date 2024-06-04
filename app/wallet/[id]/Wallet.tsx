'use client'

import { DataTable } from "@/components/DataTable/DataTable";
import { DoughnutChart } from "@/components/DoughnutChart/DoughnutChart";
import Formatter from "@/utils/formatter";
import { ColumnDef } from "@tanstack/react-table";
import { MoveDown, MoveUp } from "lucide-react";

interface WalletItem {
    ticker: string,
    amount: number,
    avgPrice: number,
    variation: number
}

interface WalletProps {
    stocks: WalletItem[],
    totalValue: number,
    variation: number
}

export function Wallet({
    totalValue,
    variation,
    stocks,
}: WalletProps) {
    function handleChartData() {
        const tickers = stocks.map(item => item.ticker);
        const amounts = stocks.map(item => item.amount);
        const totalStocks = amounts.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
        );

        return { tickers, amounts, totalStocks };
    }

    const { tickers, amounts, totalStocks } = handleChartData();

    const header: ColumnDef<unknown>[] = [
        {
            accessorKey: "ticker",
            header: 'Ação',
        },
        {
            accessorKey: "avgPrice",
            header: 'Preço Médio',
            cell: ({ row }) => (
                <div className="">{Formatter.currency(parseFloat(row.getValue("avgPrice")))}</div>
            ),
        },
        {
            accessorKey: "amount",
            header: 'Quantidade',
        },
        {
            accessorKey: "variation",
            header: 'Rendimento',
            cell: ({ row }) => {
                const variation = parseFloat(row.getValue("variation")) * 100
                return (
                    <span className={`flex items-center ${variation > 0 ? 'text-teal-400' : 'text-amber-500'}`}>
                        {variation > 0 ? <MoveUp className="w-4 h-4" /> : <MoveDown className="w-4 h-4" />}
                        {Formatter.percentage(Math.abs(variation))}
                    </span>
                )
            }
        },
        // {
        //     accessorKey: "dividends",
        //     header: 'Proventos',
        // }
    ]

    function renderWalletItems() {
        if (!stocks.length) {
            return <div>Parece que voce nao possui nenhum lançamento nessa carteira</div>
        }

        return <DataTable columns={header} data={stocks} pageSize={6} />
    }

    function walletChartLabelFunc(context: any) {
        return Formatter.percentage((context.parsed / totalStocks)*100);
    }

    return (
        stocks.length ? <main className="flex flex-col md:flex-row gap-6 w-full">
            <section className="flex flex-col gap-6">
                <div className="flex justify-between">
                    <p className="text-2xl font-semibold flex justify-start">
                        {Formatter.currency(totalValue)}
                    </p>
                    <span className={`flex items-center text-2xl font-semibold ${variation > 0 ? 'text-teal-400' : 'text-amber-500'}`}>
                        {variation > 0 ? <MoveUp className="w-4 h-4" /> : <MoveDown className="w-4 h-4" />}
                        {Formatter.percentage(Math.abs(variation * 100))}
                    </span>
                </div>
                <div className="w-full h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 flex justify-center">
                    <DoughnutChart
                        data={amounts}
                        labels={tickers}
                        showLegend={false}
                        labelFunc={walletChartLabelFunc}
                    />
                </div>
            </section>

            <section className="w-full">
                {renderWalletItems()}
            </section>
        </main> : <div>Parece que você não possui nenhum lançamento nessa carteira</div>
    )
}
