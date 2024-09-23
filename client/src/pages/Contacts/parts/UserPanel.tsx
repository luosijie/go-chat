import SearchBar from '@/components/SearchBar'
import { UserSummary } from '@/types'
import request from '@/utils/request'
import { Search, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

const BASE = import.meta.env.VITE_APP_URL

type Query = {
  page_no: number
  page_size: number
  username: string
}

const UserPanel = () => {
  const [query, setQuery] = useState<Query>({
    page_no: 1,
    page_size: 20,
    username: ''
  })

  const [users, setUsers] = useState<Array<UserSummary>>([])


  const getUsers = async () => {
        const res = await request({
            url: BASE + '/user/page',
            method: 'GET',
            query
        })

        console.log("get-user-page", res)

        if (res.data && res.data.rows) {
          setUsers(res.data.rows)
        }
  }

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <div className="flex-grow flex flex-col gap-10 justify-center items-center">
            <SearchBar className='w-80'/>
        <div className='bg-gray-50 w-4/5 h-2/3 rounded-lg flex justify-center items-center'>
            {/* <UserPlus/> */}
            {
              users.map(e => (
                    <div key={e.id}>
                        {e.username}
                  </div>
              ))
            }
        </div>
    </div>
  )
}

export default UserPanel
