import SingleColumn from "@/components/templates/SingleColumn";
import { Card } from "../components/ui/card";
import { IconBadge } from "@/components/IconBadge/IconBadge";

export default function Home() {
  function renderCards() {
    const cardsData = [
      {
        lable: 'Analise de forma rápida e objetiva os dados de ações da bolsa',
        value: 'ANÁLISE FUNDAMENTALISTA',
      },
      {
        lable: 'Acesse as informações mais importantes de forma organizada e intuitiva',
        value: 'INTERFACE INTUITIVA',
      },
      {
        lable: 'Simule e acompanhe diferentes estratégias sem gastar seu dinheiro',
        value: 'PAPER WALLETS',
      },
      {
        lable: 'Explore e encontre ações certas pra você através de filtros avançados',
        value: 'PESQUISAS AVANÇADAS',
      }
    ];

    return cardsData.map((item, index) => (
      <Card key={index + item.lable} className="flex flex-col gap-2 p-4 rounded-2xl">
        <div className="w-full flex justify-end">
          <IconBadge variant={"check"} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl md:text-2xl font-semibold">{item.value}</h3>
          <p className="text-base text-muted-foreground">{item.lable}</p>
        </div>
      </Card>
    ))
  }

  return (
    <SingleColumn>
      <div className="flex flex-col text-center gap-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Simplificamos a análise de ações
        </h1>
        <p className="text-base md:text-xl">
          Centralizamos as principais informações das ações e empresas da bolsa
          e as disponibilizamos de maneira acessível
          para auxiliar quem é iniciante ao mercado de ações
        </p>
      </div>

      <div className="flex flex-col w-full gap-4">
        <h2 className="text-xl md:text-2xl font-semibold">QUAIS SÃO AS VANTAGENS??</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {renderCards()}
        </div>
      </div>
    </SingleColumn>
  );
}
