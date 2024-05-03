import { Card } from "../components/ui/card";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center p-4 md:p-24 bg-gray-900">
      {/* Título e texto */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Simplificamos a análise de ações</h1>
        <p className="text-lg text-gray-100">Centralizamos as principais informações das ações e empresas da bolsa e as disponibilizamos de maneira acessível para auxiliar quem é iniciante ao mercado de ações</p>
      </div>
      <div>
        {/* Texto acima dos cards */}
        <div className="ml-4 mb-4">
          <h2 className="text-xl text-white mb-4">QUAIS SÃO AS VANTAGENS??</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <div className="mb-8 md:mb-0 pl-0 md:pl-8">
            <Card className="bg-gray-900 h-30 p-4">
              <h3 className="text-white">ANÁLISE FUNDAMENTALISTA</h3>
              <p className="text-base text-gray-300">Analise de forma rápida e objetiva os dados de ações da bolsa</p>
            </Card>
          </div>
          <div className="mb-8 md:mb-0 pl-0 md:pl-8">
            <Card className="bg-gray-900 h-30 p-4">
              <h3 className="text-white">INTERFACE INTUITIVA</h3>
              <p className="text-base text-gray-300">Acesse as informações mais importantes de forma organizada e intuitiva</p>
            </Card>
          </div>
          <div className="mb-8 md:mb-0 pl-0 md:pl-8">
            <Card className="bg-gray-900 h-30 p-4">
              <h3 className="text-white">PAPER WALLETS</h3>
              <p className="text-base text-gray-300">Simule e acompanhe diferentes estratégias sem gastar seu dinheiro</p>
            </Card>
          </div>
          <div className="mb-8 md:mb-0 pl-0 md:pl-8">
            <Card className="bg-gray-900 h-30 p-4">
              <h3 className="text-white">PESQUISAS AVANÇADAS</h3>
              <p className="text-base text-gray-300">Explore e encontre ações certas pra você através de filtros avançados</p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
