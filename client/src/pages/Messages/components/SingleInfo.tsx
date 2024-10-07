import { UserSummary } from "@/types"
import { toLogin } from "@/utils/fake"
import Avatar from "../../../components/Avatar"



type Props = {
    data: UserSummary
}

const SingleInfo = ({data}:Props) => {
    // const singleChat = group as SingleChat
    // const info = data.to
    return (
        <div className="w-full flex flex-col items-center justify-center  p-10">
            <Avatar name={data.username} avatar={data.avatar}  className="size-20 mt-10"/>
            <div className="font-bold mt-4 text-3xl text-center">{ data.username }</div>
            <div className="mt-4 text-gray-500">{ data.email }</div>
            <div className="btn-plain mt-5" onClick={() => toLogin(data)}>Login</div>
        </div>
    )
}

export default SingleInfo
