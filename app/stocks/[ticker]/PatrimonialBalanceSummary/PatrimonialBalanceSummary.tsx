
  async function getPatrimonialBalanceSummary(ticker: string) {
    return [
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
      {
        indicator: "Item",
      },
    ];
  }
  
  interface PatrimonialBalanceSummaryProps {
    ticker: string;
  }
  
  export default async function PatrimonialBalanceSummary({
    ticker,
  }: Readonly<PatrimonialBalanceSummaryProps>) {
    const patrimonialBalanceSummary = await getPatrimonialBalanceSummary(ticker);
  
    return patrimonialBalanceSummary.map((item, index) => (
      <div
        key={index + item.indicator}
        className="flex flex-col p-4 gap-12 rounded-2xl"
      >
        <h1 className="text-sm font-semibold ">{item.indicator}</h1>
      </div>
    ));
  }
  