import { Months } from '@/backend/commonCli'
import { GetRecord, GetRecordGenres } from '@/backend/database'
import ReportWrap from '@/components/ReportWrap'
import { compareSync } from 'bcrypt'
import React from 'react'



export default async function page({searchParams}:{searchParams:{year?:string}}) {
    let year:number;
    if(searchParams.year && !isNaN(parseInt(searchParams?.year)))
        year = parseInt(searchParams.year)
    else 
        year = (new Date).getFullYear()
    const req1 = await GetRecord(year)
    const req2 = await GetRecordGenres(year);
  return (
    <>
       <ReportWrap data={req1.data} genres={req2.data}/>
    </>
  )
}

