import { Group } from "@/types"
import Avatar from "./Avatar"



type Props = {
    group: Group
}

const Info = ({group}:Props) => {
    return (
        <div className="w-full flex flex-col items-center justify-center  p-10 min-w-36">
            <Avatar name={group.name} avatar={group.avatar} empty={Boolean(group)} className="size-20 mt-10"/>
            <div className="font-bold mt-4 text-3xl">{ group.owner.username }</div>
            <div className="mt-4 text-gray-500">{ group.owner.email }</div>
            <div className="btn-plain mt-5">Login</div>
        </div>
    )
}

export default Info
