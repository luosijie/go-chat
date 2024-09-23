import { UserSummary } from '@/types'
import clsx from 'clsx'

type Props = {
    className?: string
    user: UserSummary | null
}

const Avatar = ({className, user}:Props) => {
  return (
    <div className={clsx('size-12 rounded-full bg-black flex justify-center items-center text-white text-2xl font-bold', className)}>
        {
            user === null ?  
            <> ?</> : 
            <>
                {
                    user.avatar ?
                    <img src={user.avatar} alt="" className='w-full h-full object-cover'/>:
                    <div>{ user.username.slice(0, 1) }</div>
                }
            </>
        }
    </div>
  )
}

export default Avatar
