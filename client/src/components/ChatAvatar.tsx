import { Chat, ChatType, MultipleChat, SingleChat } from '@/types'
import clsx from 'clsx'

type Props = {
    className?: string
    group?: Chat
}

const ChatAvatar = ({className, group}:Props) => {
    const singleChat = group as SingleChat
    const multipleChat = group as MultipleChat
  return (
    <div className={clsx('size-12 rounded-full bg-black flex justify-center items-center text-white text-2xl font-bold', className)}>
        {
            !group && <>?</> 
        }
        {
            singleChat.type === ChatType.Single && <>
                { 
                    singleChat.to.avatar ?
                    <img src={singleChat.to.avatar} alt="" className='w-full h-full object-cover'/>:
                    <div>{ singleChat.to.username && singleChat.to.username.slice(0, 1) }</div>
                }
            </>
        }
        {
            multipleChat.type === ChatType.Chat && <>
                 {/* <img src={multipleChat.} alt="" className='w-full h-full object-cover'/>: */}
                 <div>{ singleChat.to.username && singleChat.to.username.slice(0, 1) }</div>
            </>
        }
    </div>
  )
}

export default ChatAvatar
