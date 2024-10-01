import GroupAvatar from '@/components/GroupAvatar'
import { Content, ContentType, Group, GroupType, MultipleGroup, SingleGroup } from '@/types'
import { Send, Smile } from 'lucide-react'
import { useState } from 'react'
import Avatar from '../../../components/Avatar'
import MessageBox from '../../../components/MessageBox'



type Props = {
    group: Group
    onSend: (content:Content) => void
}

const Chat = ({ group, onSend}:Props) => {
    const singleGroup = group as SingleGroup
    const multipleGroup = group as MultipleGroup

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
                <GroupAvatar group={group}/>
                { singleGroup.type === GroupType.Single && <span className="font-bold text-lg">{ singleGroup.to.username }</span> }
                { multipleGroup.type === GroupType.Multiple && <span className="font-bold text-lg">{ multipleGroup.name }</span> }
            </div> 

            {/* Body */}
            <MessageBox messages={group.history}/>
            
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
