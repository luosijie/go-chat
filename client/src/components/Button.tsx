import clsx from 'clsx'
import { Loader } from 'lucide-react'
import { ReactNode } from 'react'

type Props = {
    className?: string
    loading?: boolean
    children: ReactNode
    onClick?: () => void
}

const Button = ({className, loading, onClick, children}:Props) => {
    return (
        <div
            className={clsx(
                'flex gap-3 items-center justify-center w-full p-4 bg-black rounded-md text-white mt-5 font-bold  cursor-pointer hover:bg-gray-700', 
                className
            )}
            onClick={ onClick }
        >
            {
                loading ? <Loader className='animate-spin-slow'/>  : children
            }
        </div>
    )
}

export default Button
