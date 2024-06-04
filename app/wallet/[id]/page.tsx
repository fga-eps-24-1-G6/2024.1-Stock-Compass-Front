import SingleColumn from "@/components/templates/SingleColumn"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Wallet } from "./Wallet";
import { Transactions } from "./Transactions";
import { ErrorAlert } from "@/components/ErrorAlert/ErrorAlert";
import { NewTransaction } from "./NewTransaction";
import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface WalletData {
    wallet: {
        name: string,
        externalId: string,
        stocks: any[],
        totalValue: number,
        variation: number
    },
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

async function getWalletData(id: string): Promise<WalletData | null> {
    try {
        const response = await fetch(`${process.env.WALLET_API}/api/transactions/get/wallet/${id}`);
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

function SectionCard({ children, id }: { children: React.ReactNode, id?: string }) {
    return (
        <Card className="w-full rounded-3xl" id={id}>
            {children}
        </Card>
    )
};

export default async function WalletPage({ params }: any) {
    const user = await currentUser();
    const data = await getWalletData(params.id);

    if (user && user.id != data?.wallet.externalId) redirect('/wallets');

    return (
        data ?
            <SingleColumn className="relative">
                <SectionCard>
                    <CardHeader className="w-full">
                        <CardTitle>{data.wallet.name}</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Suspense>
                            <Wallet
                                stocks={data.wallet.stocks}
                                totalValue={data.wallet.totalValue}
                                variation={data.wallet.variation}
                            />
                        </Suspense>
                    </CardContent>
                </SectionCard>
                <SectionCard>
                    <Tabs defaultValue="transactions">
                        <CardHeader>
                            <TabsList className="flex overflow-scroll justify-start sm:grid sm:grid-cols-3 sm:overflow-hidden">
                                <TabsTrigger value="transactions">
                                    Lançamentos
                                </TabsTrigger>
                            </TabsList>
                        </CardHeader>
                        <TabsContent value="transactions">
                            <CardContent className="flex flex-col gap-6 items-end">
                                <NewTransaction walletId={params.id} />

                                <Suspense>
                                    {
                                        !!data.transactions.length &&
                                        <Transactions transactions={JSON.parse(JSON.stringify(data.transactions))} walletId={params.id} />
                                    }
                                </Suspense>
                            </CardContent>
                        </TabsContent>
                    </Tabs>
                </SectionCard>
            </SingleColumn> :
            <ErrorAlert />
    )
}