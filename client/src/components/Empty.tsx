import { BookmarkX, LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from 'react'

type Props = {
    Icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    text?: string
}



const Empty = ({Icon, text}:Props) => {
  return (
    <div className='flex flex-col gap-2 justify-center items-center w-full h-full text-gray-500 text-sm'>
        { Icon ? <Icon/> : <BookmarkX/> }
        { text || 'Empty'}
    </div>
  )
}

export default Empty
