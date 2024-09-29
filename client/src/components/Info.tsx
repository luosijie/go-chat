import { UserSummary } from "@/types"
import Avatar from "./Avatar"



type Props = {
    user: UserSummary
}

const Info = ({user}:Props) => {
    return (
        <div className="w-full flex flex-col items-center justify-center  p-10 min-w-36">
            <Avatar user={user} className="size-20 mt-10"/>
            <div className="font-bold mt-4 text-3xl">{ user.username }</div>
            <div className="mt-4 text-gray-500">{ user.email }</div>
            <div className="btn-plain mt-5">Login</div>
        </div>
    )
}

export default Info
