import Formatter from "@/utils/formatter";
import { IconBadge, badgeVariant } from "../../../../components/IconBadge/IconBadge";
import { Card } from "../../../../components/ui/card";
import { ErrorAlert } from "@/components/ErrorAlert/ErrorAlert";

async function getCompanySummary(id: number) {
    try {
        const response = await fetch(`${process.env.STOCK_API}/api/company/company-info/${id}`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

interface CompanySummaryProps {
    companyId: number
};

export default async function CompanySummary({ companyId }: Readonly<CompanySummaryProps>) {
    const data = await getCompanySummary(companyId);
    const companySummary = [
        {
            lable: 'Entrada na Bolsa (IPO)',
            value: data?.ipo || '-',
            badge: 'calendar'
        },
        {
            lable: 'Setor',
            value: data?.sector || '-',
            badge: 'business'
        },
        {
            lable: 'Segmento',
            value: data?.segment || '-',
            badge: 'business'
        },
        {
            lable: 'Valor de mercado',
            value: data?.marketValue ? Formatter.shortCurrency(data?.marketValue) : '-',
            badge: 'money'
        },
        {
            lable: 'Patrimônio Líquido',
            value: data?.equity ? Formatter.shortCurrency(data?.equity) : '-',
            badge: 'money'
        },
        {
            lable: 'Nº total de papeis',
            value: data?.numberOfPapers ? Formatter.shortNumber(data?.numberOfPapers) : '-',
            badge: 'money'
        },
    ];

    return (
        data ?
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {companySummary.map((item, index) => (
                    <Card key={index + item.lable} className="flex flex-col gap-2 p-4 rounded-2xl">
                        <div className="w-full flex justify-end">
                            <IconBadge variant={item.badge as badgeVariant} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold">{item.value}</h3>
                            <p className="text-base text-muted-foreground">{item.lable}</p>
                        </div>
                    </Card>
                ))}
            </div> :
            <ErrorAlert />
    )
}