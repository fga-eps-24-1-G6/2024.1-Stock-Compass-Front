import { IconBadge, badgeVariant } from "../../../../components/IconBadge/IconBadge";
import { Card } from "../../../../components/ui/card";

async function getIndicatorsSummary(ticker: string) {
    return [
        {
            indicator: "P/L",
            value: "5.0"
        },
        {
            indicator: "P/VP",
            value: "0.95"
        },
        {
            indicator: "DIV YIELD",
            value: "5.0%"
        },
        {
            indicator: "PAYOUT",
            value: "5.0%"
        },
        {
            indicator: "MARGEM LÍQ",
            value: "5.0%"
        },
        {
            indicator: "MARGEM BRUTA",
            value: "5.0%"
        },
        {
            indicator: "MARGEM EBIT",
            value: "5.0%"
        },
        {
            indicator: "EV/EBIT",
            value: "5.0"
        },
        {
            indicator: "EV/EBITDA",
            value: "5.0"
        },
        {
            indicator: "VPA",
            value: "5.0"
        },
        {
            indicator: "LPA",
            value: "5.0"
        },
        {
            indicator: "ROE",
            value: "5.0%"
        },
        {
            indicator: "ROIC",
            value: "5.0%"
        },
        {
            indicator: "ROA",
            value: "5.0%"
        },
        {
            indicator: "CAGR LUCRO",
            value: "5.0%"
        },
        {
            indicator: "CAGR REC",
            value: "5.0%"
        },
        {
            indicator: "DÍV LÍQ/PAT LÍQ",
            value: "5.0"
        },
        {
            indicator: "DÍV LÍQ/EBIT",
            value: "5.0"
        }
    ];
}

interface IndicatorsSummaryProps {
    ticker: string
};

export default async function IndicatorsSummary({ ticker }: Readonly<IndicatorsSummaryProps>) {
    const indicatorsSummary = await getIndicatorsSummary(ticker);

    return indicatorsSummary.map((item, index) => (
        <Card key={index + item.indicator} className="flex flex-col gap-2 p-5 rounded-2xl w-32">
            <div>
                <h1 className="text-xs font-semibold">{item.indicator}</h1>
                <h3 className="text-sm font-semibold text-teal-400 w-full flex justify-end">{item.value}</h3>
            </div>
        </Card>
    ))
}