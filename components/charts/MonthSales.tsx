'use client'
import BarChart from './BarChart'
import { Months } from '@/backend/commonCli';

export default function MonthSales({data,month}:{data:number[],month:number}) {
    // const getRandomInt = (min:number, max:number) => Math.floor(Math.random() * (max - min + 1)) + min;
    // const randomNumbers = Array.from({ length: 30 }, () => getRandomInt(10, 100));
    const lables = Array(31).fill(null).map((_, index) => `${index + 1}`)
    
  return (
    <>
        <BarChart lables={lables} data={data} lable={`${Months[month]} Sales`}/>
    </>
  )
}
