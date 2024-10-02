import GroupAvatar from '@/components/GroupAvatar'
import { Content, ContentType, Group, GroupType, MultipleGroup, SingleGroup } from '@/types'
import { Send, Smile } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import MessageBox from '@/components/MessageBox'



type Props = {
    group: Group
    onSend: (content:Content) => void
}

const Chat = ({ group, onSend}:Props) => {
    const singleGroup = group as SingleGroup
    const multipleGroup = group as MultipleGroup

    const inputRef = useRef<HTMLInputElement>(null)

    const [text, setText] = useState<string>('')
    const textRef = useRef(text)

    const sendText = (text:string) => {
        console.log("text00", text)
        if (!text) return

        const content:Content = {
            type: ContentType.Text,
            value: text
        }


        onSend(content)


        setText("")
    }

    useEffect(() => {
        textRef.current = text
    }, [text])

    useEffect(() => {
        // let tt = text
        const keyboardListener = (evt:KeyboardEvent) => {
            if (evt.key === 'Enter') {
                sendText(textRef.current)
            }
        }

        window.addEventListener('keydown', keyboardListener)

        return () => window.removeEventListener('keydown', keyboardListener)

    }, [])

    return (
        <div className="flex flex-col w-full h-full relative">
            {/* Head */}
            <div className="flex gap-2 items-center px-2 py-6 border-b h-14">
                <GroupAvatar group={group} className='size-10'/>
                { singleGroup.type === GroupType.Single && <span className="font-bold text-lg">{ singleGroup.to.username }</span> }
                { multipleGroup.type === GroupType.Multiple && <span className="font-bold text-lg">{ multipleGroup.name }</span> }
            </div> 

            {/* Body */}
            <MessageBox messages={group.history}/>
            
            {/* Input */}
            <div className="h-20 border-t p-2 flex items-center gap-2">
                <input 
                    value={text} 
                    onChange={evt => setText(evt.target.value)} 
                    type="text" placeholder="Enter..." 
                    className="outline-none flex-grow"
                    ref={inputRef}
                />

                <div className='bg-orange cursor-pointer rounded-full size-8 flex items-center justify-center'>
                    <Smile color='white' size={20}/>
                </div>
                <div className='bg-black cursor-pointer rounded-full size-8 flex items-center justify-center' onClick={() => sendText(text)}>
                    <Send color='white' size={20} />
                </div>
            </div>
        </div>
    )
}

export default Chat
