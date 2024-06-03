'use client'

import SingleColumn from "@/components/templates/SingleColumn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ReturnedStocks from "./ReturnedStocks/ReturnedStocks";
import { useState } from "react";
import { getStocksByTicker } from "../actions";

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

interface StocksData {
  id: number;
  ticker: string;
  companyId: number;
  companyName: string;
  lastPrice: number;
  variationOneDay: number;
  sector: string;
}

export default function SearchPage() {
  const [stocks, setStocks] = useState<StocksData[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>();

  function handleSearch() {
    if (searchQuery)
      getStocksByTicker(searchQuery).then(data => setStocks(data));
    else setStocks(null);
  }

  return (
    <SingleColumn>
      <SectionCard>
        <CardHeader>
          <h1 className="text-3xl font-semibold">Pesquisar Ações</h1>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 md:gap-6 justify-between">
          <div className="flex flex-row w-full gap-5">
            <Input
              type="text"
              placeholder="Nome da ação/empresa"
              // value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant={"outline"}>Filtros</Button>
          </div>
          <div>
            <Button onClick={handleSearch}>
              Pesquisar
            </Button>
          </div>
        </CardContent>
      </SectionCard>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <ReturnedStocks stocks={stocks} />
      </div>
    </SingleColumn>
  );
}
