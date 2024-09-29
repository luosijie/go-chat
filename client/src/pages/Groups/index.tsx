
import Chat from '@/components/Chat'
import Info from '@/components/Info'
import { useContactStore } from '@/stores/contact'
// import MessageList from '../components/MessageList'
import MessageList from '@/components/MessageList'

const Groups = () => {
    const current = useContactStore(state => state.active)

    return (
        <div className="flex justify-between h-full">
            {/* List */}
            <div className="w-60 border-r p-2 relative flex flex-col">
                <MessageList/>
            </div>
            {/* Chat */}
            <div className="flex-grow">
                <Chat header={<></>}/>
            </div>
            {/* Info */}
            {
                current &&
                <div className="w-60 border-l">
                    <Info/>
                </div>
            }
        </div>
    )
}

export default Groups
