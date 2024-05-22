import { DescriptionMark } from "@/components/DescriptionMark/DescriptionMark";
import { Card } from "@/components/ui/card";
import Formatter from "@/utils/formatter";

const formatMap = {
  percentage: [
    'DIV YIELD',
    'PAYOUT',
    'MARGEM LÍQ',
    'MARGEM BRUTA',
    'MARGEM EBIT',
    'ROE',
    'ROIC',
    'ROA',
    'DÍV LÍQ/PAT LÍQ',
    'DÍV LÍQ/EBIT',
    'CAGR LUCRO',
    'CAGR REC'
  ],
  raw: [
    'LPA',
    'P/L',
    'VPA',
    'P/VP',
    'EV/EBIT',
    'EV/EBITDA',
  ]
}

interface Indicator {
  indicator: string,
  value: number
}

async function getIndicatorsSummary(ticker: string): Promise<Indicator[]> {
  const response = await fetch(`${process.env.STOCK_API}/api/stocks/indicators/${ticker.toUpperCase()}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return [...data.indicatorValueResponseList] as Indicator[];
}

interface IndicatorsSummaryProps {
  ticker: string;
}

export default async function IndicatorsSummary({
  ticker,
}: Readonly<IndicatorsSummaryProps>) {
  const indicatorsSummary = await getIndicatorsSummary(ticker);

  function handleIndicator(item: { indicator: string, value: number }) {
    if (formatMap.percentage.includes(item.indicator))
      return Formatter.percentage(item.value);

    return item.value.toFixed(2);
  }

  function renderIndicators() {
    return indicatorsSummary.map((item, index) => (
      <Card
        key={index + item.indicator}
        className="flex flex-col p-4 rounded-2xl justify-between gap-9"
      >
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-sm md:text-lg font-semibold">{item.indicator}</h1>
          <DescriptionMark />
        </div>
        <p className="text-2xl font-semibold text-teal-400 w-full flex justify-end">
          {handleIndicator(item)}
        </p>
      </Card>
    ))
  }


  return renderIndicators();
}
