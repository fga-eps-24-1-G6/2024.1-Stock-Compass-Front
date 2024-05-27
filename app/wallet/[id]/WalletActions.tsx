'use client'

import React from "react";
import { MoreHorizontal, SquarePenIcon, Trash2 } from "lucide-react";
import { Button } from '../../../components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function WalletActions() {
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
}