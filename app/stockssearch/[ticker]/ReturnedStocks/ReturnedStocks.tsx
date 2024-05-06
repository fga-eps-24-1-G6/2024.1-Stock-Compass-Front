import { Card } from "../../../../components/ui/card";
import { ArrowUp } from "lucide-react";
async function getCompanySummary(ticker: string) {
  return [
    {
      lable: "Banco do Brasil",
      name: "BBAS3",
      value: "R$ 33.70",
      performance: "8.7%",
    },
    {
      lable: "Banco do Brasil",
      name: "BBAS3",
      value: "R$ 33.70",
      performance: "8.7%",
    },
    {
      lable: "Banco do Brasil",
      name: "BBAS3",
      value: "R$ 33.70",
      performance: "8.7%",
    },
    {
      lable: "Banco do Brasil",
      name: "BBAS3",
      value: "R$ 33.70",
      performance: "8.7%",
    },
    {
      lable: "Banco do Brasil",
      name: "BBAS3",
      value: "R$ 33.70",
      performance: "8.7%",
    },
  ];
}

interface CompanySummaryProps {
  ticker: string;
}

export default async function ReturnedStocks({
  ticker,
}: Readonly<CompanySummaryProps>) {
  const companySummary = await getCompanySummary(ticker);

  return companySummary.map((item, index) => (
    <Card key={index + item.lable} className="flex p-6 rounded-2xl gap-4">
      <div className="w-10 h-10 rounded-full bg-slate-400 "></div>
      <div className="flex flex-grow flex-col">
        <div className="flex justify-between gap-20">
          <p>{item.name}</p>
          <p>{item.value}</p>
        </div>
        <div className="flex justify-between gap-20">
          <p className="text-muted">{item.lable}</p>
          <div className="flex flex-row">
            <ArrowUp
              color="rgba(45, 212, 191, 1)"
              className="h-4 w-4"
            ></ArrowUp>
            <p className="text-xs text-teal-400">{item.performance}</p>
          </div>
        </div>
      </div>
    </Card>
  ));
}
