'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import MonthSales from './charts/MonthSales'
import DoughnutChart from './charts/Doughnut'
import LineChart from './charts/LineChart'
import { Months, SetQuery } from '@/backend/commonCli';
import {useSearchParams,useRouter, usePathname } from 'next/navigation'
import AvgChart from './charts/AvgChart'

export default function ReportWrap({data,genres}:{data: {
    DaysPerYear: {
        [key: string]: number[];
    };
    MonthsPerYear: any[];
},genres:[string[], number[]][]}) {
    const [month,setMonth] = useState((new Date).getMonth()+1);
    const [year,setYear] = useState((new Date).getFullYear());
    const router = useRouter()
    const params = usePathname()
    const searchParam = useSearchParams();
    function handleChange(e:ChangeEvent<HTMLFormElement>){
      const data = new FormData(e.currentTarget);
        if(data.get("year")?.toString().length != 4)
          return;
        if(year != parseInt(data.get('year') as string)){
          setYear(parseInt(data.get('year') as string))
          SetQuery([router,params,searchParam],{"year":`${data.get("year")}`})
        }
        setMonth(parseInt(data.get('months') as string))
    }
  return (
    <>  
        <h3>Reports</h3>
        <form className="max-w-lg mr-auto flex flex-row items-end" onChange={handleChange}>
          <div className='min-w-52 w-full mr-5'>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Month</label>
            <select id="months" name="months" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {Months.map((e,i)=><option key={i} selected={i == (new Date).getMonth()+1} value={i}>{e}</option>)}
            </select>
          </div>
          <div className="relative z-0 w-full group">
            <input type="number" name="year" min={2020} max={(new Date).getFullYear()} defaultValue={(new Date).getFullYear()} id="year" className="block  py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="year"  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Year
            </label>
          </div>
        </form>
        <MonthSales  data={data.DaysPerYear[month+1]} month={month}/>
        <div className='flex justify-center items-center my-5'>
          <DoughnutChart data={genres[month][1].length == 0 ? [1] : genres[month][1]} labels={genres[month][0].length == 0 ? ["No Data"] : genres[month][0]} label='genres'/>
          <AvgChart data={data} genres={genres} />
        </div>
        <LineChart data={data.MonthsPerYear} lable='Yearly Sales' lables={Months} />
    </>
  )
}
