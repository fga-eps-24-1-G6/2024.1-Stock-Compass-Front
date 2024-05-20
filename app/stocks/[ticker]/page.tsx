import Link from "next/link";
import { Suspense } from "react";
import SingleColumn from "@/components/templates/SingleColumn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoveDown, MoveUp } from "lucide-react";
import CompanySummary from "./CompanySummary/CompanySummary";
import { Loading as CompanySummaryLoading } from "./CompanySummary/Loading";
import { Dividends } from "./Dividends/Dividends";
import { Loading as DividendsLoading } from "./Dividends/Loading";
import IndicatorsSummary from "./IndicatorsSummary/IndicatorsSummary";
import { Payment, columns } from "./BalanceSheetSummary/Columns";
import { DataTable } from "../../../components/DataTable/DataTable";
import { Loading as BalanceSheetLoading } from "./BalanceSheetSummary/Loading";
import { Formatter } from "@/utils/formatter";

interface StockSummary {
  ticker: string,
  currentPrice: number,
  companyName: string,
  freeFloat: number,
  tagAlong: number,
  avgDailyLiquidity: number,
  categorie: string,
  variationOneDay: number,
  variationOneMonth: number,
  variationTwelveMonths: number,
}

function SectionCard({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <Card className="w-full rounded-3xl" id={id}>
      {children}
    </Card>
  );
}

async function getStockSummary(ticker: string): Promise<StockSummary> {
  const response = await fetch(`${process.env.STOCK_API}/api/stocks/stock-summary/${ticker.toUpperCase()}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      item1: "item",
      item2: "item",
      item3: "item",
      item4: "item",
      item5: "item",
      item6: "item",
      item7: "item",
      item8: "item",
    },
    {
      id: "728ed52f",
      item1: "item",
      item2: "item",
      item3: "item",
      item4: "item",
      item5: "item",
      item6: "item",
      item7: "item",
      item8: "item",
    },
    {
      id: "728ed52f",
      item1: "item",
      item2: "item",
      item3: "item",
      item4: "item",
      item5: "item",
      item6: "item",
      item7: "item",
      item8: "item",
    },
    {
      id: "728ed52f",
      item1: "item",
      item2: "item",
      item3: "item",
      item4: "item",
      item5: "item",
      item6: "item",
      item7: "item",
      item8: "item",
    },
    {
      id: "728ed52f",
      item1: "item",
      item2: "item",
      item3: "item",
      item4: "item",
      item5: "item",
      item6: "item",
      item7: "item",
      item8: "item",
    },
    {
      id: "728ed52f",
      item1: "item",
      item2: "item",
      item3: "item",
      item4: "item",
      item5: "item",
      item6: "item",
      item7: "item",
      item8: "item",
    },
    {
      id: "728ed52f",
      item1: "item",
      item2: "item",
      item3: "item",
      item4: "item",
      item5: "item",
      item6: "item",
      item7: "item",
      item8: "item",
    },
    // ...
  ];
}

export default async function StockPage({ params }: any) {
  const stockSummary = await getStockSummary(params.ticker);
  const data = await getData();

  const renderStockCategories = () => {
    const stockCategories = [
      {
        lable: "large",
        color: "bg-violet-800",
      },
    ];

    return stockCategories.map((item, index) => (
      <div key={index + item.lable} className="flex gap-2">
        <p className={`text-xs font-medium ${item.color} p-1 rounded-sm`}>
          {item.lable.toLocaleUpperCase()}
        </p>
      </div>
    ));
  };

  const renderStockInfo = () => {
    const stockInfo = [
      {
        lable: "FREE FLOAT",
        value: Formatter.percentage(stockSummary.freeFloat),
      },
      {
        lable: "TAG ALONG",
        value: Formatter.percentage(stockSummary.tagAlong),
      },
      {
        lable: "LIQUIDEZ MÉDIA DIÁRIA",
        value: Formatter.shortCurrency(stockSummary.avgDailyLiquidity),
      },
    ];

    return stockInfo.map((item, index) => (
      <div key={index + item.lable} className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">{item.lable}</p>
        <p className="text-lg font-semibold">{item.value}</p>
      </div>
    ));
  };

  const renderStockVariations = () => {
    const stockVariations = [
      {
        lable: "VAR (1D)",
        value: stockSummary.variationOneDay,
      },
      {
        lable: "VAR (1M)",
        value: stockSummary.variationOneMonth,
      },
      {
        lable: "VAR (12M)",
        value: stockSummary.variationTwelveMonths,
      },
    ];

    return stockVariations.map((item, index) => (
      <div key={index + item.lable} className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">{item.lable}</p>
        <span
          className={`flex items-center text-lg font-semibold ${item.value > 0 ? "text-teal-400" : "text-amber-500"
            }`}
        >
          {item.value > 0 ? (
            <MoveUp className="w-4 h-4" />
          ) : (
            <MoveDown className="w-4 h-4" />
          )}
          {Formatter.percentage(Math.abs(item.value))}
        </span>
      </div>
    ));
  };

  return (
    <SingleColumn>
      <SectionCard>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row w-full justify-between gap-4">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-full bg-slate-700"></div>
                <div className="flex flex-col justify-between">
                  <CardTitle>{stockSummary.ticker}</CardTitle>
                  <CardDescription className="text-base">
                    {stockSummary.companyName}
                  </CardDescription>
                </div>
              </div>
              <CardTitle>{Formatter.currency(stockSummary.currentPrice)}</CardTitle>
            </div>
            {renderStockCategories()}
          </div>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between">
          <div className="flex gap-4">{renderStockInfo()}</div>

          <div className="grid grid-cols-3 gap-4">
            {renderStockVariations()}
          </div>
        </CardContent>
      </SectionCard>

      <Tabs defaultValue="company" className="hidden md:block sticky top-0">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company">
            <Link href="#empresa">Empresa</Link>
          </TabsTrigger>
          <TabsTrigger value="indicators">
            <Link href="#indicadores">Indicadores</Link>
          </TabsTrigger>
          <TabsTrigger value="dividends">
            <Link href="#dividendos">Dividendos</Link>
          </TabsTrigger>
          <TabsTrigger value="balanceSheet">
            <Link href="#balanco">Balanço Patrimonial</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <SectionCard id="empresa">
        <CardHeader>
          <CardTitle>Empresa</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Suspense fallback={<CompanySummaryLoading />}>
            <CompanySummary ticker={params.ticker} />
          </Suspense>
        </CardContent>
      </SectionCard>

      <SectionCard id="indicadores">
        <CardHeader>
          <CardTitle>Indicadores</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <IndicatorsSummary ticker={params.ticker} />
        </CardContent>
      </SectionCard>

      <SectionCard id="dividendos">
        <CardHeader>
          <CardTitle>Dividendos</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<DividendsLoading />}>
            <Dividends ticker={params.ticker} />
          </Suspense>
        </CardContent>
      </SectionCard>

      <SectionCard id="balanco">
        <CardHeader>
          <CardTitle>Balanço Patrimonial</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<BalanceSheetLoading />}>
            <DataTable columns={columns} data={data} />
          </Suspense>
        </CardContent>
      </SectionCard>
    </SingleColumn>
  );
}
