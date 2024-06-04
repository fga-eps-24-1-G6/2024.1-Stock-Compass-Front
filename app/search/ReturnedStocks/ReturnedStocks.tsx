'use client'

import Formatter from "@/utils/formatter";
import { Card } from "../../../components/ui/card";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

interface StocksData {
  id: number;
  ticker: string;
  companyId: number;
  companyName: string;
  lastPrice: number;
  variationOneDay: number;
  sector: string;
}

export default function ReturnedStocks({ stocks }: { stocks: StocksData[] | null }) {
  function handleCompanyThumb(name: string) {
    if (!name) return '';

    return name.slice(0, 2).toUpperCase();
  }

  return stocks?.map((item, index) => (
    <Link key={index} href={`/stocks/${item.ticker.toLowerCase()}`}>
      <Card key={index} className="flex items-center p-6 rounded-2xl gap-4 hover:bg-muted">
        <div className="w-10 h-10 rounded-full bg-slate-700 flex justify-center items-center p-4 text-slate-300">
          {handleCompanyThumb(item.companyName)}
        </div>
        <div className="flex flex-grow flex-col">
          <div className="flex justify-between text-xl font-semibold">
            <p>{item.ticker}</p>
            <p>{Formatter.currency(item.lastPrice)}</p>
          </div>

          <div className="flex justify-between text-base">
            <p className="text-muted-foreground">{item.companyName}</p>

            <div className="flex justify-center items-center">
              <ArrowUp className="h-4 w-4 text-teal-400" />
              <p className="text-teal-400">{Formatter.percentage(item.variationOneDay)}</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  ));
}
