
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
    return (
        <main className="flex flex-col md:grid md:grid-cols-2 gap-6">
            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <p className="text-xl">Dividend Yield</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="rounded-2xl p-4 flex flex-col gap-9">
                            <Skeleton className="w-full h-7 font-semibold" />
                            <Skeleton className="w-full h-8 font-semibold flex justify-end" />
                        </Card>

                        <Card className="rounded-2xl p-4 flex flex-col gap-9">
                            <Skeleton className="w-full h-7 font-semibold" />
                            <Skeleton className="w-full h-8 font-semibold flex justify-end" />
                        </Card>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-xl">Meses de Pagamento</p>
                    <Skeleton className="w-full h-56 flex justify-center" />
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <p className="text-xl">Proventos Pagos</p>
                <div className="flex flex-col h-full gap-4">
                    <Skeleton className="flex flex-grow md:overflow-hidden" />

                    <div className="grid grid-cols-2 gap-4">
                        <Card className="rounded-2xl p-4 flex flex-col gap-9">
                            <Skeleton className="w-full h-7 font-semibold" />
                            <Skeleton className="w-full h-8 font-semibold flex justify-end" />
                        </Card>

                        <Card className="rounded-2xl p-4 flex flex-col gap-9">
                            <Skeleton className="w-full h-7 font-semibold" />
                            <Skeleton className="w-full h-8 font-semibold flex justify-end" />
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    )
}
