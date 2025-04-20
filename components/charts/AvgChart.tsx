import React from 'react'

export default function AvgChart({data,genres}:{data: {
  DaysPerYear: {
      [key: string]: number[];
  };
  MonthsPerYear: number[];
},genres:[string[], number[]][]}) {
    let year_total = 0;
    data.MonthsPerYear.forEach(e=>{
      year_total+=e;
    })
    const dataReport = [
      ["Average Days Sales",Math.round(year_total/360)],
      ["Average Month Sales",Math.round(year_total/12)],
      ["Total Year Sales",year_total],
    ]
  return (
    <>
     <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
            <tbody className='text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
              {dataReport.map((e,i)=>{
                return <tr key={i}>
                  <th scope="row" className="px-6 py-4  font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                      {e[0]}
                  </th>
                  <td className="px-6 py-4">
                      {e[1]} &#8377;
                  </td>
              </tr>
            })}
            </tbody>
        </table>
    </>
  )
}
