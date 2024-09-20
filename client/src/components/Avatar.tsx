import { User } from '@/types'

type Props = {
    user: User | null
}

const Avatar = ({user}:Props) => {
  return (
    <div className='size-12 rounded-full bg-black flex justify-center items-center text-white text-2xl font-bold'>
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
