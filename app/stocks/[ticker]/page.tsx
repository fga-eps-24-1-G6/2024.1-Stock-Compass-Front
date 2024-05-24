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
import { MoveDown, MoveUp, TriangleAlert } from "lucide-react";
import CompanySummary from "./CompanySummary/CompanySummary";
import { Loading as CompanySummaryLoading } from "./CompanySummary/Loading";
import { Dividends } from "./Dividends/Dividends";
import { Loading as DividendsLoading } from "./Dividends/Loading";
import IndicatorsSummary from "./IndicatorsSummary/IndicatorsSummary";
import { Loading as BalanceSheetLoading } from "./BalanceSheetSummary/Loading";
import BalanceSheet from "./BalanceSheetSummary/BalanceSheetSummary";
import Formatter from "@/utils/formatter";
import Valuation from "./Valuation/Valuation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface StockSummary {
  ticker: string,
  currentPrice: number,
  companyName: string,
  companyId: number,
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
  const response = await fetch(`${process.env.STOCK_API}/api/stocks/stock-summary/${ticker}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export default async function StockPage({ params }: any) {
  const {
    ticker,
    currentPrice,
    companyName,
    companyId,
    freeFloat,
    tagAlong,
    avgDailyLiquidity,
    variationOneDay,
    variationOneMonth,
    variationTwelveMonths
  } = await getStockSummary(params.ticker.toUpperCase());

  const renderStockInfo = () => {
    const stockInfo = [
      {
        lable: "FREE FLOAT",
        value: Formatter.percentage(freeFloat),
      },
      {
        lable: "TAG ALONG",
        value: Formatter.percentage(tagAlong),
      },
      {
        lable: "LIQUIDEZ MÉDIA DIÁRIA",
        value: Formatter.shortCurrency(avgDailyLiquidity),
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
        value: variationOneDay,
      },
      {
        lable: "VAR (1M)",
        value: variationOneMonth,
      },
      {
        lable: "VAR (12M)",
        value: variationTwelveMonths,
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

  function handleCompanyThumb() {
    const name = companyName;
    if (!name) return '';

    return name.slice(0, 2).toUpperCase();
  }

  return (
    <SingleColumn>
      <SectionCard>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row w-full justify-between gap-4">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 p-6 rounded-full bg-slate-700 flex items-center justify-center text-3xl text-slate-300">
                  {handleCompanyThumb()}
                </div>
                <div className="flex flex-col justify-between">
                  <CardTitle>{ticker}</CardTitle>
                  <CardDescription className="text-base">
                    {companyName}
                  </CardDescription>
                </div>
              </div>
              <CardTitle>{Formatter.currency(currentPrice)}</CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between">
          <div className="flex gap-4">{renderStockInfo()}</div>

          <div className="grid grid-cols-3 gap-4">
            {renderStockVariations()}
          </div>
        </CardContent>
      </SectionCard>

      <Tabs defaultValue="company" className="hidden md:block sticky top-0 z-10">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company">
            <Link href="#empresa">Empresa</Link>
          </TabsTrigger>
          <TabsTrigger value="indicators">
            <Link href="#indicadores">Indicadores</Link>
          </TabsTrigger>
          <TabsTrigger value="dividends">
            <Link href="#dividendos">Dividendos</Link>
          </TabsTrigger>
          <TabsTrigger value="valuation">
            <Link href="#valuation">Valuation</Link>
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
        <CardContent>
          <Suspense fallback={<CompanySummaryLoading />}>
            <CompanySummary companyId={companyId} />
          </Suspense>
        </CardContent>
      </SectionCard>

      <SectionCard id="indicadores">
        <CardHeader>
          <CardTitle>Indicadores</CardTitle>
        </CardHeader>
        <CardContent>
          <IndicatorsSummary ticker={params.ticker.toUpperCase()} />
        </CardContent>
      </SectionCard>

      <SectionCard id="dividendos">
        <CardHeader>
          <CardTitle>Dividendos</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<DividendsLoading />}>
            <Dividends ticker={params.ticker.toUpperCase()} />
          </Suspense>
        </CardContent>
      </SectionCard>

      <SectionCard id="valuation">
        <CardHeader>
          <CardTitle>Valuation</CardTitle>
        </CardHeader>
        <CardContent>
          <Valuation ticker={params.ticker.toUpperCase()} />
        </CardContent>
      </SectionCard>

      <SectionCard id="balanco">
        <CardHeader>
          <CardTitle>Balanço Patrimonial</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<BalanceSheetLoading />}>
            <BalanceSheet companyId={companyId} />
          </Suspense>
        </CardContent>
      </SectionCard>
    </SingleColumn>
  );
}
