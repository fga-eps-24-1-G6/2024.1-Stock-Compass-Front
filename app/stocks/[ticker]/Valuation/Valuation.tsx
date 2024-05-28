import { DescriptionMark } from "@/components/DescriptionMark/DescriptionMark";
import { ErrorAlert } from "@/components/ErrorAlert/ErrorAlert";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import Formatter from "@/utils/formatter";
import { TriangleAlert } from "lucide-react";

async function getValuation(ticker: string) {
    try {
        const response = await fetch(`${process.env.STOCK_API}/api/stocks/valuation/${ticker}`);
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

interface ValuationProps {
    ticker: string
};

export default async function Valuation({ ticker }: Readonly<ValuationProps>) {
    const data = await getValuation(ticker);
    const valuationData = [
        data.targetPriceResponse,
        data.ceilingPriceResponse
    ];

    function renderValuationPrices() {
        return valuationData.map((item, index) => (
            <Card key={index + item.lable} className="flex flex-col gap-4 p-4 rounded-2xl w-full flex-grow">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-lg font-semibold">{item.method}</h1>
                    <DescriptionMark />
                </div>
                <p className="text-2xl font-semibold w-full flex justify-end">
                    {Formatter.currency(item.value)}
                </p>
            </Card>
        ));
    }

    return (
        data ?
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderValuationPrices()}
                </div>

                <Alert className="text-start">
                    <TriangleAlert className="h-4 w-4 text-yellow-400" />
                    <AlertTitle>Atenção!</AlertTitle>
                    <AlertDescription>
                        Isso não é uma recomendação de compra/venda, os valores acima são apenas
                        representações didáticas de fórmulas amplamente utilizadas no mercado
                    </AlertDescription>
                </Alert>
            </div> :
            <ErrorAlert />
    )
}