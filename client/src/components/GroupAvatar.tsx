import { UserSummary } from '@/types'
import clsx from 'clsx'

type Props = {
    className?: string
    members: Array<UserSummary>
}

const GroupAvatar = ({className, members}:Props) => {
    const users = members.slice(0, 4)
    return (
        <div className={clsx('size-12 rounded-md grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-gray-200 text-white text-2xl font-bold', className)}>
            {
                users.map(e => (
                    <div key={e.id} className='bg-black rounded-full text-sm flex justify-center items-center '>
                        {
                            e.avatar ?
                            <img src={e.avatar} alt=""/> :
                            <span>{ e.username.slice(0, 1) }</span>
                        } 
                    </div>
                ))
            }
        </div>
    )
}

export default GroupAvatar
