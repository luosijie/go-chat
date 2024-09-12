import { Send, Smile } from 'lucide-react'
import { useMessageStore } from '../stores/message'
import ChatBody from './ChatBody'
const Chat = () => {
    const current = useMessageStore(state => state.current)

    return (
        <div className="flex flex-col w-full h-full relative">
            {/* Head */}
            <div className="flex gap-2 items-center px-2 border-b h-14">
                <img src={current?.contact.avatar} alt="" className="size-10 rounded-full bg-gray-200"/>
                <span className="font-bold text-lg">{ current?.contact.name }</span>
            </div> 

            {/* Body */}
            <ChatBody/>
            
            {/* Input */}
            <div className="h-20 border-t p-2 flex items-center gap-2">
                <input type="text" placeholder="Enter..." className="outline-none flex-grow"/>
                <div className='bg-orange cursor-pointer rounded-full size-8 flex items-center justify-center'>
                    <Smile color='white' size={20}/>
                </div>
                <div className='bg-black cursor-pointer rounded-full size-8 flex items-center justify-center'>
                    <Send color='white' size={20}/>
                </div>
            </div>
        </div>
    )
}

export default Chat
