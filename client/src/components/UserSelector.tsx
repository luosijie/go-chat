import { UserSummary } from '@/types'
import { CheckCircle2Icon, Circle, PlusIcon } from 'lucide-react'
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import Avatar from './Avatar'

type Props = {
    list: Array<UserSummary>,
    value: Array<UserSummary>
    onChange: (selected: any) => void
}

const UserSelector = forwardRef(({list, value, onChange }:Props, ref:ForwardedRef<HTMLDivElement>) => {
    const [open, setOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<Array<UserSummary>>(value)

    useEffect(() => {
        onChange(selected)
    }, [selected])


    const handleSelect = (user:UserSummary) => {
        const index = selected.findIndex(e => e.id === user.id)
            
        if (index > -1) {
            setSelected(state => [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ])
        } else {
            setSelected(state => [...state, user])
        }

    }
    

    return (
        <div className='flex gap-2' ref={ref}>
            <div className='size-12 relative'>
                <div className='border size-full rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-100 ' onClick={() => setOpen(state => !state)}>
                    <PlusIcon/>
                </div>
            
                {
                    open && 
                    <div className='border rounded-md absolute bg-white shadow-md left-0  bottom-14' onMouseLeave={() => setOpen(false)}>
                        <div className='flex flex-col p-6 gap-2  max-h-60  overflow-y-auto '>
                            {
                                list.map(u => (
                                    <div key={u.id} className='flex items-center gap-3'>
                                        <Avatar name={u.username} avatar={u.avatar} className='size-9 text-sm'/>
                                        <span className='text-xl font-bold flex-grow'>{ u.username }</span>
                                        <div onClick={() => handleSelect(u)}>
                                            {
                                                selected.find(e => e.id === u.id) ?
                                                <CheckCircle2Icon size={30}/> :
                                                <Circle className='text-gray-300' size={30}/>
                                            }

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex items-center border-t justify-center py-2 hover:bg-gray-50 cursor-pointer font-bold' onClick={() => setOpen(false)}>
                            Confirm
                        </div>
                    </div>
                }
            </div>
                    
            {
                selected.map(u => (
                    <Avatar name={u.username} avatar={u.avatar} key={u.id}/>
                ))
            }
            
            
        </div>
    )
})

export default UserSelector
