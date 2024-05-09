import { Card } from "../components/ui/card";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center p-4 md:p-12">
      {/* Título e texto */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-8">Simplificamos a análise de ações</h1>
        <p className="text-lg">Centralizamos as principais informações das ações e empresas da bolsa e as disponibilizamos de maneira acessível para auxiliar quem é iniciante ao mercado de ações</p>
      </div>
      <div>
        {/* Texto acima dos cards */}
        <div className="ml-4 mb-4">
          <h2 className="text-xl mb-4 font-bold">QUAIS SÃO AS VANTAGENS??</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <div className="mb-8 md:mb-0 pl-0 md:pl-8">
            <Card className="h-30 p-4">
              <h3 className="font-bold">ANÁLISE FUNDAMENTALISTA</h3>
              <p className="text-base">Analise de forma rápida e objetiva os dados de ações da bolsa</p>
            </Card>
          </div>
          <div className="mb-8 md:mb-0 pl-0 md:pl-8">
            <Card className="h-30 p-4">
              <h3 className="font-bold">INTERFACE INTUITIVA</h3>
              <p className="text-base">Acesse as informações mais importantes de forma organizada e intuitiva</p>
            </Card>
          </div>
          <div className="mb-8 md:mb-0 pl-0 md:pl-8">
            <Card className="h-30 p-4">
              <h3 className="font-bold">PAPER WALLETS</h3>
              <p className="text-base">Simule e acompanhe diferentes estratégias sem gastar seu dinheiro</p>
            </Card>
          </div>
          <div className="mb-8 md:mb-0 pl-0 md:pl-8">
            <Card className="h-30 p-4">
              <h3 className="font-bold">PESQUISAS AVANÇADAS</h3>
              <p className="text-base">Explore e encontre ações certas pra você através de filtros avançados</p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
