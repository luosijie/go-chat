import { useUserStore } from "@/stores/user"
import { Message } from "@/types"
import { useEffect, useRef } from "react"
import Avatar from "./Avatar"

type Props = {
    messages: Array<Message>
}
const MessageBox = ({ messages} : Props) => {
    const user = useUserStore(state => state.user)

    const boxRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // console.log('messages-change', messages)
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        setTimeout(() => {
            boxRef.current?.scrollIntoView({behavior: 'smooth', block: 'end'})
        }, 100)
    }

    return (
        <div className="p-2 flex-grow overflow-y-auto w-full h-full flex flex-col">
            <div ref={boxRef}>
            {
                messages.map(e => (
                    <div key={e.date} className="flex">
                        {
                            e.from.id === user?.id ?
                            <div key={e.date} className="flex items-center justify-end w-full">
                                <div key={e.date} className="border p-2 m-2 rounded-md bg-black text-white">
                                    { e.content }
                                </div>
                                <Avatar name={user.username} avatar={user.avatar} className="size-7 text-sm"/>
                            </div>:
                            <div key={e.date} className=" flex items-center w-full">
                                <Avatar name={e.from.username} avatar={e.from.avatar} className="size-7 text-sm"/>
                                <div key={e.date} className="border p-2 m-2 rounded-md">
                                    { e.content }
                                </div>
                            </div>
                        }
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default MessageBox
