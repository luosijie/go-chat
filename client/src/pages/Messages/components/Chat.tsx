
import { Chat, ChatType, Content, ContentType, GroupChat, SingleChat } from '@/types'
import { MenuSquare, Send, Smile, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import Avatar from '@/components/Avatar'
import GroupAvatar from '@/components/GroupAvatar'
import MessageBox from '@/components/MessageBox'
import GroupInfo from '@/pages/Messages/components/GroupInfo'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import SingleInfo from './SingleInfo'

type Props = {
    group: Chat
    onSend: (content:Content) => void
}

const ChatComponent = ({ group, onSend}:Props) => {
    const singleChat = group as SingleChat
    const groupChat = group as GroupChat

    const inputRef = useRef<HTMLInputElement>(null)

    const [openInfo, setOpenInfo] = useState<boolean>(false)
    const [openEmoji, setOpenEmoji] = useState<boolean>(false)

    const [text, setText] = useState<string>('')
    const textRef = useRef(text)

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

    const sendEmoji = (unified:string) => {
        if (!unified) return

        const content:Content = {
            type: ContentType.Emoji,
            value: unified
        }

        onSend(content)
       
    }

    const handleEmojiClick = (evt:EmojiClickData) => {

        sendEmoji(evt.unified)
        setOpenEmoji(false)
    }

    return (
        <>
        <div className="flex flex-col w-full h-full relative">
            {/* Head */}
            <div className="flex gap-2 items-center px-4 py-6 border-b h-14 justify-between">
                
                { 
                    singleChat.type === ChatType.Single &&
                    <div className='flex items-center gap-2'>
                        <Avatar name={singleChat.to.username} avatar={singleChat.to.avatar} className='size-8'/>
                        <span className="font-bold text-lg">{ singleChat.to.username }</span> 
                    </div>
                }
                { 
                    groupChat.type === ChatType.Group && 
                    <div className='flex items-center gap-2'>
                        <GroupAvatar members={groupChat.group.members} className='size-10'/>
                        <span className="font-bold text-lg">{ groupChat.group.name }</span> 
                    </div>
                }
                <div className='text-gray-500 cursor-pointer' onClick={() => setOpenInfo(state => !state)}>
                    {
                        openInfo ?
                        <X size={30}/> :
                        <MenuSquare size={30}/>
                    }
                </div>
                
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
                <div className='size-8 relative'>
                    <div className='bg-orange cursor-pointer size-full rounded-full flex items-center justify-center' onClick={() => setOpenEmoji(state => !state)}>
                        <Smile color='white' size={20}/>
                    </div>
                    <div className='absolute right-3 bottom-16'>
                        <EmojiPicker open={openEmoji} onEmojiClick={handleEmojiClick}/>
                    </div>
                </div>
                <div className='bg-black cursor-pointer rounded-full size-8 flex items-center justify-center' onClick={() => sendText(text)}>
                    <Send color='white' size={20} />
                </div>
            </div>


        </div>
        {
            openInfo &&
            <div className='border-l min-w-60'>
                { singleChat.type === ChatType.Single && <SingleInfo data={singleChat.to}/> }
                { groupChat.type === ChatType.Group && <GroupInfo data={groupChat.group}/> }
            </div>
        }
        </>
    )
}

export default ChatComponent
