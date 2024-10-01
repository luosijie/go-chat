import clsx from 'clsx'

type Props = {
    className?: string
    name?: string
    avatar?: string
}

const Avatar = ({className, name, avatar}:Props) => {
  return (
    <div className={clsx('size-12 rounded-full bg-black flex justify-center items-center text-white text-2xl font-bold', className)}>
        {
            !name && !avatar ?  
            <> ?</> : 
            <>
                {
                    avatar ?
                    <img src={avatar} alt="" className='w-full h-full object-cover'/>:
                    <div>{ name && name.slice(0, 1) }</div>
                }
            </>
        }
    </div>
  )
}

export default Avatar
