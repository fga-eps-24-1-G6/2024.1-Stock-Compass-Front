import { Card } from "../components/ui/card";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center p-24">
      {/* Título e texto */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Simplificamos a análise de ações</h1>
        <p className="text-lg text-gray-600">Centralizamos as principais informações das ações e empresas da bolsa e as disponibilizamos de maneira acessível para auxiliar quem é iniciante ao mercado de ações</p>
      </div>

      {/* Texto acima dos cards */}
      <div className="text-left mb-8">
        <h2 className="text-xl font-semibold">QUAIS SÃO AS VANTAGENS??</h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-8 w-full max-w-5xl lg:grid-cols-2">
        <div>
          <Card>
            <h3>ANÁLISE FUNDAMENTALISTA</h3>
            <p className="text-sm">Analise de forma rápida e objetiva os dados de ações da bolsa</p>
          </Card>
        </div>
        <div>
          <Card>
            <h2>INTERFACE INTUITIVA</h2>
            <p className="text-sm">Acesse as informações mais importantes de forma organizada e intuitiva</p>
          </Card>
        </div>
        <div>
          <Card>
              <h2>PAPER WALLETS</h2>
              <p className="text-sm">Simule e acompanhe diferentes estratégias sem gastar seu dinheiro</p>
          </Card>
        </div>
        <div>
          <Card>
            <h2>PESQUISAS AVANÇADAS</h2>
            <p className="text-sm">Explore e encontre ações certas pra você através de filtros avançados</p>
          </Card>
        </div>
      </div>
    </main>
  );
}
