import { BarChart } from "@/components/BarChart/BarChart";

async function getDividends(id: string) {
    return {
        paymentMonths: [
            {
                month: "jan",
                frequency: 70.0
            },
            {
                month: "fev",
                frequency: 30.0
            },
            {
                month: "mar",
                frequency: 10.0
            },
            {
                month: "abr",
                frequency: 70.0
            },
            {
                month: "mai",
                frequency: 30.0
            },
            {
                month: "jun",
                frequency: 10.0
            },
            {
                month: "jul",
                frequency: 70.0
            },
            {
                month: "ago",
                frequency: 30.0
            },
            {
                month: "set",
                frequency: 10.0
            },
            {
                month: "out",
                frequency: 70.0
            },
            {
                month: "nov",
                frequency: 30.0
            },
            {
                month: "dez",
                frequency: 10.0
            }
        ],
    }
}

interface MonthlyDividendsProps {
    id: string
};

export async function MonthlyDividends({ id }: MonthlyDividendsProps) {
    const {
        paymentMonths,
    } = await getDividends(id);

    function handlePaymentMonths() {
        const formattedPaymentMonths = paymentMonths.sort((a, b) => b.frequency - a.frequency);
        const months = formattedPaymentMonths.map((i) => i.month);
        const frequencies = formattedPaymentMonths.map((i) => i.frequency);
        return { months, frequencies };
    }


    return (
        <BarChart
            data={handlePaymentMonths().frequencies}
            labels={handlePaymentMonths().months}
            backgroundColor="rgba(45, 212, 191)"
            hoverBackgroundColor="rgb(15, 118, 110)"
        />
    )
}
