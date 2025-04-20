'use client'
import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

// Register all the required elements
ChartJS.register(
    Title, 
    Tooltip, 
    Legend, 
    LineElement, 
    PointElement,  // Added this line
    CategoryScale, 
    LinearScale
);
export default function LineChart({lables,data,lable}:{lables:string[],data:number[],lable:string}) {
    const chartData = {
        labels: lables,
        datasets: [
            {
                label: lable,
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ],
        
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const, 
            },
            tooltip: {
                callbacks: {
                    label: (context:any) => {
                        return `${context.dataset.label}: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            y: {
              min: 0, 
              max: Math.max(...data || [0]) * 1.3, 
            }
          }
    };
  return (
    <>
        <div className='my-5'>
            <Line data={chartData} options={options} />
        </div>
    </>
  )
}
