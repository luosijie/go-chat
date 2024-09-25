import Avatar from '@/components/Avatar'
import { useUserStore } from '@/stores/user'
import { UserSummary } from '@/types'
import request from '@/utils/request'
import { motion } from 'framer-motion'
import { LogIn, UserPlus } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const BaseUrl = import.meta.env.VITE_APP_URL

type Props = {
    user: UserSummary
}


const UserCard = ({user}:Props) => {
    const [top, setTop] = useState<string|number>('100%')

    const login = useUserStore(state => state.login)

    const toLogin = async (user:UserSummary) => {
        const res = await login(user.username, '123456')
        if (res.success) {
            toast.success( `Logined as user: ${user.username}`)
        } else {
            toast.error(res.message)
        }
    }

    const toAddFriend = async (user:UserSummary) => {
        const res = await request({
            url: BaseUrl + `/contacts/${user.id}`,
            method: 'POST'
        })
        if (res.success) {
            toast.success(`Friend request has been sent to: ${user.username}`)
        }
    }

  return (
    <div
        className='bg-white rounded-md border p-2 flex items-center gap-3 cursor-pointer h-32 overflow-hidden relative'
        onMouseEnter={() => setTop(0)}
        onMouseLeave={() => setTop('100%')}
    >
        <Avatar user={ user }/>
        <div>
            <div className='font-bold text-xl'>{ user.username }</div>
            <div>{ user.email }</div>
        </div>
        <motion.div 
            className='absolute bg-white w-full h-full flex justify-center items-center bg-opacity-95 gap-10'
            initial={{ top: '100%' }}
            animate={{ top }}
        >
            <div className='flex flex-col items-center' onClick={() => toLogin(user)}>
                <LogIn/> <span className='text-gray-500'>Login</span> 
            </div>
            <div className='flex flex-col items-center' onClick={() => toAddFriend(user)}>
                <UserPlus/> <span className='text-gray-500'>Add Friend</span>
            </div>
        </motion.div>
    </div>
  )
}

export default UserCard
