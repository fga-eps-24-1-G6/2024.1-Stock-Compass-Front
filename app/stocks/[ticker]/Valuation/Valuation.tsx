import { DescriptionMark } from "@/components/DescriptionMark/DescriptionMark";
import { Card } from "@/components/ui/card";
import Formatter from "@/utils/formatter";

async function getValuation(ticker: string) {
    const response = await fetch(`${process.env.STOCK_API}/api/stocks/valuation/${ticker}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
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
    ))
}