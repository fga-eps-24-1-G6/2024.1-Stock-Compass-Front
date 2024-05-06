import Link from "next/link";
import SingleColumn from "@/components/templates/SingleColumn"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stockss } from "./Stocks/Stocks";
import { Info } from "./Info/Info";

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
            <SectionCard>
                <CardHeader>
                <CardTitle>Carteira 1</CardTitle>               
                </CardHeader>

                <CardContent className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between">
                <Info ticker={""}></Info>
                </CardContent>
            </SectionCard>
            <SectionCard>
                <CardHeader>
                <Tabs defaultValue="company" className="hidden md:block sticky top-0">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="company">
                        <Link href="#empresa">
                            Rentabilidade
                        </Link>
                    </TabsTrigger>
                    <TabsTrigger value="indicators">
                        <Link href="#indicadores">
                            Lançamentos
                        </Link>
                    </TabsTrigger>
                    <TabsTrigger value="dividends">
                        <Link href="#dividendos">
                            Proventos
                        </Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
                </CardHeader>

                <CardContent className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between">
                    <Stockss ticker={""}></Stockss>
                </CardContent>
            </SectionCard>
        </SingleColumn>

    )
}