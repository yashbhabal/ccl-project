'use client'
import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

// Register all the required elements for a Doughnut chart
ChartJS.register(
    Title, 
    Tooltip, 
    Legend, 
    ArcElement, // Added for doughnut charts
    CategoryScale,
    LinearScale
);

export default function DoughnutChart({ labels, data, label }: { labels: string[], data: number[], label: string }) {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: data,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(199, 199, 199, 0.2)', 'rgba(83, 102, 255, 0.2)', 'rgba(129, 255, 104, 0.2)', 'rgba(255, 178, 204, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(199, 199, 199, 1)', 'rgba(83, 102, 255, 1)', 'rgba(129, 255, 104, 1)', 'rgba(255, 178, 204, 1)'],
                borderWidth: 1,
                hoverOffset: 20
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
                padding:40
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        return `${context.label}: ${context.raw}`;
                    }
                }
            }
        },
        layout: {
            padding: 30, 
        },
    };

    return (
        <> 
            <div className='max-h-[600px] h-full max-w-[600px] w-full'>
                <Doughnut data={chartData} options={options} />
            </div>
        </>
    )
}
