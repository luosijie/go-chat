import Avatar from "@/components/Avatar"
import GroupAvatar from "@/components/GroupAvatar"
import { Group } from "@/stores/group"





type Props = {
    data: Group
}

const GroupInfo = ({data}:Props) => {
    // const singleChat = group as SingleChat
    // const info = data.to
    return (
        <div className="w-full h-full flex flex-col items-center justify-center  p-10">
            <GroupAvatar members={data.members} className="size-20"/>
            <div className="font-bold mt-4 text-3xl text-center">{ data.name }</div>
            <div className="mt-4 text-gray-500 border p-2 rounded-md bg-gray-50">owner: { data.owner.username }</div>
            <div className="mt-4  font-bold text-black">Members: { data.members.length }</div>
            <div className="flex flex-col mt-5 gap-2 max-h-72 overflow-y-auto">
                {
                    data.members.map(m => (
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Avatar name={m.username} avatar={m.avatar} className="size-8 text-sm"/>
                            { m.username }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GroupInfo
