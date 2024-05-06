import SingleColumn from "@/components/templates/SingleColumn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ReturnedStocks from "./ReturnedStocks/ReturnedStocks";

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

export default async function StockSearchPage({ params }: any) {
  return (
    <SingleColumn>
      <SectionCard>
        <CardHeader>
          <p>Pesquisar Ações</p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 md:gap-6 justify-between">
          <div className="flex flex-row w-full gap-5">
            <Input type="text" placeholder="Nome da ação/empresa" />
            <Button variant={"outline"}>Filtros</Button>
          </div>
          <div>
            <Button>Pesquisar</Button>
          </div>
        </CardContent>
      </SectionCard>
      <div className="grid grid-cols-2 gap-10">
        <ReturnedStocks ticker={""}></ReturnedStocks>
      </div>
    </SingleColumn>
  );
}
