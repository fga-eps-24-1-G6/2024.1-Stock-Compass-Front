import { Card } from "../../../components/ui/card";
import { ArrowUp } from "lucide-react";
interface StocksData {
  id: number;
  ticker: String;
  companyId: number;
  companyName: String;
  lastPrice: number;
  variationOneDay: number;
  sector: String;
}

async function getReturnedStocks(ticker: string): Promise<StocksData[] | null> {
  try {
    const response = await fetch(
      `${process.env.STOCK_API}/api/stocks/search/${ticker}`
    );
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

interface StocksSearchProps {
  ticker: string;
}

export default async function ReturnedStocks({
  ticker,
}: Readonly<StocksSearchProps>) {
  const data = await getReturnedStocks(ticker);

  return data?.map((item, index) => (
    <Card key={index} className="flex p-6 rounded-2xl gap-4">
      <div className="w-10 h-10 rounded-full bg-slate-400 "></div>
      <div className="flex flex-grow flex-col">
        <div className="flex justify-between gap-20">
          <p>{item.ticker}</p>
          <p>{"R$" + item.lastPrice}</p>
        </div>
        <div className="flex justify-between gap-20">
          <p className="text-muted">{item.companyName}</p>
          <div className="flex flex-row">
            <ArrowUp
              color="rgba(45, 212, 191, 1)"
              className="h-4 w-4"
            ></ArrowUp>
            <p className="text-xs text-teal-400">{item.variationOneDay}</p>
          </div>
        </div>
      </div>
    </Card>
  ));
}
