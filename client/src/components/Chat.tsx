import { Content, ContentType } from '@/types'
import { Send, Smile } from 'lucide-react'
import { useState } from 'react'
import ChatBody from './ChatBody'



type Props = {
    header: JSX.Element
    onSend: (content:Content) => void
}

const Chat = ({header, onSend}:Props) => {

    const [text, setText] = useState<string>('')

    const sendText = () => {
        if (!text) return

        const content:Content = {
            type: ContentType.Text,
            value: text
        }
        onSend(content)
    }

    return (
        <div className="flex flex-col w-full h-full relative">
            {/* Head */}
            <div className="flex gap-2 items-center px-2 border-b h-14">
                { header }
            </div> 

            {/* Body */}
            <ChatBody/>
            
            {/* Input */}
            <div className="h-20 border-t p-2 flex items-center gap-2">
                <input value={text} onChange={evt => setText(evt.target.value)} type="text" placeholder="Enter..." className="outline-none flex-grow"/>
                <div className='bg-orange cursor-pointer rounded-full size-8 flex items-center justify-center'>
                    <Smile color='white' size={20}/>
                </div>
                <div className='bg-black cursor-pointer rounded-full size-8 flex items-center justify-center'>
                    <Send color='white' size={20} onClick={sendText}/>
                </div>
            </div>
        </div>
    )
}

export default Chat
