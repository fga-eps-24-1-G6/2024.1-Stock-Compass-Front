import { IconBadge, badgeVariant } from "../IconBadge/IconBadge";
import { Card } from "../ui/card";

async function getCompanySummary(ticker: string) {
    return [
        {
            lable: 'Entrada na Bolsa (IPO)',
            value: '2010',
            badge: 'calendar'
        },
        {
            lable: 'Setor',
            value: 'Utilidade pública',
            badge: 'business'
        },
        {
            lable: 'Segmento',
            value: 'Energia elétrica',
            badge: 'business'
        },
        {
            lable: 'Valor de mercado',
            value: 'R$ 12,52 B',
            badge: 'money'
        },
        {
            lable: 'Patrimônio Líquido',
            value: 'R$ 6,68 B',
            badge: 'money'
        },
        {
            lable: 'Nº total de papeis',
            value: '1,02 B',
            badge: 'money'
        },
    ];
}

interface CompanySummaryProps {
    ticker: string
};

export default async function CompanySummary({ ticker }: Readonly<CompanySummaryProps>) {
    const companySummary = await getCompanySummary(ticker);

    return companySummary.map((item, index) => (
        <Card key={index + item.lable} className="flex flex-col gap-2 p-4 rounded-2xl">
            <div className="w-full flex justify-end">
                <IconBadge variant={item.badge as badgeVariant} />
            </div>
            <div>
                <h3 className="text-2xl font-semibold">{item.value}</h3>
                <p className="text-base text-muted-foreground">{item.lable}</p>
            </div>
        </Card>
    ))
}