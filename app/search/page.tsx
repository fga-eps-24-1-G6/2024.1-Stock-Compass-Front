'use client'

import SingleColumn from "@/components/templates/SingleColumn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ReturnedStocks from "./ReturnedStocks/ReturnedStocks";
import { useState } from "react";
import { getStocksBySector, getStocksByTicker } from "../actions";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
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
    if (searchQuery){
      getStocksByTicker(searchQuery).then(data => setStocks(data));
    }
    else if(sectorQuery){
      getStocksBySector(sectorQuery).then(data => setStocks(data));
    } 
    else{ 
      setStocks(null);
    }
  }

  const [isTotalActive, setIsTotalActive] = useState(false);
  const [sectorQuery, setSectorQuery] = useState<string>();

  const handleTotalToggle = () => {
    setIsTotalActive(!isTotalActive);
    setSectorQuery("Todos");
  };

  const [isHealthActive, setIsHealthActive] = useState(false);

  const handleHealthToggle = () => {
    setIsHealthActive(!isHealthActive);
    setSectorQuery("Saúde");
  };

  const [isPublicUtilityActive, setIsPublicUtilityActive] = useState(false);

  const handlePublicUtilityToggle = () => {
    setIsPublicUtilityActive(!isPublicUtilityActive);
    setSectorQuery("Utilidade Pública");
  };

  const [isIndustrialActive, setIsIndustrialActive] = useState(false);

  const handleIndustrialToggle = () => {
    setIsIndustrialActive(!isIndustrialActive);
    setSectorQuery("Bens Industriais");
  };

  const [isFinancialActive, setIsFinancialActive] = useState(false);

  const handleFinancialToggle = () => {
    setIsFinancialActive(!isFinancialActive);
    setSectorQuery("Financeiro");
  };
  
  const [isNonCiclicalActive, setIsNonCiclicalActive] = useState(false);

  const handleNonCiclicalToggle = () => {
    setIsNonCiclicalActive(!isNonCiclicalActive);
    setSectorQuery("Consumo não Cíclico");
  };

  const [isTelecomunicationActive, setIsTelecomunicationActive] = useState(false);

  const handleTelecomunicationToggle = () => {
    setIsTelecomunicationActive(!isTelecomunicationActive);
    setSectorQuery("Telecomunicações");
  };


  const [isCiclicalActive, setIsCiclicalActive] = useState(false);

  const handleCiclicalToggle = () => {
    setIsCiclicalActive(!isCiclicalActive);
    setSectorQuery("Consumo Cíclico");
  };

  const [isBasicMaterialActive, setIsBasicMaterialActive] = useState(false);

  const handleBasicMaterialToggle = () => {
    setIsBasicMaterialActive(!isBasicMaterialActive);
    setSectorQuery("Materiais Básicos");
  };

  const [isItActive, setIsItActive] = useState(false);

  const handleItToggle = () => {
    setIsItActive(!isItActive);
    setSectorQuery("Tecnologia da Informação");
  };

  const [isFuelActive, setIsFuelActive] = useState(false);

  const handleFuelToggle = () => {
    setIsFuelActive(!isFuelActive);
    setSectorQuery("Petróleo, Gás e Biocombustíveis");
  };
  

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
               <Sheet>
    <SheetTrigger asChild>
    <Button variant={"outline"}>Filtros</Button>
    </SheetTrigger>
    <SheetContent  className="flex flex-col gap-5">
        Filtrar ações
          <Tabs defaultValue="general" className="hidden md:block sticky">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">
            <Link href="#geral">Geral</Link>
          </TabsTrigger>
          <TabsTrigger value="indicators">
            <Link href="#indicadores">Indicadores</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Card className="w-full">
        <CardContent className="flex flex-col gap-3 justify-between">
            <div>Setores</div>
            <div className="flex flex-row gap-3">
                <Button onClick={handleTotalToggle} variant={isTotalActive ? "secondary" : "outline"}>Todos</Button>
                <Button onClick={handleHealthToggle} variant={isHealthActive ? "secondary" : "outline"}>Saúde</Button>
            </div>
            <div className="flex flex-row gap-3">
                <Button onClick={handlePublicUtilityToggle} variant={isPublicUtilityActive ? "secondary" : "outline"}>Utilidade Pública</Button>
                <Button onClick={handleIndustrialToggle} variant={isIndustrialActive ? "secondary" : "outline"}>Bens Industriais</Button>
            </div>
            <div className="flex flex-row gap-3">
                <Button onClick={handleFinancialToggle} variant={isFinancialActive ? "secondary" : "outline"}>Financeiro</Button>
                <Button onClick={handleNonCiclicalToggle} variant={isNonCiclicalActive ? "secondary" : "outline"}>Consumo não Cíclico</Button>
            </div>
            <div className="flex flex-row gap-5">
                <Button onClick={handleTelecomunicationToggle} variant={isTelecomunicationActive ? "secondary" : "outline"}>Telecomunicações</Button>
            </div>
            <div className="flex flex-row gap-5">
                <Button onClick={handleCiclicalToggle} variant={isCiclicalActive ? "secondary" : "outline"}>Consumo Cíclico</Button>
            </div>
            <div className="flex flex-row gap-5">
                <Button onClick={handleBasicMaterialToggle} variant={isBasicMaterialActive ? "secondary" : "outline"}>Materiais Básicos</Button>
            </div>
            <div className="flex flex-row gap-5">
                <Button onClick={handleItToggle} variant={isItActive ? "secondary" : "outline"}>Tecnologia da Informação</Button>
            </div>
            <div className="flex flex-row gap-5">
                <Button onClick={handleFuelToggle} variant={isFuelActive ? "secondary" : "outline"}>Petróleo, Gás e Biocombustíveis</Button>
            </div>
        </CardContent>
        </Card>
        <SheetFooter>
                <SheetClose asChild>
                <Button type="submit" onClick={handleSearch}>Aplicar Filtros</Button>
                </SheetClose>
            </SheetFooter>
    </SheetContent>
    </Sheet>
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
