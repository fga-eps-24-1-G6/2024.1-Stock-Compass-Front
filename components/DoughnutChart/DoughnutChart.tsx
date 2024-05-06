'use client'

import { Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

interface DoughnutChartProps {
    data: number[],
    labels: string[],
    showLegend: boolean
}

type position = "right" | "center" | "left" | "top" | "bottom" | "chartArea" | undefined;
type align = "center" | "start" | "end" | undefined;

export function DoughnutChart({ data, labels, showLegend }: DoughnutChartProps) {
    const chartData = {
        labels,
        datasets: [{
            data,
            backgroundColor: [
                'rgba(255, 255, 255, 1)',
                'rgba(228, 228, 231, 1)',
                'rgba(161, 161, 170, 1)',
                'rgba(113, 113, 122, 1)',
            ],
        }],
    };

    const options = {
        plugins: {
            legend: {
                display: showLegend,
                position: 'right' as position,
                align: 'start' as align,
                labels: {
                    useBorderRadius: true,
                    borderRadius: 20000,
                    boxWidth: 15,
                    color: 'rgba(255, 255, 255, 1)',
                    font: {
                        size: 16,
                        lineHeight: 28,
                    }
                }
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: function (context: any) {
                        return context.parsed.toString() + '%';
                    }
                }
            }
        },
        elements: {
            arc: {
                borderWidth: 5,
                borderColor: 'rgba(9, 9, 11, 1)',
            }
        },
        maintainAspectRatio: false,
        responsive: true
    };

    return (
        <Doughnut data={chartData} options={options} />
    )
}