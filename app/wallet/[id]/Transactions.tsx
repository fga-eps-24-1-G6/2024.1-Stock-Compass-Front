'use client'

import React, { useState } from "react";
import { DataTable } from "../../../components/DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import Formatter from "@/utils/formatter";
import { TransactionActions } from "./TransactionActions";

interface TransactionsProps {
    walletId: number,
    transactions: {
        id: number,
        stocks: {
            ticker: string,
        },
        price: number,
        date: string,
        amount: number,
        operation: string
    }[]
}

interface TransactionRow {
    id: number,
    stock: string,
    price: number,
    date: string,
    amount: number,
    operation: string
}

export function Transactions({ walletId, transactions }: TransactionsProps) {
    const [data, setData] = useState(
        transactions
            .map(item => ({
                ...item,
                stock: item.stocks.ticker,
            }))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );

    const header: ColumnDef<TransactionRow>[] = [
        {
            accessorKey: "operation",
            header: 'Operação',
            cell: ({ row }) => {
                const color = row.getValue("operation") == 'COMPRA' ? 'text-teal-400' : 'text-amber-500'
                return (
                    <div className={`${color} uppercase`}>{row.getValue("operation")}</div>
                )
            },
        },
        {
            accessorKey: "stock",
            header: 'Ação',
            cell: ({ row }) => (
                <div className="uppercase">{row.getValue("stock")}</div>
            ),
        },
        {
            accessorKey: "price",
            header: 'Preço',
            cell: ({ row }) => (
                <div className="">{Formatter.currency(parseFloat(row.getValue("price")))}</div>
            ),
        },
        {
            accessorKey: "amount",
            header: 'Quantidade',
        },
        {
            accessorKey: "date",
            header: 'Data da operação',
            cell: ({ row }) => (
                <div className="">{Formatter.dateFromISO(row.getValue("date"))}</div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const transaction = row.original;

                return <TransactionActions
                    walletId={walletId}
                    transactionId={transaction.id}
                    currentOperation={transaction.operation}
                    currentDate={transaction.date}
                    currentStock={transaction.stock}
                    currentPrice={transaction.price}
                    currentAmount={transaction.amount}
                />
            },
        },
    ]

    return (
        <div className="w-full">
            <DataTable columns={header} data={data} />
        </div>
    )
}