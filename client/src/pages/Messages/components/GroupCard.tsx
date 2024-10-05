import GroupAvatar from '@/components/GroupAvatar'
import { GroupChat } from '@/types'



type Props = {
    data: GroupChat
    onClick: (data: GroupChat) => void
}

const GroupCard = ({ data, onClick }:Props) => {
    const historyLength = data.history.length
  return (
    <div 
        key={data.id} 
        className="flex gap-3 items-center border mb-3 p-2 rounded-lg border-gray-100 cursor-pointer hover:bg-gray-50"
        onClick={() => onClick(data) }
    >
        {/* <GroupAvatar */}
        <GroupAvatar members={data.members} />
        {/* <Avatar name={single.to.username} avatar={single.to.avatar}/> */}
        <div>
            <div className="font-bold text-base">{data.name}</div>
            {   
                historyLength > 0 &&
                <div className="text-sm text-gray-500">{data.history[historyLength - 1].content.slice(0, 10)}</div>
            }
        </div>
    </div>
  )
}

export default GroupCard
