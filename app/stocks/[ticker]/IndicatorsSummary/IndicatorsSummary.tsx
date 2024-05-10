import { DescriptionMark } from "@/components/DescriptionMark/DescriptionMark";
import { Card } from "../../../../components/ui/card";

async function getIndicatorsSummary(ticker: string) {
  return [
    { indicator: "P/L", value: "3.0", },
    { indicator: "P/VP", value: "0.95", },
    { indicator: "DIV YIELD", value: "5.0%", },
    { indicator: "PAYOUT", value: "65.0%", },
    { indicator: "MARGEM LÍQ", value: "15.0%", },
    { indicator: "MARGEM BRUTA", value: "25.0%", },
    { indicator: "MARGEM EBIT", value: "5.0%", },
    { indicator: "EV/EBIT", value: "5.0", },
    { indicator: "EV/EBITDA", value: "5.1", },
    { indicator: "VPA", value: "4.0", },
    { indicator: "LPA", value: "3.0", },
    { indicator: "ROE", value: "14.0%", },
    { indicator: "ROIC", value: "16.0%", },
    { indicator: "ROA", value: "13.0%", },
    { indicator: "CAGR LUCRO", value: "15.5%", },
    { indicator: "CAGR REC", value: "10.0%", },
    { indicator: "DÍV LÍQ/PAT LÍQ", value: "1.5", },
    { indicator: "DÍV LÍQ/EBIT", value: "2.0", },
  ];
}

interface IndicatorsSummaryProps {
  ticker: string;
}

export default async function IndicatorsSummary({
  ticker,
}: Readonly<IndicatorsSummaryProps>) {
  const indicatorsSummary = await getIndicatorsSummary(ticker);

  return indicatorsSummary.map((item, index) => (
    <Card
      key={index + item.indicator}
      className="flex flex-col p-4 rounded-2xl justify-between gap-9"
    >
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-lg font-semibold">{item.indicator}</h1>
        <DescriptionMark />
      </div>
      <p className="text-2xl font-semibold text-teal-400 w-full flex justify-end">
        {item.value}
      </p>
    </Card>
  ));
}
