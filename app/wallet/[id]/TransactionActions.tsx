'use client'

import React, { useState } from "react";
import { Calendar as CalendarIcon, MoreHorizontal, SquarePenIcon, Trash2 } from "lucide-react";
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { deleteTransaction, updateTransaction } from "@/app/actions";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface TransactionActionsProps {
    walletId: number,
    transactionId: number,
    currentOperation: string,
    currentDate: string,
    currentStock: string,
    currentPrice: number,
    currentAmount: number
}

export function TransactionActions({
    transactionId,
    walletId,
    currentOperation,
    currentDate,
    currentStock,
    currentPrice,
    currentAmount
}: TransactionActionsProps) {
    const [operation, setOperation] = useState(currentOperation);
    const [stock, setStock] = useState(currentStock);
    const [price, setPrice] = useState(currentPrice);
    const [amount, setAmount] = useState(currentAmount);
    const [date, setDate] = useState<Date>()
    const router = useRouter();

    async function handleDelete() {
        await deleteTransaction(transactionId);

        router.refresh();
    }

    async function handleUpdate() {
        await updateTransaction({
            walletId,
            transactionId,
            ticker: stock,
            price,
            date: date?.toISOString() || '',
            amount,
            operation
        });

        router.refresh();
    }

    function isDisabled() {
        return !(!!date && !!price && !!amount && !!operation && !!stock)
    }

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

                        <DropdownMenuItem className="flex gap-2 cursor-pointer">
                            <SquarePenIcon className="w-4 h-4" />
                            Editar lançamento
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem className="flex gap-2 text-rose-500 cursor-pointer" onClick={handleDelete}>
                        <Trash2 className="w-4 h-4" />
                        Deletar lançamento
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleUpdate}>
                    <DialogHeader>
                        <DialogTitle>Editar Lançamento</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-2 items-center gap-6 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="price">
                                Operação
                            </Label>
                            <Select onValueChange={(e) => setOperation(e)} defaultValue={operation}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" defaultValue="COMPRA" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="COMPRA">COMPRA</SelectItem>
                                        <SelectItem value="VENDA">VENDA</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="stock">
                                Ativo
                            </Label>
                            <Input
                                id="stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="price">
                                Preço
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="amount">
                                Quantidade
                            </Label>
                            <Input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(parseInt(e.target.value))}
                            />
                        </div>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "justify-start text-left font-normal col-span-2",
                                        !date && "text-muted-foreground col-span-2"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isDisabled()}
                        >
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}