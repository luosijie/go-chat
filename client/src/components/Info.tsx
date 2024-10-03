import { Chat, SingleChat } from "@/types"
import Avatar from "./Avatar"



type Props = {
    group: Chat
}

const Info = ({group}:Props) => {
    const singleChat = group as SingleChat
    return (
        <div className="w-full flex flex-col items-center justify-center  p-10 min-w-36">
            <Avatar name={singleChat.to.username} avatar={singleChat.to.avatar}  className="size-20 mt-10"/>
            <div className="font-bold mt-4 text-3xl">{ singleChat.to.username }</div>
            <div className="mt-4 text-gray-500">{ singleChat.to.email }</div>
            <div className="btn-plain mt-5">Login</div>
        </div>
    )
}

export default Info
