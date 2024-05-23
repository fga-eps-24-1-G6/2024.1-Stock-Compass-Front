import Formatter from "@/utils/formatter";
import { IconBadge, badgeVariant } from "../../../../components/IconBadge/IconBadge";
import { Card } from "../../../../components/ui/card";

async function getCompanySummary(ticker: string) {
    const response = await fetch(`${process.env.STOCK_API}/api/company/company-info/2`);//${ticker}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

interface CompanySummaryProps {
    ticker: string
};

export default async function CompanySummary({ ticker }: Readonly<CompanySummaryProps>) {
    const data = await getCompanySummary(ticker);
    const companySummary = [
        {
            lable: 'Entrada na Bolsa (IPO)',
            value: data.ipo || '-',
            badge: 'calendar'
        },
        {
            lable: 'Setor',
            value: data.sector || '-',
            badge: 'business'
        },
        {
            lable: 'Segmento',
            value: data.segment || '-',
            badge: 'business'
        },
        {
            lable: 'Valor de mercado',
            value: Formatter.shortCurrency(data.marketValue) || '-',
            badge: 'money'
        },
        {
            lable: 'Patrimônio Líquido',
            value: Formatter.shortCurrency(data.equity) || '-',
            badge: 'money'
        },
        {
            lable: 'Nº total de papeis',
            value: Formatter.shortNumber(data.numberOfPapers) || '-',
            badge: 'money'
        },
    ];

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