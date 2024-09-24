
// import MessageList from '../components/MessageList'
import SearchBar from '@/components/SearchBar'
import { Search, UserPlus } from 'lucide-react'
import ContactsList from './components/ContactsList'
import UserPanel from './components/UserPanel'

const Messages = () => {
    return (
        <div className="flex justify-between h-full">
            {/* List */}
            <div className="w-60 border-r p-2 relative flex flex-col">
                {/* <MessageList/> */}
                <ContactsList/>
            </div>
            {/* Chat */}
            <UserPanel/>
        </div>
    )
}

export default Messages
