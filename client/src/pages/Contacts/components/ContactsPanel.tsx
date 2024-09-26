import Avatar from '@/components/Avatar'
import SearchBar from '@/components/SearchBar'
import { UserSummary } from '@/types'
import request from '@/utils/request'
import { Search, User2, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

const BASE = import.meta.env.VITE_APP_URL

type Query = {
  page_no: number
  page_size: number
  username: string
}

type Props = {
	contacts: UserSummary | null
}

const ContactsPanel = ({ contacts } : Props) => {


  useEffect(() => {
    // getUsers()
  }, [])
  return (
    <div className="flex-grow flex flex-col gap-10 justify-center items-center">

	{
	contacts ?
         
		<>
			<div className='flex flex-col justify-center items-center gap-4'>
				<Avatar user={contacts} className='size-20'/>
				<div className='font-bold text-3xl'>{ contacts.username }</div>
				<div className='text-gray-500'>{ contacts.email }</div>
			</div>
			<div className='flex gap-5 items-center'>
				<div className='border py-2 px-4 rounded-md hover:bg-gray-50 cursor-pointer'>Send Message</div>
				<div className='border py-2 px-4 rounded-md hover:bg-gray-50 cursor-pointer'>Login</div>
			</div>
		</> :
		<div className='flex gap-2 items-center text-xl text-gray-400 font-bold'>
			<span className='bg-gray-400 text-white font-bold inline-block p-2 rounded-tl-xl rounded-br-xl'>Go</span>chat
		</div>
	}
    </div> 
  )
}

export default ContactsPanel
