import SingleColumn from "@/components/templates/SingleColumn"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Wallet } from "./Wallet";
import { MonthlyDividends } from "./MonthlyDividends";
import { Profitability } from "./Profitability";
import { Transactions } from "./Transactions";
import { WalletActions } from "./WalletActions";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

function SectionCard({ children, id }: { children: React.ReactNode, id?: string }) {
    return (
        <Card className="w-full rounded-3xl" id={id}>
            {children}
        </Card>
    )
};

export default async function WalletPage({ params }: any) {
    return (
        <SingleColumn className="relative">
            <div className="w-full sm:w-40 static xl:absolute top-0 right-0 flex flex-col gap-2">
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a fruit" defaultValue="banana" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Suas Carteiras</SelectLabel>
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
                <CardHeader className="flex-row w-full justify-between items-center">
                    <CardTitle>Carteira 1</CardTitle>
                    <WalletActions />
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
                        <CardContent className="h-80">
                            <Profitability id="" />
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="transactions">
                        <CardContent className="flex flex-col gap-6 items-end">
                            <Button className="w-40">
                                Novo Lançamento
                            </Button>
                            <Transactions />
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="dividends">
                        <CardContent className="h-80">
                            <MonthlyDividends id={""} />
                        </CardContent>
                    </TabsContent>
                </Tabs>
            </SectionCard>
        </SingleColumn>
    )
}