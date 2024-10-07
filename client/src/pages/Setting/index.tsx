import Avatar from '@/components/Avatar'
import { useUserStore } from '@/stores/user'
import { userStorage } from '@/utils/storage'
import clsx from 'clsx'
import { AtomIcon, EditIcon, List, LucideProps, MessageCircleMore, Users } from 'lucide-react'

type Item = {
    label: string
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
    color: string
    bg: string
}

const itemData:Array<Item> = [
    {
        label: 'Create group',
        Icon: Users,
        color: '#1577CF',
        bg: 'bg-blue'
    },
    {
        label: 'Start chat',
        Icon: MessageCircleMore,
        color: '#A06902',
        bg: 'bg-yellow'
    },
    {
        label: 'Edit profile',
        Icon: List,
        color: '#62753D',
        bg: 'bg-green'
    },
    {
        label: 'AI chat',
        Icon: AtomIcon,
        color: '#DF3B9D',
        bg: 'bg-pink'
    }
]

const Setting = () => {
    const user = useUserStore(state => state.user)
    const logout = useUserStore(state => state.logout )
    return (
        <div className="flex gap-3 flex-col items-center justify-center h-full">
            <div className='relative'>

                <Avatar name={user?.username} avatar={user?.avatar} className='size-24 text-5xl'/>
                <div className='bg-white absolute bottom-1 right-1 rounded-full p-1 border cursor-pointer'>
                    <EditIcon size={22}/>
                </div>
            </div>
            <div className='text-3xl font-bold'>
                { user?.username }
            </div>
            <div className='text-xl text-gray-500'>
                { user?.email }
            </div>
            <div className='border px-5 py-3 rounded-md hover:bg-gray-50 mt-5 cursor-pointer font-bold' onClick={logout}>
                Logout
            </div>
        </div>
    )
}

export default Setting
