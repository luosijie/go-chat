import clsx from 'clsx'
import { Search } from 'lucide-react'
import { ChangeEvent } from 'react'

type Props = {
    placeholder?: string
    className?: string
    onChange?: (evt:ChangeEvent<HTMLInputElement>) => void
}
const SearchBar = ({placeholder, className, onChange}:Props) => {
    placeholder = placeholder || 'Search in your inbox'

    return (
        <div className={clsx("w-full bg-gray-50 rounded-lg p-2 flex gap-2", className)}>
            <Search className='text-gray-500'/>
            <input 
                type="text" placeholder={placeholder} className='bg-transparent outline-none'
                onChange={onChange}
            />
        </div>
    )
}

export default SearchBar
