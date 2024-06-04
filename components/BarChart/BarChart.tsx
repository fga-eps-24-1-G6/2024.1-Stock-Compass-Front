'use client'

import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataset
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarChartProps {
    data: number[],
    datasets?: ChartDataset<"bar", (number | [number, number] | null)[]>[],
    labels: string[],
    backgroundColor?: string,
    hoverBackgroundColor?: string
}

export function BarChart({ data, labels, backgroundColor, hoverBackgroundColor, datasets }: BarChartProps) {
    const barChartData = {
        labels,
        datasets: datasets ? [...datasets] : [{
            data,
            backgroundColor: [
                backgroundColor || 'rgba(113, 113, 122, 1)',
            ],
            hoverBackgroundColor: [
                hoverBackgroundColor || 'rgba(228, 228, 231, 1)',
            ],
            borderWidth: 0
        }]
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                boxPadding: 20,
                displayColors: false,
                callbacks: {
                    label: function (context: any) {
                        return 'R$ ' + context.parsed.y.toFixed(2).toString().replace('.', ',');
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    display: false
                }
            }
        },
        maintainAspectRatio: false,
        responsive: true
    }

    return (
        <Bar data={barChartData} options={options} />
    )
}