'use server'
import { IsAdmin } from '@/backend/auth';
import { getUsers } from '@/backend/database'
import AddAddress from '@/components/AddAddress';
import UserTable from '@/components/UserTable'
import { permanentRedirect } from 'next/navigation';
import React from 'react'

export default async function Page() {
    const {success , data} = await getUsers();
    const req = await IsAdmin();
    if(!req) return permanentRedirect("/auth")
  return (<>
    {success && <UserTable data={data}/>}
  </>)
}
