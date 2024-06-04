'use client'

import React, { useState } from "react";
import { MoreHorizontal, SquarePenIcon, Trash2 } from "lucide-react";
import { Button } from '../../../components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { deleteWallet, updateWallet } from "@/app/actions";
import { useRouter } from "next/navigation";

interface WalletActionsProps {
    walletId: number,
    currentName: string
}

export function WalletActions({ walletId, currentName }: WalletActionsProps) {
    const [name, setName] = useState(currentName);
    const router = useRouter();

    async function handleDelete() {
        await deleteWallet(walletId);

        router.refresh();
    }

    async function handleUpdate() {
        await updateWallet({
            walletId,
            name
        });

        router.refresh();
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
                <DropdownMenuContent align="end" className="z-10" onClick={(e: React.MouseEvent) => { e.stopPropagation() }}>
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>

                    <DialogTrigger asChild>
                        <DropdownMenuItem className="flex gap-2 cursor-pointer">
                            <SquarePenIcon className="w-4 h-4" />
                            Editar carteira
                        </DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuItem className="flex gap-2 text-rose-500 cursor-pointer" onClick={() => { handleDelete() }}>
                        <Trash2 className="w-4 h-4" />
                        Deletar carteira
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


            <DialogContent className="sm:max-w-[425px]" onClick={(e: React.MouseEvent) => { e.stopPropagation() }}>
                <DialogHeader>
                    <DialogTitle>Editar carteira</DialogTitle>
                    <DialogDescription>
                        Altere as informções da sua carteira aqui
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleUpdate}>
                    <div className="grid grid-cols-4 items-center gap-4 py-4">
                        <Label htmlFor="name" className="text-right">
                            Nome da carteira
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}