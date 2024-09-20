import { Search } from 'lucide-react'

type Props = {
    placeholder?: string
}
const SearchBar = ({placeholder}:Props) => {
    placeholder = placeholder || 'Search in your inbox'

    return (
        <div className="w-full bg-gray-100 rounded-lg p-2 flex gap-2">
            <Search className='text-gray-500'/>
            <input type="text" placeholder={placeholder} className='bg-transparent outline-none'/>
        </div>
    )
}

export default SearchBar
