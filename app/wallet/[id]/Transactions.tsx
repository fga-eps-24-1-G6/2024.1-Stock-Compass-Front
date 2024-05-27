'use client'

import React from "react";
import { DataTable } from "../../../components/DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, SquarePenIcon, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function Transactions() {
    const header: ColumnDef<unknown>[] = [
        {
            accessorKey: "operation",
            header: 'Operação',
            cell: ({ row }) => (
                <div className="text-teal-400 uppercase">{row.getValue("operation")}</div>
            ),
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
        },
        {
            accessorKey: "amount",
            header: 'Quantidade',
        },
        {
            accessorKey: "date",
            header: 'Data da operação',
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const transaction = row.original

                return (
                    <Dialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DialogTrigger asChild>

                                    <DropdownMenuItem
                                        onClick={() => { }}
                                        className="flex gap-2"
                                    >
                                        <SquarePenIcon className="w-4 h-4" />
                                        Editar lançamento
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DropdownMenuItem
                                    onClick={() => { }}
                                    className="flex gap-2 text-rose-500"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Deletar lançamento
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Editar carteira</DialogTitle>
                                <DialogDescription>
                                    Altere as informções da sua carteira aqui
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-4 items-center gap-4 py-4">
                                <Label htmlFor="name" className="text-right">
                                    Nome
                                </Label>
                                <Input
                                    id="name"
                                    defaultValue="Pedro Duarte"
                                    className="col-span-3"
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit">Salvar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )
            },
        },
    ]

    const data = [
        {
            operation: "compra",
            stock: 'TAEE11',
            amount: "58",
            price: 'R$ 34,56',
            date: "13/11/2023",
        },
        {
            operation: "compra",
            stock: 'TAEE11',
            amount: "58",
            price: 'R$ 34,56',
            date: "13/11/2023",
        },
        {
            operation: "compra",
            stock: 'TAEE11',
            amount: "58",
            price: 'R$ 34,56',
            date: "13/11/2023",
        },
        {
            operation: "compra",
            stock: 'TAEE11',
            amount: "58",
            price: 'R$ 34,56',
            date: "13/11/2023",
        },
        {
            operation: "compra",
            stock: 'TAEE11',
            amount: "58",
            price: 'R$ 34,56',
            date: "13/11/2023",
        },
        {
            operation: "compra",
            stock: 'TAEE11',
            amount: "58",
            price: 'R$ 34,56',
            date: "13/11/2023",
        },
        {
            operation: "compra",
            stock: 'TAEE11',
            amount: "58",
            price: 'R$ 34,56',
            date: "13/11/2023",
        }
    ]
    return (
        <div className="w-full">
            <DataTable columns={header} data={data} />
        </div>
    )
}