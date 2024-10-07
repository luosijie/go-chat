import clsx from 'clsx'
import { AtomIcon, List, LucideProps, MessageCircleMore, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
    // {
    //     label: 'Edit profile',
    //     Icon: List,
    //     color: '#62753D',
    //     bg: 'bg-green'
    // },
    {
        label: 'Create Users',
        Icon: AtomIcon,
        color: '#DF3B9D',
        bg: 'bg-pink'
    }
]

const Dashboard = () => {
    const navigate = useNavigate()

    const handleItemClick = (i:Item) => {
        console.log('item-click:', i)
        switch (i.label) {
            case 'Create group':
                navigate('/create-group')
                break
            case 'Create Users':
                navigate('/create-users')

        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl font-bold mb-20">Welcome to <span className="bg-black text-white text-3xl p-2 rounded-tl-3xl rounded-br-3xl">Go</span>  chat</div>
            <div className='flex gap-5'>
                {
                    itemData.map(e => (
                        <div key={e.label} className='flex border p-10 rounded-xl items-center gap-5 cursor-pointer' onClick={() => handleItemClick(e)}>
                            <div className={clsx('size-12 flex justify-center rounded-lg items-center flex-shrink-0', e.bg )}>
                                <e.Icon color={e.color}/>
                            </div>
                            <div className='font-bold text-lg'>
                                {e.label}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Dashboard
