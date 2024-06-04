'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createWallet } from "../actions";
import { useRouter } from "next/navigation";

interface NewWalletProps {
    userId: string
}

export function NewWallet({ userId }: NewWalletProps) {
    const [name, setName] = useState('Carteira 1');
    const router = useRouter();

    async function handleSubmit() {
        await createWallet({
            externalId: userId,
            name
        });

        router.refresh();
    }

    return (
        <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Nova carteira
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Criar carteira</DialogTitle>
                        <DialogDescription>
                            Adicione as informções da sua carteira aqui
                        </DialogDescription>
                    </DialogHeader>

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
        </Dialog>
    )
}