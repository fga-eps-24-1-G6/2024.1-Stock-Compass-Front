
async function getBalanceSheetSummary(ticker: string) {
  return Array.from({ length: 24 }).map((_) => (
    {
      indicator: "Item",
    }
  ));
}

interface BalanceSheetSummaryProps {
  ticker: string;
}

export default async function BalanceSheetSummary({
  ticker,
}: Readonly<BalanceSheetSummaryProps>) {
  const balanceSheetsSummary = await getBalanceSheetSummary(ticker);

  return balanceSheetsSummary.map((item, index) => (
    <div
      key={index + item.indicator}
      className="flex flex-col p-4 gap-12 rounded-2xl"
    >
      <h1 className="text-sm font-semibold ">{item.indicator}</h1>
    </div>
  ));
}
