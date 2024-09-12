import { Search } from 'lucide-react'
const SearchBar = () => {
    return (
        <div className="w-full bg-gray-100 rounded-lg p-2 flex gap-2">
            <Search className='text-gray-500'/>
            <input type="text" placeholder='Search in your inbox' className='bg-transparent outline-none'/>
        </div>
    )
}

export default SearchBar
