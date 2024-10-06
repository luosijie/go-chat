import GroupAvatar from '@/components/GroupAvatar'
import { Group } from '@/stores/group'
import { useMessageStore } from '@/stores/message'

import { ChatType } from '@/types'

import clsx from 'clsx'
import { Delete, MessageCircleMore } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Props = {
	group: Group
	onRemove: () => void
}

const btnClass = 'flex gap-2 border py-2 px-4 rounded-md hover:bg-gray-50 cursor-pointer'

const Detail = ({ group, onRemove } : Props) => {
	const navigate = useNavigate()

	const findChat = useMessageStore(state => state.findChat)
	const addChat = useMessageStore(state => state.addChat)

	const remove = async () => {
		onRemove()
	}

	const sendMessage = () => {
		// if (current === null) return
		const chatId = String(group.id)

		// const groupId = [current?.id, group.id].sort().join("-")
		
		// let group = findChat(groupId)
		let groupChat = findChat(chatId)

		if (groupChat === undefined) {
			groupChat  = {
				type: ChatType.Group,
				id: chatId,
				group,
				history: []
			}
		}

		addChat(groupChat)

		navigate('/messages')
	}

	return (
		<div className="flex-grow flex flex-col gap-10 justify-center items-center">
			<div className='flex flex-col justify-center items-center gap-4'>
				<GroupAvatar members={group.members} className='size-20 mb-5'/>
				<div className='font-bold text-3xl'>{ group.name }</div>
				<div className='bg-gray-100 p-2 rounded-md border font-bold'>owner: { group.owner.username }</div>
				<div className='text-xl text-gray-400'>{ group.desc }</div>
			</div>
			<div className='flex gap-5 items-center'>
				<div className={btnClass} onClick={() => sendMessage()}>
					<MessageCircleMore/> Send Message
				</div>
				<div className={clsx(btnClass, 'bg-red-500 hover:bg-red-400 text-white')} onClick={() => remove()}>
					<Delete/> Delete
				</div>

				<div className={clsx(btnClass, 'bg-red-500 hover:bg-red-400 text-white')} onClick={() => remove()}>
					<Delete/> Exit
				</div>
			</div>
		</div> 
	)
}

export default Detail
