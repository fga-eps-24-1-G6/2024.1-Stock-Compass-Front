import SingleColumn from "@/components/templates/SingleColumn"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Wallet } from "./Wallet/Wallet";
import { MonthlyDividends } from "./MonthlyDividends/MonthlyDividends";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

function SectionCard({ children, id }: { children: React.ReactNode, id?: string }) {
    return (
        <Card className="w-full rounded-3xl" id={id}>
            {children}
        </Card>
    )
};

export default async function WalletPage({ params }: any) {
    return (
        <SingleColumn>
            <div className="w-full sm:w-40 static xl:absolute top-0 right-8 flex flex-col gap-2">
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a fruit" defaultValue="banana" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Carteira</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button variant="outline" className="w-full">
                    Nova Carteira
                </Button>
            </div>
            <SectionCard>
                <CardHeader>
                    <CardTitle>Carteira 1</CardTitle>
                </CardHeader>

                <CardContent>
                    <Wallet id={""} />
                </CardContent>
            </SectionCard>
            <SectionCard>
                <Tabs defaultValue="profitability">
                    <CardHeader>
                        <TabsList className="flex overflow-scroll justify-start sm:grid sm:grid-cols-3 sm:overflow-hidden">
                            <TabsTrigger value="profitability">
                                Rentabilidade
                            </TabsTrigger>
                            <TabsTrigger value="transactions">
                                Lançamentos
                            </TabsTrigger>
                            <TabsTrigger value="dividends">
                                Proventos
                            </TabsTrigger>
                        </TabsList>
                    </CardHeader>
                    <TabsContent value="profitability">
                        <CardContent className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between">
                            Profitablity
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="transactions">
                        <CardContent className="grid grid-cols-2">
                            Transactions
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="dividends">
                        <CardContent>
                            <MonthlyDividends id={""} />
                        </CardContent>
                    </TabsContent>
                </Tabs>
            </SectionCard>
        </SingleColumn>

    )
}