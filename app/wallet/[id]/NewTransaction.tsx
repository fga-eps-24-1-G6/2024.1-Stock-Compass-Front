'use client'

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createTransaction } from "@/app/actions"

interface NewTransactionProps {
    walletId: number
}

export function NewTransaction({ walletId }: NewTransactionProps) {
    const [operation, setOperation] = useState('COMPRA');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState<Date>()
    const router = useRouter();

    async function handleSubmit() {
        await createTransaction({
            walletId,
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
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Novo Lançamento
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Adicionar Lançamento</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-2 items-center gap-6 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="price">Operação</Label>

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
                            <Label htmlFor="stock">Ativo</Label>
                            <Input id="stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="price">Preço</Label>
                            <Input id="price" type="number" value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="amount">Quantidade</Label>
                            <Input id="amount"
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
                        <Button type="submit" disabled={isDisabled()}>Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}