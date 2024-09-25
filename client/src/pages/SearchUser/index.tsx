import Empty from '@/components/Empty'
import SearchBar from '@/components/SearchBar'
import { UserSummary } from '@/types'
import request from '@/utils/request'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, UserRoundXIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import Pagination from 'react-paginate'
import UserCard from './components/UserCard'

const BASE = import.meta.env.VITE_APP_URL

type Query = {
  page_no: number
  page_size: number
  username: string
}

type State = {
    total: number
    users: Array<UserSummary>
}

const UserPanel = () => {
    const [query, setQuery] = useState<Query>({
        page_no: 1,
        page_size: 20,
        username: '',
    })

    const [state, setState] = useState<State>({
        total: 0,
        users: []
    })


    const getUsers = async (query:Query) => {
        const res = await request({
            url: BASE + '/user/page',
            method: 'GET',
            query
        })

        if (res.data && res.data.rows) {
            setState({
                total: res.data.total,
                users: res.data.rows
            })
        }
    }

    useEffect(() => {
        getUsers(query)
    }, [query])

    const handlePageChange = (evt:any) => {
        setQuery(query => ({
            ...query,
            page_no: evt.selected + 1
        }))
    }

    return (
        <div className="h-full flex-grow flex flex-col justify-center items-center">
            <div className='flex  justify-center items-center gap-6 h-28'>
                <div className='flex items-center justify-center text-2xl font-bold flex-shrink-0'>
                    <div className='bg-black text-white rounded-tl-2xl rounded-br-2xl px-2 py-2 mr-2'>
                        Go
                    </div> 
                    Search User
                </div>
                <SearchBar className='w-80' placeholder='Search by usename' onChange={evt => setQuery(query => ({...query, username: evt.target.value}))}/>
            </div>
            {
                state.users.length ?
                <div className='w-full h-2/3 rounded-lg grid grid-cols-4  flex-wrap relative px-10 gap-5 auto-rows-min flex-grow'>
                    {
                        state.users.map(u => (
                            <UserCard user={u} key={u.id}/>
                        ))
                    }
                </div> :
                <div className='flex-grow flex items-center justify-center'>
                    <Empty text='No user founded' Icon={UserRoundXIcon}/>
                </div>

            }
            <Pagination 
                pageRangeDisplayed={6}
                pageCount={state.total} 
                onPageChange={handlePageChange}
                previousLabel={<ArrowLeftCircleIcon/>}
                nextLabel={<ArrowRightCircleIcon/>}
                className='flex w-full justify-center h-20 items-center'
                pageClassName='mx-2 size-8 flex items-center justify-center'
                activeClassName='rounded-full bg-black text-white'
            />
        </div>
    )
}

export default UserPanel
