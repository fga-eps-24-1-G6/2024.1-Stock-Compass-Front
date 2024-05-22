import { BarChart } from "@/components/BarChart/BarChart";
import { DoughnutChart } from "@/components/DoughnutChart/DoughnutChart";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Formatter from "@/utils/formatter";

interface DividendData {
    dividendYield: {
        dividendYieldLastTenYears: number,
        dividendYieldCurrent: number,
        dividendYieldLastFiveYears: number
    },
    paymentMonths: object,
    yearlyPayments: object,
    dividends: {
        type: string,
        value: number,
        ownershipDate: string,
        paymentDate: string
    }[]
}

async function getDividends(ticker: string): Promise<DividendData> {
    const response = await fetch(`${process.env.STOCK_API}/api/dividends/${ticker}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

interface DividendsProps {
    ticker: string
};

export async function Dividends({ ticker }: DividendsProps) {
    const {
        dividendYield,
        paymentMonths,
        yearlyPayments,
        dividends
    } = await getDividends(ticker);

    function renderDividendCards() {
        return dividends.map((item) => (
            <CarouselItem key={item.paymentDate} className="sm:basis-1/2 md:basis-full lg:basis-1/2">
                <Card className="rounded-2xl">
                    <CardContent className="flex flex-col p-4 gap-4">
                        <div className="flex justify-between text-base">
                            <p>{item.type}</p>
                            <p>{Formatter.currency(item.value)}</p>
                        </div>

                        <div className="text-sm">
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Data com</p>
                                <p>{Formatter.date(item.ownershipDate)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Pagamento</p>
                                <p>{Formatter.date(item.paymentDate)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </CarouselItem>
        ))
    }

    function handlePaymentMonths() {
        let formattedPaymentMonths = Object.entries(paymentMonths).sort((a, b) => b[1] - a[1]);
        let minorityMonths = 0;
        for (let i = 0; i < formattedPaymentMonths.length; i++) {
            if (formattedPaymentMonths[i][1] < 8.3) {
                minorityMonths += formattedPaymentMonths[i][1]
            }
        }
        formattedPaymentMonths = formattedPaymentMonths.filter(item => item[1] > 8.3);
        formattedPaymentMonths.push(['OUTROS', minorityMonths])

        const months = formattedPaymentMonths.map((i) => i[0]);
        const frequencies = formattedPaymentMonths.map((i) => i[1]);
        return { months, frequencies };
    }

    function handleYearlyPayments() {
        const formattedYearlyPayments = Object.entries(yearlyPayments).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
        const years = formattedYearlyPayments.map((i) => i[0]);
        const payments = formattedYearlyPayments.map((i) => i[1]);
        return { years, payments };
    }

    return (
        <main className="flex flex-col md:grid md:grid-cols-2 gap-6">
            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <p className="text-xl">Dividend Yield</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="rounded-2xl p-4 flex flex-col gap-9">
                            <div className="w-full text-lg font-semibold">ATUAL</div>
                            <div className="w-full text-2xl font-semibold flex justify-end text-teal-400">
                                {Formatter.percentage(dividendYield.dividendYieldCurrent * 100)}
                            </div>
                        </Card>

                        <Card className="rounded-2xl p-4 flex flex-col gap-9">
                            <div className="w-full text-lg font-semibold">MÉDIA 5A</div>
                            <div className="w-full text-2xl font-semibold flex justify-end text-teal-400">
                                {Formatter.percentage(dividendYield.dividendYieldLastFiveYears * 100)}
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-xl">Meses de Pagamento</p>
                    <div className="w-full h-56 flex justify-center">
                        <DoughnutChart
                            data={handlePaymentMonths().frequencies}
                            labels={handlePaymentMonths().months}
                        />
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <p className="text-xl">Proventos Pagos</p>
                <div className="flex flex-col h-full gap-4">
                    <div className="flex flex-grow md:overflow-hidden">
                        <BarChart
                            data={handleYearlyPayments().payments}
                            labels={handleYearlyPayments().years}
                        />
                    </div>

                    <div className="flex w-full">
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {renderDividendCards()}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </section>
        </main>
    )
}
